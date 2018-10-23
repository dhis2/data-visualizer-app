import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import i18n from '@dhis2/d2-i18n';
import DimensionList from './DimensionList';
import { DialogManager } from './DialogManager';
import { styles } from './styles/Dimensions.style';

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

    render = () => {
        return (
            <div className={'dimensions'} style={styles.divContainer}>
                <DialogManager
                    dialogIsOpen={!!this.state.dialogDimId}
                    id={this.state.dialogDimId}
                    toggleDialog={this.toggleDialog}
                />
                <TextField
                    style={styles.textField}
                    onChange={this.handleChange}
                    placeholder={SEARCHFIELD_PLACEHOLDER}
                    InputProps={{
                        startAdornment: <Search style={styles.searchIcon} />,
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
