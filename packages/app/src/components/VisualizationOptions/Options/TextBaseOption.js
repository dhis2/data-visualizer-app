import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const TextBaseOption = ({
    className,
    enabled,
    type,
    option,
    value,
    onChange,
}) => (
    <TextField
        className={className}
        disabled={!enabled}
        type={type}
        label={option.label}
        onChange={event => onChange(event.target.value)}
        value={value}
        helperText={option.helperText}
    />
);

TextBaseOption.defaultProps = {
    enabled: true,
};

TextBaseOption.propTypes = {
    enabled: PropTypes.bool,
    type: PropTypes.string.isRequired,
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
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
