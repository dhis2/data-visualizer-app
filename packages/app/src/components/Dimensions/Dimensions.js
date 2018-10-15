import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../colors';
import DimensionList from './DimensionList';
import DialogManager from './DialogManager';
import { acAddUiLayoutDimensions, acSetUiItems } from '../../actions/ui';

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
        left: 5,
    },
};

const SEARCHFIELD_PLACEHOLDER = i18n.t('Search Dimensions');

export class Dimensions extends Component {
    state = { searchText: '', dialogDimId: null };

    handleChange = event => {
        this.setState({ searchText: event.target.value });
    };

    toggleDialog = value => {
        this.setState({
            dialogDimId: value,
        });
    };

    setDimension = ids => {
        this.props.addDataDimensions(ids);
        this.toggleDialog(null);
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainer}>
                <DialogManager
                    dialogIsOpen={!!this.state.dialogDimId}
                    id={this.state.dialogDimId}
                    toggleDialog={this.toggleDialog}
                    setDimension={this.setDimension}
                />
                <TextField
                    style={style.textField}
                    onChange={this.handleChange}
                    placeholder={SEARCHFIELD_PLACEHOLDER}
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

export default connect(
    null,
    {
        setDimension: id => acAddUiLayoutDimensions(id),
        addDataDimensions: ids => acSetUiItems(ids),
    }
)(Dimensions);
