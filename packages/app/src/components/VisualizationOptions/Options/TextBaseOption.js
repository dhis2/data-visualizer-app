import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const emptyString = '';

export const TextBaseOption = ({ className, option, value, onChange }) => (
    <TextField
        className={className}
        type="text"
        label={option.label}
        value={value}
        helperText={option.helperText}
        onChange={event => onChange(event.target.value)}
    />
);

TextBaseOption.propTypes = {
    className: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.string,
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
