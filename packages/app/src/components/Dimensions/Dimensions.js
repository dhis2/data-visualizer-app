import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../colors';
import DimensionList from './DimensionList';
import DialogManager from './DialogManager';

const style = {
    divContainer: {
        backgroundColor: colors.lightGrey,
        height: 764,
        width: 250,
    },
    searchIcon: {
        color: colors.charcoalGrey,
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
            <div className={'dimensions'} style={style.divContainer}>
                <DialogManager
                    dialogIsOpen={!!this.state.dialogDimId}
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
                    searchText={this.state.searchText}
                    toggleDialog={this.toggleDialog}
                />
            </div>
        );
    };
}

export default Dimensions;
