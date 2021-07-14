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
import * as fromActions from '../actions'
import {
    apiFetchAOFromUserDataStore,
    CURRENT_AO_KEY,
} from '../api/userDataStore'
import Snackbar from '../components/Snackbar/Snackbar'
import history from '../modules/history'
import defaultMetadata from '../modules/metadata'
import { getParentGraphMapFromVisualization } from '../modules/ui'
import { STATE_DIRTY, getVisualizationState } from '../modules/visualization'
import * as fromReducers from '../reducers'
import { sGetVisualization } from '../reducers/visualization'
import DimensionsPanel from './DimensionsPanel/DimensionsPanel'
import DndContext from './DndContext'
import Interpretations from './Interpretations/Interpretations'
import Layout from './Layout/Layout'
import MenuBar from './MenuBar/MenuBar'
import TitleBar from './TitleBar/TitleBar'
import Visualization from './Visualization/Visualization'
import { APPROVAL_LEVEL_OPTION_AUTH } from './VisualizationOptions/Options/ApprovalLevel'
import VisualizationTypeSelector from './VisualizationTypeSelector/VisualizationTypeSelector'
import './App.css'
import './scrollbar.css'

export class App extends Component {
    unlisten = null

    apiObjectName = 'visualization'

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
    refetch = location => {
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

    parseLocation = location => {
        const pathParts = location.pathname.slice(1).split('/')
        const id = pathParts[0]
        const interpretationId = pathParts[2]
        return { id, interpretationId }
    }

    loadVisualization = async location => {
        if (location.pathname.length > 1) {
            // /currentAnalyticalObject
            // /${id}/
            // /${id}/interpretation/${interpretationId}
            const { id, interpretationId } = this.parseLocation(location)

            const urlContainsCurrentAOKey = id === CURRENT_AO_KEY

            if (urlContainsCurrentAOKey) {
                const AO = await apiFetchAOFromUserDataStore()

                this.props.addParentGraphMap(
                    getParentGraphMapFromVisualization(AO)
                )

                // clear visualization and current
                // to avoid leave them "dirty" when navigating to
                // /currentAnalyticalObject from a previously saved AO
                this.props.clearVisualization()
                this.props.clearCurrent()

                this.props.setUiFromVisualization(AO)
                this.props.setCurrentFromUi(this.props.ui)
            }

            if (!urlContainsCurrentAOKey && this.refetch(location)) {
                await this.props.setVisualization({
                    id,
                    interpretationId,
                    ouLevels: this.props.ouLevels,
                })
            }

            if (!interpretationId) {
                this.props.clearInterpretation()
            }
        } else {
            this.props.clearAll()
            this.props.clearInterpretation()
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

        const rootOrgUnit = this.props.settings.rootOrganisationUnit

        if (rootOrgUnit && rootOrgUnit.id) {
            this.props.addMetadata({
                ...defaultMetadata(),
                [rootOrgUnit.id]: {
                    ...rootOrgUnit,
                    path: `/${rootOrgUnit.id}`,
                },
            })
        }

        this.loadVisualization(this.props.location)

        this.unlisten = history.listen(({ location }) => {
            const isSaving = location.state?.isSaving
            const isOpening = location.state?.isOpening
            const isResetting = location.state?.isResetting
            const { interpretationId } = this.parseLocation(location)

            if (
                // currently editing
                getVisualizationState(
                    this.props.visualization,
                    this.props.current
                ) === STATE_DIRTY &&
                // wanting to navigate elsewhere
                this.state.previousLocation !== location.pathname &&
                // currently *not* viewing an interpretation
                !(this.props.interpretation.id || interpretationId) &&
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
            e =>
                e.key === 'Enter' &&
                e.ctrlKey === true &&
                this.props.setCurrentFromUi(this.props.ui)
        )

        window.addEventListener('beforeunload', event => {
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
                                </div>
                            </div>
                        </DndContext>
                        {this.props.ui.rightSidebarOpen && this.props.current && (
                            <div className="main-right">
                                <Interpretations
                                    type={this.apiObjectName}
                                    id={this.props.current.id}
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

                                        history.goBack()
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
                <CssVariables colors spacers />
            </>
        )
    }
}

const mapStateToProps = state => ({
    settings: fromReducers.fromSettings.sGetSettings(state),
    current: fromReducers.fromCurrent.sGetCurrent(state),
    interpretation: fromReducers.fromUi.sGetUiInterpretation(state),
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
    clearInterpretation: fromActions.fromUi.acClearUiInterpretation,
    clearAll: fromActions.clearAll,
}

App.contextTypes = {
    store: PropTypes.object,
}

App.childContextTypes = {
    d2: PropTypes.object,
    dataEngine: PropTypes.object,
    baseUrl: PropTypes.string,
    i18n: PropTypes.object,
}

App.propTypes = {
    addMetadata: PropTypes.func,
    addParentGraphMap: PropTypes.func,
    addSettings: PropTypes.func,
    baseUrl: PropTypes.string,
    clearAll: PropTypes.func,
    clearCurrent: PropTypes.func,
    clearInterpretation: PropTypes.func,
    clearVisualization: PropTypes.func,
    current: PropTypes.object,
    d2: PropTypes.object,
    dataEngine: PropTypes.object,
    interpretation: PropTypes.object,
    loadUserAuthority: PropTypes.func,
    location: PropTypes.object,
    ouLevels: PropTypes.array,
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
