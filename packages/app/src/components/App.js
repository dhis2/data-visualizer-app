import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import HeaderBar from '@dhis2/ui/widgets/HeaderBar';

import FatalErrorBoundary from './ErrorBoundaries/FatalErrorBoundary';
import Snackbar from '../components/Snackbar/Snackbar';
import MenuBar from './MenuBar/MenuBar';
import TitleBar from './TitleBar/TitleBar';
import VisualizationTypeSelector from './VisualizationTypeSelector/VisualizationTypeSelector';
import DialogManager from './DimensionsPanel/Dialogs/DialogManager';
import { DimensionsPanel } from '@dhis2/d2-ui-analytics';
import DimensionOptions from './DimensionsPanel/List/DimensionOptions';
import Interpretations from './Interpretations/Interpretations';
import Visualization from './Visualization/Visualization';
import BlankCanvas from './Visualization/BlankCanvas';
import Layout from './Layout/Layout';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import history from '../modules/history';
import defaultMetadata from '../modules/metadata';
import { SOURCE_DIMENSIONS } from '../modules/layout';
import { FIXED_DIMENSIONS } from '../modules/fixedDimensions';
import { setDataTransfer } from '../modules/dnd';
import { isYearOverYear } from '../modules/chartTypes';
import {
    apiFetchAOFromUserDataStore,
    CURRENT_AO_KEY,
} from '../api/userDataStore';

import '@dhis2/ui/css/reset.css';

import './App.css';
import './scrollbar.css';
import { getParentGraphMapFromVisualization } from '../modules/ui';
import AxisSetup from './AxisSetup/AxisSetup';

const peId = FIXED_DIMENSIONS.pe.id;

export class App extends Component {
    unlisten = null;

    state = {
        previousLocation: null,
        dimensionsOptionsAnchorEl: null,
        dimensionId: null,
    };

    /**
     * The following cases require a fetch/refetch of the AO
     * - enter a new url (causing a page load)
     * - file->open (same or different AO)
     * - file->saveAs
     */
    refetch = location => {
        if (!this.state.previousLocation) {
            return true;
        }

        const id = location.pathname.slice(1).split('/')[0];
        const prevId = this.state.previousLocation.slice(1).split('/')[0];

        if (
            id !== prevId ||
            this.state.previousLocation === location.pathname
        ) {
            return true;
        }

        return false;
    };

    loadVisualization = async location => {
        const { store } = this.context;

        if (location.pathname.length > 1) {
            // /currentAnalyticalObject
            // /${id}/
            // /${id}/interpretation/${interpretationId}
            const pathParts = location.pathname.slice(1).split('/');
            const id = pathParts[0];
            const interpretationId = pathParts[2];
            const urlContainsCurrentAOKey = id === CURRENT_AO_KEY;

            if (urlContainsCurrentAOKey) {
                const AO = await apiFetchAOFromUserDataStore();

                this.props.addParentGraphMap(
                    getParentGraphMapFromVisualization(AO)
                );

                this.props.setVisualization(AO);
                this.props.setUiFromVisualization(AO);
                this.props.setCurrentFromUi(this.props.ui);
            }

            if (!urlContainsCurrentAOKey && this.refetch(location)) {
                await store.dispatch(
                    fromActions.tDoLoadVisualization(
                        this.props.apiObjectName,
                        id,
                        interpretationId
                    )
                );
            }

            if (!interpretationId) {
                store.dispatch(fromActions.fromUi.acClearUiInterpretation());
            }
        } else {
            fromActions.clearVisualization(store.dispatch, store.getState);
            fromActions.fromUi.acClearUiInterpretation(store.dispatch);
        }

        this.setState({ previousLocation: location.pathname });
    };

    componentDidMount = async () => {
        const { store } = this.context;
        const { d2, userSettings } = this.props;

        await store.dispatch(
            fromActions.fromSettings.tAddSettings(userSettings)
        );
        store.dispatch(fromActions.fromUser.acReceivedUser(d2.currentUser));
        store.dispatch(fromActions.fromDimensions.tSetDimensions());

        const rootOrgUnit = this.props.settings.rootOrganisationUnit;

        store.dispatch(
            fromActions.fromMetadata.acAddMetadata({
                ...defaultMetadata,
                [rootOrgUnit.id]: {
                    ...rootOrgUnit,
                    path: `/${rootOrgUnit.id}`,
                },
            })
        );

        this.loadVisualization(this.props.location);

        this.unlisten = history.listen(location => {
            this.loadVisualization(location);
        });

        document.body.addEventListener(
            'keyup',
            e =>
                e.key === 'Enter' &&
                e.ctrlKey === true &&
                this.props.setCurrentFromUi(this.props.ui)
        );
    };

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }

    getChildContext() {
        return {
            baseUrl: this.props.baseUrl,
            i18n,
            d2: this.props.d2,
        };
    }

    onDimensionOptionsClick = (event, id) => {
        console.log('dim options click', event.currentTarget);
        event.stopPropagation();

        // set anchor for options menu
        // open menu
        this.setState({
            dimensionOptionsAnchorEl: event.currentTarget,
            dimensionId: id,
        });
    };

    onDimensionOptionsClose = () =>
        this.setState({ dimensionOptionsAnchorEl: null, dimensionId: null });

    onDimensionDragStart = e => {
        setDataTransfer(e, SOURCE_DIMENSIONS);
    };

    disabledDimension = dimension => {
        return dimension.id === peId && isYearOverYear(this.props.type);
    };

    render() {
        const showVis =
            this.props.current &&
            Object.keys(this.props.current).length > 0 &&
            !this.props.loadError;

        return (
            <FatalErrorBoundary>
                <AxisSetup />
                <div className="data-visualizer-app flex-ct flex-dir-col">
                    <div className="section-headerbar">
                        <HeaderBar appName={i18n.t('Data Visualizer')} />
                    </div>
                    <div className="section-toolbar flex-ct">
                        <div className="toolbar-type">
                            <VisualizationTypeSelector />
                        </div>
                        <div className="toolbar-menubar flex-1">
                            <MenuBar apiObjectName={this.props.apiObjectName} />
                        </div>
                    </div>
                    <div className="section-main flex-1 flex-ct">
                        <div className="main-left">
                            <DimensionsPanel
                                dimensions={this.props.dimensions}
                                selectedIds={this.props.selectedIds}
                                disabledDimension={this.disabledDimension}
                                recommendedDimension={dimension =>
                                    this.props.recommendedIds.includes(
                                        dimension.id
                                    )
                                }
                                onDimensionOptionsClick={
                                    this.onDimensionOptionsClick
                                }
                                onDimensionDragStart={this.onDimensionDragStart}
                                onDimensionClick={this.props.onDimensionClick}
                            />
                            {this.state.dimensionOptionsAnchorEl ? (
                                <DimensionOptions
                                    id={this.state.dimensionId}
                                    type={this.props.type}
                                    isSelected={this.props.selectedIds.includes(
                                        this.state.dimensionId
                                    )}
                                    anchorEl={
                                        this.state.dimensionOptionsAnchorEl
                                    }
                                    onCloseMenu={this.onDimensionOptionsClose}
                                />
                            ) : null}
                            />
                            <DialogManager d2={this.props.d2} />
                        </div>
                        <div className="main-center flex-1 flex-ct flex-dir-col">
                            <div className="main-center-layout">
                                <Layout />
                            </div>
                            <div className="main-center-titlebar">
                                <TitleBar />
                            </div>
                            <div className="main-center-canvas flex-1">
                                {showVis ? <Visualization /> : <BlankCanvas />}
                            </div>
                        </div>
                        {this.props.ui.rightSidebarOpen && this.props.current && (
                            <div className="main-right">
                                <Interpretations
                                    type={this.props.apiObjectName}
                                    id={this.props.current.id}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <Snackbar />
            </FatalErrorBoundary>
        );
    }
}

const mapStateToProps = state => {
    return {
        settings: fromReducers.fromSettings.sGetSettings(state),
        current: fromReducers.fromCurrent.sGetCurrent(state),
        interpretations: fromReducers.fromVisualization.sGetInterpretations(
            state
        ),
        loadError: fromReducers.fromLoader.sGetLoadError(state),
        ui: fromReducers.fromUi.sGetUi(state),
        type: fromReducers.fromUi.sGetUiType(state),
        dimensions: fromReducers.fromDimensions.sGetDimensions(state),
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
        recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(
            state
        ),
    };
};

const mapDispatchToProps = dispatch => ({
    setCurrentFromUi: ui =>
        dispatch(fromActions.fromCurrent.acSetCurrentFromUi(ui)),
    setVisualization: visualization =>
        dispatch(
            fromActions.fromVisualization.acSetVisualization(visualization)
        ),
    setUiFromVisualization: visualization =>
        dispatch(fromActions.fromUi.acSetUiFromVisualization(visualization)),
    addParentGraphMap: parentGraphMap =>
        dispatch(fromActions.fromUi.acAddParentGraphMap(parentGraphMap)),
    onDimensionClick: id =>
        dispatch(fromActions.fromUi.acSetUiActiveModalDialog(id)),
});

App.contextTypes = {
    store: PropTypes.object,
};

App.childContextTypes = {
    d2: PropTypes.object,
    baseUrl: PropTypes.string,
    i18n: PropTypes.object,
};

App.propTypes = {
    d2: PropTypes.object,
    baseUrl: PropTypes.string,
    location: PropTypes.object,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
