import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';

import CumulativeValues from './Options/CumulativeValues';
import PercentStackedValues from './Options/PercentStackedValues';
import ShowData from './Options/ShowData';
import HideEmptyRowItems from './Options/HideEmptyRowItems';
import RegressionType from './Options/RegressionType';
import TargetLine from './Options/TargetLine';
import BaseLine from './Options/BaseLine';
import SortOrder from './Options/SortOrder';
import AggregationType from './Options/AggregationType';
import CompletedOnly from './Options/CompletedOnly';
import styles from './styles/VisualizationOptions.style';

export const DataTab = ({ classes }) => (
    <FormGroup className={classes.dataTabFormGroup}>
        <ShowData />
        <PercentStackedValues />
        <CumulativeValues />
        <CompletedOnly />
        <HideEmptyRowItems />
        <RegressionType />
        <TargetLine />
        <BaseLine />
        <SortOrder />
        <AggregationType />
    </FormGroup>
);

DataTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTab);
