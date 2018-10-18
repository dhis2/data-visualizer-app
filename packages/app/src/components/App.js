import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import i18n from '@dhis2/d2-i18n';

import SnackbarMessage from '../widgets/SnackbarMessage';
import MenuBar from './MenuBar/MenuBar';
import VisualizationTypeSelector from './VisualizationTypeSelector/VisualizationTypeSelector';
import Dimensions from './Dimensions/Dimensions';
import Visualization from './Visualization/Visualization';
import BlankCanvas from './Visualization/BlankCanvas';
import Layout from './Layout/Layout';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import history from '../history';
import defaultMetadata from '../metadata';

import './App.css';

export class App extends Component {
    unlisten = null;

    loadVisualization = location => {
        const { store } = this.context;

        if (location.pathname.length > 1) {
            store.dispatch(
                fromActions.tDoLoadVisualization(
                    this.props.apiObjectName,
                    location.pathname.slice(1)
                )
            );
        } else {
            fromActions.clearVisualization(store.dispatch);
        }
    };

    componentDidMount() {
        const { store } = this.context;
        const d2 = this.props.d2;

        store.dispatch(fromActions.fromSettings.tSetSettings());
        store.dispatch(fromActions.fromUser.acReceivedUser(d2.currentUser));
        store.dispatch(fromActions.fromDimensions.tSetDimensions());
        store.dispatch(fromActions.fromMetadata.acAddMetadata(defaultMetadata));

        this.loadVisualization(this.props.location);

        this.unlisten = history.listen(location => {
            this.loadVisualization(location);
        });
    }

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
        const hasCurrent =
            this.props.current && Object.keys(this.props.current).length > 0;

        return (
            <Fragment>
                <div className="app">
                    <div className="item1 headerbar">Headerbar</div>
                    <div className="item2 visualization-type-selector">
                        <VisualizationTypeSelector />
                    </div>
                    <div className="item3 menu-bar">
                        <MenuBar apiObjectName={this.props.apiObjectName} />
                    </div>
                    <div className="item4 dimensions">
                        <Dimensions />
                    </div>
                    <div className="item5 chart-layout">
                        <Layout />
                    </div>
                    <div className="item6 interpretations">
                        Interpretations panel
                    </div>
                    <div className="item7 canvas">
                        {hasCurrent ? (
                            <Visualization d2={this.props.d2} />
                        ) : (
                            <BlankCanvas />
                        )}
                    </div>
                </div>
                {this.renderSnackbar()}
            </Fragment>
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
        current: fromReducers.fromCurrent.sGetCurrent(state),
    };
};

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
    {
        onCloseSnackbar: fromActions.fromSnackbar.acCloseSnackbar,
    }
)(App);
