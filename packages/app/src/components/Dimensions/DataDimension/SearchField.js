import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/SearchField.style';

export const SearchField = ({ text, onFilterTextChange }) => (
    <div style={styles.container}>
        <TextField
            style={styles.textField}
            placeholder={i18n.t('Search')}
            InputProps={{
                value: text,
                inputProps: { style: styles.placeholder },
                startAdornment: <Search style={styles.searchIcon} />,
                disableUnderline: true,
            }}
            onChange={event => onFilterTextChange(event.target.value)}
        />
    </div>
);

SearchField.propTypes = {
    text: PropTypes.string.isRequired,
    onFilterTextChange: PropTypes.func.isRequired,
};

export default SearchField;
