import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const emptyString = '';

export const TextBaseOption = props => (
    <TextField
        className={props.className}
        type={props.type}
        label={props.option.label}
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
