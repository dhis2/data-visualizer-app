import { apiFetchOrganisationUnitLevels } from '@dhis2/analytics'
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as fromActions from '../actions/index.js'
import { Snackbar } from '../components/Snackbar/Snackbar.js'
import { USER_DATASTORE_CURRENT_AO_KEY } from '../modules/currentAnalyticalObject.js'
import history from '../modules/history.js'
import defaultMetadata from '../modules/metadata.js'
import { getParentGraphMapFromVisualization } from '../modules/ui.js'
import { STATE_DIRTY, getVisualizationState } from '../modules/visualization.js'
import * as fromReducers from '../reducers/index.js'
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

export class UnconnectedApp extends Component {
    unlisten = null

    apiObjectName = 'visualization'

    interpretationsUnitRef = React.createRef()

    onInterpretationUpdate = () => this.interpretationsUnitRef.current.refresh()

    state = {
        previousLocation: null,
        initialLoadIsComplete: false,
        locationToConfirm: false,

        ouLevels: null,
    }

    fetchOuLevels = async () => {
        const ouLevels = await apiFetchOrganisationUnitLevels(
            this.props.dataEngine
        )

        this.setState({ ouLevels: ouLevels })
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

                this.props.setUiFromVisualization(currentAO)
                this.props.setCurrentFromUi(this.props.ui)
            }

            if (!urlContainsCurrentAOKey && this.refetch(location)) {
                await this.props.setVisualization({
                    id,
                    ouLevels: this.state.ouLevels,
                })
            }
        } else {
            this.props.clearAll()
        }
        this.setState({ initialLoadIsComplete: true })
        this.setState({ previousLocation: location.pathname })
    }

    componentDidMount = async () => {
        const { d2, userSettings } = this.props

        await this.props.addSettings(userSettings)
        this.props.setUser(d2.currentUser)
        this.props.loadUserAuthority(APPROVAL_LEVEL_OPTION_AUTH)
        this.props.setDimensions()

        await this.fetchOuLevels()

        const rootOrgUnits = this.props.settings.rootOrganisationUnits

        const metaData = { ...defaultMetadata() }

        rootOrgUnits.forEach((rootOrgUnit) => {
            if (rootOrgUnit.id) {
                metaData[rootOrgUnit.id] = {
                    ...rootOrgUnit,
                    path: `/${rootOrgUnit.id}`,
                }
            }
        })

        this.props.addMetadata(metaData)

        this.loadVisualization(this.props.location)

        this.unlisten = history.listen(({ location }) => {
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
                this.props.setCurrentFromUi(this.props.ui)
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

    getChildContext() {
        return {
            baseUrl: this.props.baseUrl,
            i18n,
            d2: this.props.d2,
            dataEngine: this.props.dataEngine,
        }
    }

    render() {
        return (
            <>
                <div className="data-visualizer-app flex-ct flex-dir-col">
                    <div className="section-toolbar flex-ct">
                        <div className="toolbar-type">
                            <VisualizationTypeSelector />
                        </div>
                        <div className="toolbar-menubar flex-grow-1">
                            <MenuBar
                                apiObjectName={this.apiObjectName}
                                dataTest={'app-menubar'}
                            />
                        </div>
                    </div>
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

const mapStateToProps = (state) => ({
    settings: fromReducers.fromSettings.sGetSettings(state),
    current: fromReducers.fromCurrent.sGetCurrent(state),
    ui: fromReducers.fromUi.sGetUi(state),
    visualization: sGetVisualization(state),
    snackbar: fromReducers.fromSnackbar.sGetSnackbar(state),
})

const mapDispatchToProps = {
    setCurrentFromUi: fromActions.fromCurrent.acSetCurrentFromUi,
    clearVisualization: fromActions.fromVisualization.acClear,
    clearCurrent: fromActions.fromCurrent.acClear,
    setUiFromVisualization: fromActions.fromUi.acSetUiFromVisualization,
    addParentGraphMap: fromActions.fromUi.acAddParentGraphMap,
    clearSnackbar: fromActions.fromSnackbar.acClearSnackbar,
    addSettings: fromActions.fromSettings.tAddSettings,
    setUser: fromActions.fromUser.acReceivedUser,
    loadUserAuthority: fromActions.fromUser.tLoadUserAuthority,
    setDimensions: fromActions.fromDimensions.tSetDimensions,
    addMetadata: fromActions.fromMetadata.acAddMetadata,
    setVisualization: fromActions.tDoLoadVisualization,
    clearAll: fromActions.clearAll,
}

UnconnectedApp.contextTypes = {
    store: PropTypes.object,
}

UnconnectedApp.childContextTypes = {
    d2: PropTypes.object,
    dataEngine: PropTypes.object,
    baseUrl: PropTypes.string,
    i18n: PropTypes.object,
}

UnconnectedApp.propTypes = {
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    addSettings: PropTypes.func,
    baseUrl: PropTypes.string,
    clearAll: PropTypes.func,
    clearCurrent: PropTypes.func,
    clearVisualization: PropTypes.func,
    current: PropTypes.object,
    d2: PropTypes.object,
    dataEngine: PropTypes.object,
    loadUserAuthority: PropTypes.func,
    location: PropTypes.object,
    setCurrentFromUi: PropTypes.func,
    setDimensions: PropTypes.func,
    setUiFromVisualization: PropTypes.func,
    setUser: PropTypes.func,
    setVisualization: PropTypes.func,
    settings: PropTypes.object,
    ui: PropTypes.object,
    userSettings: PropTypes.object,
    visualization: PropTypes.object,
}

const withCurrentAO = (Component) => {
    return function WrappedComponent(props) {
        const [currentAO] = useSetting(USER_DATASTORE_CURRENT_AO_KEY)

        return <Component {...props} currentAO={currentAO} />
    }
}

export const App = () => {
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(withCurrentAO(UnconnectedApp))
}
