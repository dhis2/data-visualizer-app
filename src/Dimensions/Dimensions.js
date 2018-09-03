import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../colors';
import DimensionList from './DimensionList';
import DialogManager from './DialogManager';
import * as fromReducers from '../reducers';

const style = {
    divContainter: {
        backgroundColor: colors.lightGrey,
        height: 764,
        width: 250,
        position: 'relative',
    },
    searchIcon: {
        color: colors.paleGreay,
        position: 'relative',
        marginTop: 15,
        right: 15,
    },
    textField: {
        bottom: 9,
        right: 8,
    },
};

export class Dimensions extends Component {
    state = { searchText: '', dialogDimId: null };

    handleChange = event => {
        this.setState({ searchText: event.target.value });
    };

    toggleDialog = value => {
        this.setState({ dialogDimId: value });
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainter}>
                <DialogManager
                    dialogIsOpen={
                        this.state.dialogDimId !== null ? true : false
                    }
                    id={this.state.dialogDimId}
                    toggleDialog={this.toggleDialog}
                />
                <Search style={style.searchIcon} />
                <TextField
                    placeholder={i18n.t('Search dimensions')}
                    style={style.textField}
                    onChange={this.handleChange}
                />
                <DimensionList
                    {...this.props}
                    searchText={this.state.searchText}
                    toggleDialog={this.toggleDialog}
                />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    dimensions: fromReducers.fromDimensions.sGetSelected(state),
    isRecommended: fromReducers.fromDimensions.sGetRecommended(state),
});

export default connect(mapStateToProps)(Dimensions);
