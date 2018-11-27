import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import i18n from '@dhis2/d2-i18n';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import TargetLineValue from './TargetLineValue';
import TargetLineLabel from './TargetLineLabel';
import styles from '../styles/VisualizationOptions.style';

export const TargetLine = ({ classes, enabled, onChange }) => (
    <FormGroup row={true} className={classes.formGroupRoot}>
        <FormControlLabel
            className={classes.targetLineRoot}
            control={
                <Switch
                    className={classes.switchBase}
                    checked={enabled}
                    onChange={event => onChange(event.target.checked)}
                />
            }
            label={i18n.t('Target line')}
        />
        {enabled ? (
            <Fragment>
                <TargetLineValue />
                <TargetLineLabel />
            </Fragment>
        ) : null}
    </FormGroup>
);

TargetLine.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    enabled: sGetUiOptions(state).targetLine,
});

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ targetLine: enabled })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TargetLine));
