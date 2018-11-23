import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import styles from '../styles/VisualizationOptions.style';

export const TextBaseOption = ({
    type,
    option,
    value,
    onChange,
    className,
    classes,
}) => (
    <TextField
        className={className}
        type={type}
        InputLabelProps={{ className: classes.inputLabel }}
        label={option.label}
        onChange={event => onChange(event.target.value)}
        value={value}
    />
);

TextBaseOption.propTypes = {
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
)(withStyles(styles)(TextBaseOption));
