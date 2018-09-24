import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';

import CumulativeValues from './Options/CumulativeValues';
import PercentStackedValues from './Options/PercentStackedValues';
import ShowData from './Options/ShowData';
import HideEmptyRowItems from './Options/HideEmptyRowItems';
import RegressionType from './Options/RegressionType';
import TargetLine from './Options/TargetLine';
import BaseLine from './Options/BaseLine';
import SortOrder from './Options/SortOrder';
import AggregationType from './Options/AggregationType';

const styles = {
    formControl: {
        minHeight: 55,
        minWidth: 300,
        marginRight: '60%',
    },
    inputLabeltextSize: {
        fontSize: 13,
    },
    textFields: {
        marginRight: 20,
        //width: 100,
    },
    textFieldCoverWholeRow: {
        // marginRight: '55%',
        width: 200,
    },
};

const DataTab = ({ classes }) => (
    <FormGroup>
        <ShowData />
        <PercentStackedValues />
        <CumulativeValues />
        <HideEmptyRowItems />
        <RegressionType />
        <TargetLine />
        <BaseLine />
        <SortOrder />
        <AggregationType />
    </FormGroup>
);

export default withStyles(styles)(DataTab);
