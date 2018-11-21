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

const styles = {
    formGroupContainer: {
        paddingTop: 15,
    },
    formGroupRoot: {
        paddingBottom: 15,
    },
    rangeAxisMin: {
        paddingRight: 15,
    },
    textBaseRoot: {
        paddingBottom: 15,
    },
    formControlLabelRoot: {
        marginLeft: 15,
        alignItems: 'flex-end',
    },
    checkBoxRoot: {
        padding: '0px 5px',
    },
};

export const AxesAndLegendsTab = ({ classes }) => (
    <FormGroup classes={{ root: classes.formGroupContainer }}>
        <FormGroup classes={{ row: classes.formGroupRoot }} row={true}>
            <RangeAxisMinValue classes={{ root: classes.rangeAxisMin }} />
            <RangeAxisMaxValue />
        </FormGroup>
        <RangeAxisSteps classes={{ root: classes.textBaseRoot }} />
        <RangeAxisDecimals classes={{ root: classes.textBaseRoot }} />
        <RangeAxisLabel classes={{ root: classes.textBaseRoot }} />
        <DomainAxisLabel classes={{ root: classes.textBaseRoot }} />
        <HideLegend />
        <FormGroup classes={{ row: classes.formGroupRoot }} row={true}>
            <Title />
            <HideTitle
                classes={{
                    checkBoxRoot: classes.checkBoxRoot,
                    formControlLabelRoot: classes.formControlLabelRoot,
                }}
            />
        </FormGroup>
        <FormGroup classes={{ row: classes.formGroupRoot }} row={true}>
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
