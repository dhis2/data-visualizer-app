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
    numberField: {
        minHeight: 55,
        marginRight: 20,
        width: 120,
    },
    rangeAxistextField: {
        minHeight: 55,
        width: '40%',
        marginRight: '60%',
    },
    domainAxisTextField: {
        width: '40%',
        marginRight: 80,
    },
    domainAxisSubtitleTextField: {
        minHeight: 55,
        width: '40%',
        marginRight: 80,
    },
    inputLabeltextSize: {
        fontSize: 13,
    },
    coverRestofRowSpace: {
        minHeight: 55,
        width: 120,
        marginRight: '65%',
    },
    hideChartLegendCheckbox: {
        minHeight: 55,
        marginRight: '80%',
    },
};

export const AxesAndLegendsTab = ({ classes }) => (
    <FormGroup>
        <FormGroup row={true}>
            <RangeAxisMinValue />
            <RangeAxisMaxValue />
        </FormGroup>
        <RangeAxisSteps />
        <RangeAxisDecimals />
        <RangeAxisLabel />
        <DomainAxisLabel />
        <HideLegend />
        <FormGroup row={true}>
            <Title />
            <HideTitle />
        </FormGroup>
        <FormGroup row={true}>
            <Subtitle />
            <HideSubtitle />
        </FormGroup>
    </FormGroup>
);

export default withStyles(styles)(AxesAndLegendsTab);
