import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const emptyString = '';

const incrementByOne = value => (parseInt(value, 10) + 1).toString();
const decrementByOne = value => (parseInt(value, 10) - 1).toString();

const onKeyWrapper = (event, props) => {
    if (props.type === 'number') {
        if (event.key === 'ArrowUp') {
            event.preventDefault();

            !props.value.length
                ? props.onChange(incrementByOne(0))
                : props.onChange(incrementByOne(props.value));
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();

            !props.value.length
                ? props.onChange(decrementByOne(0))
                : props.onChange(decrementByOne(props.value));
        }
    }
};

const onChangeWrapper = (event, props) => {
    if (props.type === 'number') {
        !isNaN(event.target.value) && props.onChange(event.target.value);
    } else {
        props.onChange(event.target.value);
    }
};

export const TextBaseOption = props => (
    <TextField
        className={props.className}
        type={props.type}
        label={props.option.label}
        onKeyDown={event => onKeyWrapper(event, props)}
        onChange={event => onChangeWrapper(event, props)}
        value={props.value}
        helperText={props.option.helperText}
    />
);

TextBaseOption.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
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
)(TextBaseOption);
