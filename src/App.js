import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import i18n from '@dhis2/d2-i18n';

import SnackbarMessage from './widgets/SnackbarMessage';
import MenuBar from './MenuBar/MenuBar';
import VisualizationTypeSelector from './VisualizationTypeSelector/VisualizationTypeSelector';
import Dimensions from './Dimensions/Dimensions';
import Visualization from './Visualization/Visualization';
import * as fromReducers from './reducers';
import * as fromActions from './actions';
import { getFieldsByType } from './fields';

import './App.css';

export class App extends Component {
    componentDidMount() {
        const { store } = this.context;
        const d2 = this.props.d2;
        store.dispatch(fromActions.fromUser.acReceivedUser(d2.currentUser));
        store.dispatch(fromActions.fromDimensions.tGetDimensions());
    }

    loadExampleChart = async () => {
        const d2 = this.props.d2;
        const type = 'chart';
        const id = 'Tun9tJb3sQt';

        const chart1 = await d2.models[type].get(id, {
            fields: getFieldsByType(type),
        });

        console.log('chart1', chart1);
    };

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
                onRequestClose={this.props.onCloseSnackbar}
            />
        );
    }

    render() {
        return (
            <Fragment>
                <div className="app">
                    <div className="item1 headerbar">Headerbar</div>
                    <div className="item2 visualization-type-selector">
                        <VisualizationTypeSelector />
                    </div>
                    <div className="item3 menu-bar">
                        <MenuBar />
                    </div>
                    <div className="item4 dimensions">
                        <Dimensions />
                    </div>
                    <div className="item5 chart-layout">Chart layout</div>
                    <div className="item6 interpretations">
                        Interpretations panel
                    </div>
                    <div className="item7 canvas">
                        <Visualization />
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
};

export default connect(
    mapStateToProps,
    {
        onCloseSnackbar: fromActions.fromSnackbar.acCloseSnackbar,
    }
)(App);
