import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';

import CumulativeValues from './CumulativeValues';
import PercentStackedValues from './PercentStackedValues';
import ShowData from './ShowData';
import HideEmptyRowItems from './HideEmptyRowItems';
import RegressionType from './RegressionType';
import TargetLine from './TargetLine';
import BaseLine from './BaseLine';
import SortOrder from './SortOrder';
import AggregationType from './AggregationType';

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
