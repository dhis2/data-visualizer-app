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
        top: 5,
    },
    textField: {
        right: 25,
    },
};

const INPUT_PLACEHOLDER = 'Search Dimensions';

export class Dimensions extends Component {
    state = { searchText: '', dialogDim: null };

    handleChange = event => {
        this.setState({ searchText: event.target.value });
    };

    toggleDialog = dimension => {
        this.setState({
            dialogDim: dimension,
        });
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainer}>
                <DialogManager
                    dialogIsOpen={!!this.state.dialogDim}
                    dimension={this.state.dialogDim}
                    toggleDialog={this.toggleDialog}
                />
                <TextField
                    style={style.textField}
                    onChange={this.handleChange}
                    placeholder={i18n.t(INPUT_PLACEHOLDER)}
                    InputProps={{
                        startAdornment: <Search style={style.searchIcon} />,
                    }}
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
