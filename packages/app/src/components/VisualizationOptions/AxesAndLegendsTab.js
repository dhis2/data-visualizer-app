import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
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
            <RangeAxisMinValue className={classes.rangeAxisMin} />
            <RangeAxisMaxValue />
        </FormGroup>
        <RangeAxisSteps className={classes.textBaseRoot} />
        <RangeAxisDecimals className={classes.textBaseRoot} />
        <RangeAxisLabel className={classes.textBaseRoot} />
        <DomainAxisLabel className={classes.textBaseRoot} />
        <HideLegend />
        <FormGroup className={classes.formGroupRoot} row={true}>
            <Title />
            <HideTitle
                classes={{
                    checkBoxRoot: classes.checkBoxRoot,
                    formControlLabelRoot: classes.formControlLabelRoot,
                }}
            />
        </FormGroup>
        <FormGroup className={classes.formGroupRoot} row={true}>
            <Subtitle />
            <HideSubtitle
                classes={{
                    checkBoxRoot: classes.checkBoxRoot,
                    formControlLabelRoot: classes.formControlLabelRoot,
                }}
            />
        </FormGroup>
    </FormGroup>
);

export default withStyles(styles)(AxesAndLegendsTab);
