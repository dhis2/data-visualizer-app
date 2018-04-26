import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import i18n from 'd2-i18n';

import SnackbarMessage from './widgets/SnackbarMessage';
import MenuBar from './MenuBar/MenuBar';
import ChartTypeSelector from './ChartTypeSelector/ChartTypeSelector';
import Dimensions from './Dimensions/Dimensions';
import Visualization from './Visualization/Visualization';
import * as fromReducers from './reducers';
import * as fromActions from './actions';

import './App.css';
import ChartOptions from './ChartOptions/ChartOptions';

export class App extends Component {
    componentDidMount() {
        const { store, d2 } = this.context;
        store.dispatch(fromActions.fromUser.acReceivedUser(d2.currentUser));
        store.dispatch(fromActions.fromDimensions.tSetDimensions());
    }

    getChildContext() {
        return {
            baseUrl: this.props.baseUrl,
            i18n,
        };
    }

    render() {
        return (
            <Fragment>
                <div className="app">
                    <ChartTypeSelector />
                    <MenuBar />
                    <Dimensions />
                    <Visualization />
                </div>
                <Snackbar
                    open={this.props.snackbarOpen}
                    message={
                        <SnackbarMessage message={this.props.snackbarMessage} />
                    }
                    autoHideDuration={this.props.snackbarDuration}
                    onRequestClose={this.props.onCloseSnackbar}
                />
                <ChartOptions />
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
    };
};

App.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object,
};

App.childContextTypes = {
    baseUrl: PropTypes.string,
    i18n: PropTypes.object,
};

export default connect(mapStateToProps, {
    onCloseSnackbar: fromActions.fromSnackbar.acCloseSnackbar,
})(App);
