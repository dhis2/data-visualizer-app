import { useCachedDataQuery, Toolbar } from '@dhis2/analytics'
import { useSetting } from '@dhis2/app-service-datastore'
import i18n from '@dhis2/d2-i18n'
import {
    CssVariables,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    acClearCurrent,
    acSetCurrentFromUi,
    tSetCurrentFromUi,
} from '../actions/current.js'
import { tSetDimensions } from '../actions/dimensions.js'
import { clearAll, tDoLoadVisualization } from '../actions/index.js'
import { acAddMetadata } from '../actions/metadata.js'
import { acAddSettings } from '../actions/settings.js'
import { acAddParentGraphMap, acSetUiFromVisualization } from '../actions/ui.js'
import { acReceivedUser, tLoadUserAuthority } from '../actions/user.js'
import { acClearVisualization } from '../actions/visualization.js'
import { Snackbar } from '../components/Snackbar/Snackbar.js'
import { USER_DATASTORE_CURRENT_AO_KEY } from '../modules/currentAnalyticalObject.js'
import history from '../modules/history.js'
import defaultMetadata from '../modules/metadata.js'
import { getParentGraphMapFromVisualization } from '../modules/ui.js'
import { STATE_DIRTY, getVisualizationState } from '../modules/visualization.js'
import { sGetCurrent } from '../reducers/current.js'
import { sGetUi } from '../reducers/ui.js'
import { sGetVisualization } from '../reducers/visualization.js'
import { default as DetailsPanel } from './DetailsPanel/DetailsPanel.js'
import DimensionsPanel from './DimensionsPanel/DimensionsPanel.js'
import DndContext from './DndContext.js'
import { InterpretationModal } from './InterpretationModal/index.js'
import Layout from './Layout/Layout.js'
import { MenuBar } from './MenuBar/MenuBar.js'
import { TitleBar } from './TitleBar/TitleBar.js'
import { Visualization } from './Visualization/Visualization.js'
import { APPROVAL_LEVEL_OPTION_AUTH } from './VisualizationOptions/Options/ApprovalLevel.js'
import { VisualizationTypeSelector } from './VisualizationTypeSelector/VisualizationTypeSelector.js'
import './App.css'
import './scrollbar.css'

const App = () => {
    const [currentAO] = useSetting(USER_DATASTORE_CURRENT_AO_KEY)

    const [previousLocation, setPreviousLocation] = useState(null)
    const [initialLoadIsComplete, setInitialLoadIsComplete] = useState(false)
    const [locationToConfirm, setLocationToConfirm] = useState(false)

    const dispatch = useDispatch()

    const current = useSelector(sGetCurrent)
    const ui = useSelector(sGetUi)
    const visualization = useSelector(sGetVisualization)

    const { currentUser, systemSettings, orgUnitLevels, rootOrgUnits } =
        useCachedDataQuery()

    const interpretationsUnitRef = useRef()
    const onInterpretationUpdate = () => {
        interpretationsUnitRef.current.refresh()
    }

    const parseLocation = (location) => {
        const pathParts = location.pathname.slice(1).split('/')
        const id = pathParts[0]
        const interpretationId = pathParts[2]
        return { id, interpretationId }
    }

    const loadVisualization = useCallback(
        (location) => {
            /**
             * The following cases require a fetch/refetch of the AO
             * - enter a new url (causing a page load)
             * - file->open (same or different AO)
             * - file->saveAs
             */
            const isRefetchNeeded = (location) => {
                if (!previousLocation) {
                    return true
                }

                const id = location.pathname.slice(1).split('/')[0]
                const prevId = previousLocation.slice(1).split('/')[0]

                if (id !== prevId || previousLocation === location.pathname) {
                    return true
                }

                return false
            }

            if (location.pathname.length > 1) {
                // /currentAnalyticalObject
                // /${id}/
                // /${id}/interpretation/${interpretationId}
                const { id } = parseLocation(location)

                const urlContainsCurrentAOKey =
                    id === USER_DATASTORE_CURRENT_AO_KEY

                if (urlContainsCurrentAOKey) {
                    dispatch(
                        acAddParentGraphMap(
                            getParentGraphMapFromVisualization(currentAO)
                        )
                    )

                    // clear visualization and current
                    // to avoid leave them "dirty" when navigating to
                    // /currentAnalyticalObject from a previously saved AO
                    dispatch(acClearVisualization())
                    dispatch(acClearCurrent())

                    dispatch(acSetUiFromVisualization(currentAO))
                    dispatch(tSetCurrentFromUi())
                }

                if (!urlContainsCurrentAOKey && isRefetchNeeded(location)) {
                    dispatch(
                        tDoLoadVisualization({
                            id,
                            ouLevels: orgUnitLevels,
                        })
                    )
                }
            } else {
                dispatch(clearAll()) // XXX
            }
            setInitialLoadIsComplete(true)
            setPreviousLocation(location.pathname)
        },
        [
            currentAO,
            dispatch,
            orgUnitLevels,
            previousLocation,
            setPreviousLocation,
        ]
    )

    useEffect(
        () => {
            dispatch(
                // XXX see how to write this better
                acAddSettings({
                    ...systemSettings,
                    uiLocale: currentUser.settings.uiLocale,
                    displayProperty: currentUser.settings.displayProperty,
                    displayNameProperty:
                        currentUser.settings.displayNameProperty,
                    rootOrganisationUnits: rootOrgUnits,
                })
            )
            dispatch(tLoadUserAuthority('ALL'))
            dispatch(tLoadUserAuthority(APPROVAL_LEVEL_OPTION_AUTH))
            dispatch(acReceivedUser(currentUser))
            dispatch(tSetDimensions())

            const metaData = { ...defaultMetadata() }

            rootOrgUnits.forEach((rootOrgUnit) => {
                if (rootOrgUnit.id) {
                    metaData[rootOrgUnit.id] = {
                        ...rootOrgUnit,
                        path: `/${rootOrgUnit.id}`,
                    }
                }
            })

            dispatch(acAddMetadata(metaData))

            loadVisualization(history.location)

            const unlisten = history.listen(({ location }) => {
                const isSaving = location.state?.isSaving
                const isOpening = location.state?.isOpening
                const isResetting = location.state?.isResetting
                const isModalOpening = location.state?.isModalOpening
                const isModalClosing = location.state?.isModalClosing
                const isValidLocationChange =
                    previousLocation !== location.pathname &&
                    !isModalOpening &&
                    !isModalClosing

                if (
                    // currently editing
                    getVisualizationState(visualization, current) ===
                        STATE_DIRTY &&
                    // wanting to navigate elsewhere
                    previousLocation !== location.pathname &&
                    // not saving
                    !isSaving
                ) {
                    setLocationToConfirm(location)
                } else {
                    if (
                        isSaving ||
                        isOpening ||
                        isResetting ||
                        isValidLocationChange
                    ) {
                        loadVisualization(location)
                    }

                    setLocationToConfirm(null)
                }
            })

            document.body.addEventListener(
                'keyup',
                (e) =>
                    e.key === 'Enter' &&
                    e.ctrlKey === true &&
                    dispatch(acSetCurrentFromUi(ui))
            )

            window.addEventListener('beforeunload', (event) => {
                if (
                    getVisualizationState(visualization, current) ===
                    STATE_DIRTY
                ) {
                    event.preventDefault()
                    event.returnValue = i18n.t('You have unsaved changes.')
                }
            })

            return () => unlisten && unlisten()
        },
        [
            //        current,
            //        currentUser,
            //        dispatch,
            //        loadVisualization,
            //        previousLocation,
            //        rootOrgUnits,
            //        systemSettings,
            //        ui,
            //        visualization,
        ]
    )

    // TODO continue from here

    //        this.unlisten = history.listen(({ location }) => {
    //            const isSaving = location.state?.isSaving
    //            const isOpening = location.state?.isOpening
    //            const isResetting = location.state?.isResetting
    //            /*
    //            const isModalOpening = location.state?.isModalOpening
    //            const isModalClosing = location.state?.isModalClosing
    //            const isValidLocationChange =
    //                this.state.previousLocation !== location.pathname &&
    //                !isModalOpening &&
    //                !isModalClosing
    //*/
    //            if (
    //                // currently editing
    //                getVisualizationState(
    //                    this.props.visualization,
    //                    this.props.current
    //                ) === STATE_DIRTY &&
    //                // wanting to navigate elsewhere
    //                this.state.previousLocation !== location.pathname &&
    //                // not saving
    //                !isSaving
    //            ) {
    //                this.setState({ locationToConfirm: location })
    //            } else {
    //                if (
    //                    isSaving ||
    //                    isOpening ||
    //                    isResetting ||
    //                    this.state.previousLocation !== location.pathname
    //                ) {
    //                    this.loadVisualization(location)
    //                }
    //
    //                this.setState({ locationToConfirm: null })
    //            }
    //        })

    return (
        <>
            <div className="data-visualizer-app flex-ct flex-dir-col">
                <Toolbar>
                    <VisualizationTypeSelector />
                    <MenuBar
                        apiObjectName="visualization"
                        dataTest={'app-menubar'}
                    />
                </Toolbar>
                <div className="section-main flex-grow-1 flex-ct">
                    <DndContext>
                        <div className="main-left">
                            <DimensionsPanel />
                        </div>
                        <div className="main-center flex-grow-1 flex-basis-0 flex-ct flex-dir-col">
                            <div className="main-center-layout">
                                <Layout />
                            </div>
                            <div className="main-center-titlebar">
                                <TitleBar />
                            </div>
                            <div className="main-center-canvas flex-grow-1">
                                {initialLoadIsComplete && <Visualization />}
                                {current && (
                                    <InterpretationModal
                                        onInterpretationUpdate={
                                            onInterpretationUpdate
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </DndContext>
                    {ui.rightSidebarOpen && current && (
                        <div className="main-right">
                            <DetailsPanel
                                interpretationsUnitRef={interpretationsUnitRef}
                            />
                        </div>
                    )}
                </div>
            </div>
            {locationToConfirm && (
                <Modal small dataTest={'confirm-leave-modal'}>
                    <ModalTitle>
                        {i18n.t('Discard unsaved changes?')}
                    </ModalTitle>
                    <ModalContent>
                        {i18n.t(
                            'Are you sure you want to leave this visualization? Any unsaved changes will be lost.'
                        )}
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button
                                secondary
                                onClick={() => {
                                    setLocationToConfirm(null), history.back()
                                }}
                                dataTest={'confirm-leave-modal-option-cancel'}
                            >
                                {i18n.t('No, cancel')}
                            </Button>

                            <Button
                                onClick={() => {
                                    loadVisualization(locationToConfirm)

                                    setLocationToConfirm(null)
                                }}
                                primary
                                dataTest={'confirm-leave-modal-option-confirm'}
                            >
                                {i18n.t('Yes, leave')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
            <Snackbar />
            <CssVariables colors spacers elevations />
        </>
    )
}

export default App
