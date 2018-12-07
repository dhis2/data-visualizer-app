import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import TargetLineValue from './TargetLineValue';
import TargetLineLabel from './TargetLineLabel';
import styles from '../styles/VisualizationOptions.style';

export const TargetLine = ({ classes, enabled, onChange }) => (
    <FormGroup className={classes.formGroupContainer} row={true}>
        <FormControlLabel
            className={classes.targetLineRoot}
            control={
                <Switch
                    checked={enabled}
                    onChange={event => onChange(event.target.checked)}
                />
            }
            label={i18n.t('Target line')}
        />
        <Fragment>
            <TargetLineValue enabled={enabled} />
            <TargetLineLabel enabled={enabled} />
        </Fragment>
    </FormGroup>
);

TargetLine.propTypes = {
    classes: PropTypes.object.isRequired,
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
