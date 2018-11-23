import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const defaultStyle = {
    formControlLabelRoot: {},
    checkBoxRoot: {},
};

export const CheckboxBaseOption = ({ classes, onChange, option, value }) => (
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
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    value: PropTypes.bool.isRequired,
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
