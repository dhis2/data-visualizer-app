import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const emptyString = '';

const incrementByOne = value => (value += 1).toString();
const decrementByOne = value => (value -= 1).toString();

const onKeyWrapper = (event, props) => {
    if (props.type === 'number') {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            return !props.value.length
                ? props.onChange(incrementByOne(0))
                : props.onChange(incrementByOne(parseInt(props.value, 10)));
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            return !props.value.length
                ? props.onChange(decrementByOne(0))
                : props.onChange(decrementByOne(parseInt(props.value, 10)));
        }
    }
};

export const TextBaseOption = props => (
    <TextField
        className={props.className}
        type={props.type}
        label={props.option.label}
        onKeyDown={event => onKeyWrapper(event, props)}
        onChange={event => props.onChange(event.target.value)}
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
