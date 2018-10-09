import React from 'react';
import PropTypes from 'prop-types';
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

export const SearchField = ({ onFilterTextChange }) => {
    return (
        <div style={style.container}>
            <TextField
                style={style.textField}
                placeholder={i18n.t('Search')}
                InputProps={{
                    inputProps: { style: style.placeholder },
                    startAdornment: <Search style={style.searchIcon} />,
                    disableUnderline: true,
                }}
                onChange={event => onFilterTextChange(event.target.value)}
            />
        </div>
    );
};

SearchField.propTypes = {
    onFilterTextChange: PropTypes.func.isRequired,
};

export default SearchField;
