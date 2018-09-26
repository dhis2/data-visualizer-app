import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';

const style = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        backgroundColor: colors.white,
        height: 39,
        borderBottom: 0,
    },
    textField: {
        paddingRight: 5,
        width: '98%',
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

export const SearchField = ({ onSearchFieldChange }) => {
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
                onChange={event => onSearchFieldChange(event.target.value)}
            />
        </div>
    );
};

export default SearchField;
