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
import PropTypes from 'prop-types'
import React, { Component, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as fromActions from '../actions/index.js'
import { Snackbar } from '../components/Snackbar/Snackbar.js'
import { USER_DATASTORE_CURRENT_AO_KEY } from '../modules/currentAnalyticalObject.js'
import history from '../modules/history.js'
import { getParentGraphMapFromVisualization } from '../modules/ui.js'
import { STATE_DIRTY, getVisualizationState } from '../modules/visualization.js'
import * as fromReducers from '../reducers/index.js'
import { default as DetailsPanel } from './DetailsPanel/DetailsPanel.js'
import DimensionsPanel from './DimensionsPanel/DimensionsPanel.js'
import DndContext from './DndContext.js'
import { InterpretationModal } from './InterpretationModal/index.js'
import Layout from './Layout/Layout.js'
import { MenuBar } from './MenuBar/MenuBar.js'
import { TitleBar } from './TitleBar/TitleBar.js'
import { Visualization } from './Visualization/Visualization.js'
import { VisualizationTypeSelector } from './VisualizationTypeSelector/VisualizationTypeSelector.js'
import './App.css'
import './scrollbar.css'

// Used to avoid repeating `history` listener calls -- see below
let lastLocation

export class UnconnectedApp extends Component {
    unlisten = null

    apiObjectName = 'visualization'

    interpretationsUnitRef = React.createRef()

    onInterpretationUpdate = () =>
        this.interpretationsUnitRef.current?.refresh()

    state = {
        previousLocation: null,
        initialLoadIsComplete: false,
        locationToConfirm: false,
    }

    /**
     * The following cases require a fetch/refetch of the AO
     * - enter a new url (causing a page load)
     * - file->open (same or different AO)
     * - file->saveAs
     */
    refetch = (location) => {
        if (!this.state.previousLocation) {
            return true
        }

        const id = location.pathname.slice(1).split('/')[0]
        const prevId = this.state.previousLocation.slice(1).split('/')[0]

        if (
            id !== prevId ||
            this.state.previousLocation === location.pathname
        ) {
            return true
        }

        return false
    }

    parseLocation = (location) => {
        const pathParts = location.pathname.slice(1).split('/')
        const id = pathParts[0]
        const interpretationId = pathParts[2]
        return { id, interpretationId }
    }

    loadVisualization = async (location) => {
        if (location.pathname.length > 1) {
            // /currentAnalyticalObject
            // /${id}/
            // /${id}/interpretation/${interpretationId}
            const { id } = this.parseLocation(location)

            const urlContainsCurrentAOKey = id === USER_DATASTORE_CURRENT_AO_KEY

            if (urlContainsCurrentAOKey) {
                this.props.addParentGraphMap(
                    getParentGraphMapFromVisualization(this.props.currentAO)
                )

                // clear visualization and current
                // to avoid leave them "dirty" when navigating to
                // /currentAnalyticalObject from a previously saved AO
                this.props.clearVisualization()
                this.props.clearCurrent()

                this.props.setUiFromVisualization(this.props.currentAO)
                this.props.setCurrentFromUi()
            }

            if (!urlContainsCurrentAOKey && this.refetch(location)) {
                await this.props.setVisualization({
                    id,
                    ouLevels: this.props.ouLevels,
                })
            }
        } else {
            this.props.clearAll()
        }
        this.setState({ initialLoadIsComplete: true })
        this.setState({ previousLocation: location.pathname })
    }

    componentDidMount = () => {
        const { currentUser, rootOrganisationUnits, systemSettings, location } =
            this.props

        this.props.addSettings({
            ...systemSettings,
            ...currentUser.settings,
            rootOrganisationUnits,
        })

        this.props.setDimensions()

        const metaData = rootOrganisationUnits.reduce((obj, rootOrgUnit) => {
            if (rootOrgUnit.id) {
                obj[rootOrgUnit.id] = {
                    ...rootOrgUnit,
                    path: `/${rootOrgUnit.id}`,
                }
            }

            return obj
        }, {})

        this.props.addMetadata(metaData)

        this.loadVisualization(location)

        this.unlisten = history.listen(({ location }) => {
            // Avoid duplicate actions for the same update object. This also
            // avoids a loop, because dispatching a pop state effect below also
            // triggers listeners again (but with the same location object key)
            const { key, pathname, search } = location
            if (
                key === lastLocation?.key &&
                pathname === lastLocation?.pathname &&
                search === lastLocation?.search
            ) {
                return
            }
            lastLocation = location
            // Dispatch this event for external routing listeners to observe,
            // e.g. global shell
            const popStateEvent = new PopStateEvent('popstate', {
                state: location.state,
            })
            dispatchEvent(popStateEvent)

            const isSaving = location.state?.isSaving
            const isOpening = location.state?.isOpening
            const isResetting = location.state?.isResetting
            /*
            const isModalOpening = location.state?.isModalOpening
            const isModalClosing = location.state?.isModalClosing
            const isValidLocationChange =
                this.state.previousLocation !== location.pathname &&
                !isModalOpening &&
                !isModalClosing
*/
            if (
                // currently editing
                getVisualizationState(
                    this.props.visualization,
                    this.props.current
                ) === STATE_DIRTY &&
                // wanting to navigate elsewhere
                this.state.previousLocation !== location.pathname &&
                // not saving
                !isSaving
            ) {
                this.setState({ locationToConfirm: location })
            } else {
                if (
                    isSaving ||
                    isOpening ||
                    isResetting ||
                    this.state.previousLocation !== location.pathname
                ) {
                    this.loadVisualization(location)
                }

                this.setState({ locationToConfirm: null })
            }
        })

        document.body.addEventListener(
            'keyup',
            (e) =>
                e.key === 'Enter' &&
                e.ctrlKey === true &&
                this.props.setCurrentFromUi()
        )

        window.addEventListener('beforeunload', (event) => {
            if (
                getVisualizationState(
                    this.props.visualization,
                    this.props.current
                ) === STATE_DIRTY
            ) {
                event.preventDefault()
                event.returnValue = i18n.t('You have unsaved changes.')
            }
        })
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten()
        }
    }

    render() {
        return (
            <>
                <div className="data-visualizer-app flex-ct flex-dir-col">
                    <Toolbar>
                        <VisualizationTypeSelector />
                        <MenuBar
                            apiObjectName={this.apiObjectName}
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
                                    {this.state.initialLoadIsComplete && (
                                        <Visualization />
                                    )}
                                    {this.props.current && (
                                        <InterpretationModal
                                            onInterpretationUpdate={
                                                this.onInterpretationUpdate
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </DndContext>
                        {this.props.ui.rightSidebarOpen && this.props.current && (
                            <div className="main-right">
                                <DetailsPanel
                                    interpretationsUnitRef={
                                        this.interpretationsUnitRef
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
                {this.state.locationToConfirm && (
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
                                        this.setState({
                                            locationToConfirm: null,
                                        })

                                        history.back()
                                    }}
                                    dataTest={
                                        'confirm-leave-modal-option-cancel'
                                    }
                                >
                                    {i18n.t('No, cancel')}
                                </Button>

                                <Button
                                    onClick={() => {
                                        this.loadVisualization(
                                            this.state.locationToConfirm
                                        )

                                        this.setState({
                                            locationToConfirm: null,
                                        })
                                    }}
                                    primary
                                    dataTest={
                                        'confirm-leave-modal-option-confirm'
                                    }
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
}

UnconnectedApp.contextTypes = {
    store: PropTypes.object,
}

UnconnectedApp.propTypes = {
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    addSettings: PropTypes.func,
    clearAll: PropTypes.func,
    clearCurrent: PropTypes.func,
    clearVisualization: PropTypes.func,
    current: PropTypes.object,
    currentAO: PropTypes.object,
    currentUser: PropTypes.object,
    location: PropTypes.object,
    ouLevels: PropTypes.array,
    rootOrganisationUnits: PropTypes.array,
    setCurrentFromUi: PropTypes.func,
    setDimensions: PropTypes.func,
    setUiFromVisualization: PropTypes.func,
    setVisualization: PropTypes.func,
    systemSettings: PropTypes.object,
    ui: PropTypes.object,
    visualization: PropTypes.object,
}

export const App = () => {
    const dispatch = useDispatch()

    const [currentAO] = useSetting(USER_DATASTORE_CURRENT_AO_KEY)
    const { currentUser, orgUnitLevels, rootOrgUnits, systemSettings } =
        useCachedDataQuery()
    const location = history.location
    const current = useSelector(fromReducers.fromCurrent.sGetCurrent)
    const ui = useSelector(fromReducers.fromUi.sGetUi)
    const visualization = useSelector(
        fromReducers.fromVisualization.sGetVisualization
    )
    const snackbar = useSelector(fromReducers.fromSnackbar.sGetSnackbar)

    const setCurrentFromUi = useCallback(
        () => dispatch(fromActions.fromCurrent.tSetCurrentFromUi()),
        [dispatch]
    )
    const clearVisualization = useCallback(
        () => dispatch(fromActions.fromVisualization.acClearVisualization()),
        [dispatch]
    )
    const clearCurrent = useCallback(
        () => dispatch(fromActions.fromCurrent.acClearCurrent()),
        [dispatch]
    )
    const setUiFromVisualization = useCallback(
        (visualization) =>
            dispatch(
                fromActions.fromUi.acSetUiFromVisualization(visualization)
            ),
        [dispatch]
    )
    const addParentGraphMap = useCallback(
        (parentGraphMap) =>
            dispatch(fromActions.fromUi.acAddParentGraphMap(parentGraphMap)),
        [dispatch]
    )
    const addSettings = useCallback(
        (settings) =>
            dispatch(fromActions.fromSettings.acAddSettings(settings)),
        [dispatch]
    )
    const setDimensions = useCallback(
        () => dispatch(fromActions.fromDimensions.tSetDimensions()),
        [dispatch]
    )
    const addMetadata = useCallback(
        (metadata) =>
            dispatch(fromActions.fromMetadata.acAddMetadata(metadata)),
        [dispatch]
    )
    const setVisualization = useCallback(
        (args) => dispatch(fromActions.tDoLoadVisualization(args)),
        [dispatch]
    )
    const clearAll = useCallback(
        () => dispatch(fromActions.clearAll()),
        [dispatch]
    )

    return (
        <UnconnectedApp
            current={current}
            currentAO={currentAO}
            currentUser={currentUser}
            location={location}
            ouLevels={orgUnitLevels}
            rootOrganisationUnits={rootOrgUnits}
            snackbar={snackbar}
            systemSettings={systemSettings}
            ui={ui}
            visualization={visualization}
            addMetadata={addMetadata}
            addParentGraphMap={addParentGraphMap}
            addSettings={addSettings}
            clearAll={clearAll}
            clearCurrent={clearCurrent}
            clearVisualization={clearVisualization}
            setCurrentFromUi={setCurrentFromUi}
            setDimensions={setDimensions}
            setVisualization={setVisualization}
            setUiFromVisualization={setUiFromVisualization}
        />
    )
}
