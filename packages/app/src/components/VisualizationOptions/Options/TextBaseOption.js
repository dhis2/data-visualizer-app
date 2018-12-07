import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const TextBaseOption = ({
    className,
    type,
    option,
    value,
    onChange,
}) => (
    <TextField
        className={className}
        type={type}
        label={option.label}
        onChange={event => onChange(event.target.value)}
        value={value}
        helperText={option.helperText}
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
    value: sGetUiOptions(state)[ownProps.option.name] || '',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextBaseOption);
