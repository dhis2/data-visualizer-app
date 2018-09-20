import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import RangeAxisMinValue from './RangeAxisMinValue';
import RangeAxisMaxValue from './RangeAxisMaxValue';
import RangeAxisSteps from './RangeAxisSteps';
import RangeAxisDecimals from './RangeAxisDecimals';
import RangeAxisLabel from './RangeAxisLabel';
import DomainAxisLabel from './DomainAxisLabel';
import HideLegend from './HideLegend';
import HideTitle from './HideTitle';
import Title from './Title';
import HideSubtitle from './HideSubtitle';
import Subtitle from './Subtitle';

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

const AxesAndLegendsTab = ({ classes }) => (
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
