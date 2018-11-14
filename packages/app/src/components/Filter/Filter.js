import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import { styles } from './styles/Filter.style';

const onChangeWrapper = (props, event) => {
    event.target.value.length
        ? props.onChange(event.target.value)
        : props.onClear();
};

const onKeyUpWrapper = (onClear, event) => {
    if (event.key === 'Escape') {
        event.stopPropagation();
        onClear();
    }
};

export const Filter = props => (
    <TextField
        autoFocus={props.autoFocus}
        style={props.style}
        placeholder={props.placeholder}
        value={props.text}
        onChange={e => onChangeWrapper(props, e)}
        onKeyUp={e => onKeyUpWrapper(props.onClear, e)}
        InputProps={{
            disableUnderline: props.disableUnderline,
            style: styles.placeholder,
            startAdornment: (
                <InputAdornment>
                    <Search style={styles.searchIcon} />
                </InputAdornment>
            ),
            endAdornment: props.text.length ? (
                <InputAdornment>
                    <IconButton
                        style={styles.iconButton}
                        onClick={props.onClear}
                        disableRipple
                    >
                        <Close style={styles.closeIcon} />
                    </IconButton>
                </InputAdornment>
            ) : null,
        }}
    />
);

Filter.defaultProps = {
    style: {},
    autoFocus: false,
    disableUnderline: false,
};

Filter.propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    disableUnderline: PropTypes.bool,
};

export default Filter;
