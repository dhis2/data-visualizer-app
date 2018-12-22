import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import RangeAxisMinValue from './Options/RangeAxisMinValue';
import RangeAxisMaxValue from './Options/RangeAxisMaxValue';
import RangeAxisSteps from './Options/RangeAxisSteps';
import RangeAxisDecimals from './Options/RangeAxisDecimals';
import RangeAxisLabel from './Options/RangeAxisLabel';
import DomainAxisLabel from './Options/DomainAxisLabel';
import styles from './styles/VisualizationOptions.style';

export const AxisAndLegendTab = ({ classes }) => (
    <FormGroup className={classes.axisTabFormGroup}>
        <FormGroup row={true}>
            <RangeAxisMinValue />
            <RangeAxisMaxValue />
        </FormGroup>
        <RangeAxisSteps />
        <RangeAxisDecimals />
        <RangeAxisLabel />
        <DomainAxisLabel />
    </FormGroup>
);

AxisAndLegendTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AxisAndLegendTab);
