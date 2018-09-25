import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';

const style = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        backgroundColor: colors.white,
        height: 39,
        width: 420,
        borderBottom: 0,
    },
    textField: {
        width: '98%',
        paddingRight: 5,
        fontSize: 14,
    },
    searchIcon: {
        paddingTop: 10,
        paddingLeft: 5,
    },
    placeholder: {
        fontSize: 14,
        paddingTop: 12,
        paddingLeft: 5,
    },
};

const INPUTFIELD_PLACEHOLDER = i18n.t('Search');

export class SearchField extends Component {
    state = { searchField: '' };

    handleInputChange = event => {
        this.props.onSearchFieldChange(event.target.value);
    };

    render = () => {
        return (
            <div style={style.container}>
                <TextField
                    style={style.textField}
                    placeholder={INPUTFIELD_PLACEHOLDER}
                    InputProps={{
                        startAdornment: <Search style={style.searchIcon} />,
                        disableUnderline: true,
                    }}
                    inputProps={{ style: style.placeholder }}
                    onChange={this.handleInputChange}
                />
            </div>
        );
    };
}

export default SearchField;
