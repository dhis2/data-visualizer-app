import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Search } from 'material-ui-icons';
import { colors } from '../colors';
import Alternatives from './Alternatives';
import DimensionsManager from './DimensionsManager';
import i18n from '@dhis2/d2-i18n';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';

const style = {
    divContainter: {
        backgroundColor: colors.lightGrey,
    },
    searchIcon: {
        marginTop: 15,
        marginLeft: 5,
        color: '#9E9E9E',
    },
    textField: {
        bottom: 10,
        left: 10,
    },
};

export class Dimensions extends Component {
    state = {
        searchFieldValue: '',
        dialogIsOpen: false,
        dimensions: ['Data', 'Periods', 'Organisation Units'],
    };

    onClick = index => {
        //this.props.tSetDimension('dimension', index); // (dispatch, getState)
        this.toggleDialog();
        this.setState({
            dialogIndexNum: index,
        });
    };

    toggleDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    componentWillReceiveProps = nextProps => {
        this.setState({
            dimensions: [
                ...this.state.dimensions,
                ...Object.entries(nextProps.dimensions).map(
                    entry => entry[1].displayName
                ),
            ],
        });
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainter}>
                <DimensionsManager
                    index={this.state.dialogIndexNum}
                    dialogIsOpen={this.state.dialogIsOpen}
                    toggleDialog={this.toggleDialog}
                />
                <Search style={style.searchIcon} />
                <TextField
                    placeholder={i18n.t('Search dimensions')}
                    style={style.textField}
                    onChange={event =>
                        this.setState({ searchFieldValue: event.target.value })
                    }
                />
                <Alternatives
                    searchFieldValue={this.state.searchFieldValue}
                    dimensions={this.state.dimensions}
                    onClick={this.onClick}
                />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    dimensions: fromReducers.fromDimensions.sGetFromState(state) || {},
});

export default connect(
    mapStateToProps,
    { tSetDimension: fromActions.fromDimensions.acSetDimensions }
)(Dimensions);
