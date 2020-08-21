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
        onChange={event =>
            onChange(
                type === 'number'
                    ? parseInt(event.target.value, 10)
                    : event.target.value
            )
        }
        value={value}
        helperText={option.helperText}
    />
);

TextBaseOption.defaultProps = {
    enabled: true,
};

TextBaseOption.propTypes = {
    className: PropTypes.string,
    enabled: PropTypes.bool,
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
