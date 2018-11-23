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
import styles from './styles/VisualizationOptions.style';

export const DataTab = ({ classes }) => (
    <FormGroup>
        <ShowData />
        <PercentStackedValues />
        <CumulativeValues />
        <HideEmptyRowItems className={classes.formControlRoot} />
        <RegressionType className={classes.formControlRoot} />
        <TargetLine />
        <BaseLine />
        <SortOrder className={classes.formControlRoot} />
        <AggregationType className={classes.formControlRoot} />
    </FormGroup>
);

export default withStyles(styles)(DataTab);
