import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import styles from '../styles/VisualizationOptions.style';

export const TextBaseOption = ({
    classes,
    className,
    onChange,
    option,
    type,
    value,
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
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
