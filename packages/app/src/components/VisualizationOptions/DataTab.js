import React from 'react';
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

export const DataTab = () => (
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

export default DataTab;
