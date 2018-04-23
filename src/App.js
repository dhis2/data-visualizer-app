import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import i18n from 'd2-i18n';

import SnackbarMessage from './widgets/SnackbarMessage';
import TopBar from './TopBar/TopBar';
import Dimensions from './Dimensions/Dimensions';
import * as fromReducers from './reducers';
import * as fromActions from './actions';

const style = {
    contentArea: {
        padding: '10px',
        minWidth: '800px',
        flex: '1',
    },
    app: {
        fontFamily: 'roboto',
        display: 'grid',
    },
};

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
            <div className="App" style={style.app}>
                <TopBar />
                <section
                    style={{
                        width: '100%',
                        marginTop: '3px',
                    }}
                >
                    <Dimensions />
                    <div style={style.contentArea}>
                        <div>Visualization axes</div>
                        <div>Canvas</div>
                    </div>
                </section>
                <Snackbar
                    open={this.props.snackbarOpen}
                    message={
                        <SnackbarMessage message={this.props.snackbarMessage} />
                    }
                    autoHideDuration={this.props.snackbarDuration}
                    onRequestClose={this.props.onCloseSnackbar}
                />
            </div>
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
