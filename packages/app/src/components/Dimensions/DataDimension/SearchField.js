import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 39,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        backgroundColor: '#FFFFFF',
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

const PLACEHOLDER_LABEL = 'Search';

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
                    placeholder={i18n.t(PLACEHOLDER_LABEL)}
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
