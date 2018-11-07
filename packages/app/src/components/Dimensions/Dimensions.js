import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import i18n from '@dhis2/d2-i18n';
import DimensionList from './DimensionList';
import DialogManager from './Dialogs/DialogManager';
import { styles } from './styles/Dimensions.style';

export class Dimensions extends Component {
    state = { filterText: '' };

    onFilterTextChange = event => {
        this.setState({ filterText: event.target.value });
    };

    render = () => {
        return (
            <div style={styles.divContainer}>
                <DialogManager />
                <TextField
                    style={styles.textField}
                    onChange={this.onFilterTextChange}
                    placeholder={i18n.t('Search Dimensions')}
                    InputProps={{
                        startAdornment: <Search style={styles.searchIcon} />,
                    }}
                />
                <DimensionList filterText={this.state.filterText} />
            </div>
        );
    };
}

export default Dimensions;
