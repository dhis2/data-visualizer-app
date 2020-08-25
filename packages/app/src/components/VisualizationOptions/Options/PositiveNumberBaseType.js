import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const PositiveNumberBaseType = ({
    label,
    placeholder,
    helpText,
    width,
    option,
    value,
    onChange,
    disabled,
}) => (
    <TextField
        type="number"
        label={option.label}
        onChange={event => {
            const value = event.target.value;
            const parsedValue = parseInt(value, 10);
            parsedValue >= 0
                ? onChange(Math.round(value))
                : onChange(parsedValue ? 0 : null);
        }}
        name={option.name}
        value={value || value === 0 ? value.toString() : ''}
        placeholder={placeholder}
        disabled={disabled}
        helperText={option.helperText}
    />
);

PositiveNumberBaseType.propTypes = {
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    label: PropTypes.string,
    option: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.string,
    onChange: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
    enabled: sGetUiOptions(state)[ownProps.option.name] !== undefined,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositiveNumberBaseType);
