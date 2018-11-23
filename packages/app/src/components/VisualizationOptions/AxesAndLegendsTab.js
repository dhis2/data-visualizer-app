import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';

import RangeAxisMinValue from './Options/RangeAxisMinValue';
import RangeAxisMaxValue from './Options/RangeAxisMaxValue';
import RangeAxisSteps from './Options/RangeAxisSteps';
import RangeAxisDecimals from './Options/RangeAxisDecimals';
import RangeAxisLabel from './Options/RangeAxisLabel';
import DomainAxisLabel from './Options/DomainAxisLabel';
import HideLegend from './Options/HideLegend';
import HideTitle from './Options/HideTitle';
import Title from './Options/Title';
import HideSubtitle from './Options/HideSubtitle';
import Subtitle from './Options/Subtitle';
import styles from './styles/VisualizationOptions.style';

export const AxesAndLegendsTab = ({ classes }) => (
    <FormGroup className={classes.formGroupContainer}>
        <FormGroup className={classes.formGroupRoot} row={true}>
            <RangeAxisMinValue />
            <RangeAxisMaxValue />
        </FormGroup>
        <RangeAxisSteps />
        <RangeAxisDecimals />
        <RangeAxisLabel />
        <DomainAxisLabel />
        <HideLegend />
        <FormGroup className={classes.formGroupRoot} row={true}>
            <Title />
            <HideTitle />
        </FormGroup>
        <FormGroup row={true}>
            <Subtitle />
            <HideSubtitle />
        </FormGroup>
    </FormGroup>
);

AxesAndLegendsTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AxesAndLegendsTab);
