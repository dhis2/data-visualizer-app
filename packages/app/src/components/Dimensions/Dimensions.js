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
        if (typeof value === 'object') {
            //console.log(this.state.dialogDimId);
            //this.props.setDimension

            //console.log(value);
            this.props.addDataDimensions(value);
            this.setState({
                dialogDimId: null,
            });
        } else {
            this.setState({
                dialogDimId: value,
            });
        }
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainer}>
                <DialogManager
                    dialogIsOpen={!!this.state.dialogDimId}
                    id={this.state.dialogDimId}
                    toggleDialog={this.toggleDialog}
                />
                <TextField
                    style={style.textField}
                    onChange={this.handleChange}
                    placeholder={i18n.t(SEARCHFIELD_PLACEHOLDER)}
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
