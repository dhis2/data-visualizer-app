import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import i18n from '@dhis2/d2-i18n';
import UI from 'ui/core/UI';
import HeaderBar from 'ui/widgets/HeaderBar';

import SnackbarMessage from '../widgets/SnackbarMessage';
import MenuBar from './MenuBar/MenuBar';
import TitleBar from './TitleBar/TitleBar';
import VisualizationTypeSelector from './VisualizationTypeSelector/VisualizationTypeSelector';
import Dimensions from './Dimensions/Dimensions';
import Interpretations from './Interpretations/Interpretations';
import Visualization from './Visualization/Visualization';
import BlankCanvas from './Visualization/BlankCanvas';
import Layout from './Layout/Layout';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import history from '../modules/history';
import defaultMetadata from '../modules/metadata';
import { sGetUi } from '../reducers/ui';

import './App.css';
import './scrollbar.css';

export class App extends Component {
    unlisten = null;

    state = {
        previousLocation: null,
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
            // /${id}/
            // /${id}/interpretation/${interpretationId}
            const pathParts = location.pathname.slice(1).split('/');
            const id = pathParts[0];
            const interpretationId = pathParts[2];

            if (this.refetch(location)) {
                await store.dispatch(
                    fromActions.tDoLoadVisualization(
                        this.props.apiObjectName,
                        id,
                        this.props.settings
                    )
                );
            }

            if (interpretationId) {
                store.dispatch(
                    fromActions.fromUi.acSetUiInterpretation({
                        id: interpretationId,
                    })
                );
                store.dispatch(fromActions.fromUi.acOpenUiRightSidebarOpen());
            } else {
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

        store.dispatch(
            fromActions.fromMetadata.acAddMetadata({
                ...defaultMetadata,
                [this.props.settings.rootOrganisationUnit.id]: this.props
                    .settings.rootOrganisationUnit,
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
                this.props.onKeyUp(this.props.ui)
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

    renderSnackbar() {
        return (
            <Snackbar
                open={this.props.snackbarOpen}
                message={
                    <SnackbarMessage message={this.props.snackbarMessage} />
                }
                autoHideDuration={this.props.snackbarDuration}
                onClose={this.props.onCloseSnackbar}
            />
        );
    }

    render() {
        const showVis =
            this.props.current &&
            Object.keys(this.props.current).length > 0 &&
            !this.props.loadError;

        return (
            <UI>
                <div className="app flex-ct flex-dir-col">
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
                            <Dimensions />
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
                        {this.props.ui.rightSidebarOpen && (
                            <div className="main-right">
                                <Interpretations
                                    type={this.props.apiObjectName}
                                    id={this.props.current.id}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {this.renderSnackbar()}
            </UI>
        );
    }
}

const mapStateToProps = state => {
    const { message, duration, open } = fromReducers.fromSnackbar.sGetSnackbar(
        state
    );
    return {
        snackbarOpen: open,
        snackbarMessage: message,
        snackbarDuration: duration,
        settings: fromReducers.fromSettings.sGetSettings(state),
        current: fromReducers.fromCurrent.sGetCurrent(state),
        loadError: fromReducers.fromLoader.sGetLoadError(state),
        ui: sGetUi(state),
    };
};

const mapDispatchToProps = dispatch => ({
    onKeyUp: ui => dispatch(fromActions.fromCurrent.acSetCurrentFromUi(ui)),
    onCloseSnackbar: () => dispatch(fromActions.fromSnackbar.acCloseSnackbar()),
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
