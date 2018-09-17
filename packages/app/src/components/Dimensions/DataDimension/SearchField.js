import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';

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
        paddingLeft: 5,
        paddingRight: 5,
    },
    searchIcon: {
        color: colors.charcoalGrey,
        position: 'relative',
        top: 5,
    },
};

const PLACEHOLDER_TITLE = 'Search';

export class SearchField extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <TextField
                    style={style.textField}
                    placeholder={i18n.t(PLACEHOLDER_TITLE)}
                    InputProps={{
                        startAdornment: <Search style={style.searchIcon} />,
                    }}
                />
            </div>
        );
    };
}

export default SearchField;
