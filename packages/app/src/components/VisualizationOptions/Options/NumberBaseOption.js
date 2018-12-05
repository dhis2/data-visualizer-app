import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const emptyString = '';

const incrementByOne = value => (parseInt(value, 10) + 1).toString();
const decrementByOne = value => (parseInt(value, 10) - 1).toString();

const handleArrowInput = (value, onChange, INCREMENT = true) => {
    if (INCREMENT) {
        value === emptyString
            ? onChange(incrementByOne(0))
            : onChange(incrementByOne(value));
    } else {
        value === emptyString
            ? onChange(decrementByOne(0))
            : onChange(decrementByOne(value));
    }
};

const onKeyWrapper = (event, value, onChange) => {
    if (event.key === 'ArrowUp') {
        event.preventDefault();

        handleArrowInput(value, onChange);
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        const DECREMENT = false;

        handleArrowInput(value, onChange, DECREMENT);
    }
};

export const NumberBaseOption = ({ className, option, value, onChange }) => (
    <TextField
        className={className}
        type="number"
        label={option.label}
        value={value}
        helperText={option.helperText}
        onKeyDown={event => onKeyWrapper(event, value, onChange)}
        onChange={event =>
            !isNaN(event.target.value) && onChange(event.target.value)
        }
    />
);

NumberBaseOption.propTypes = {
    className: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name] || emptyString,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberBaseOption);
