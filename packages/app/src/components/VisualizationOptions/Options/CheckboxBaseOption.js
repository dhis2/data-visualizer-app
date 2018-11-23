import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const defaultStyle = {
    formControlLabelRoot: {},
    checkBoxRoot: {},
};

export const CheckboxBaseOption = ({ option, value, onChange, classes }) => (
    <FormControlLabel
        control={
            <Checkbox
                className={classes.checkBoxRoot}
                checked={value}
                color={'primary'}
                onChange={event => onChange(event.target.checked)}
            />
        }
        className={classes.formControlLabelRoot}
        label={option.label}
    />
);

CheckboxBaseOption.propTypes = {
    classes: PropTypes.object,
    option: PropTypes.object,
    value: PropTypes.bool,
    onChange: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: checked =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: checked })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(defaultStyle)(CheckboxBaseOption));
