import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';
import styles from '../styles/VisualizationOptions.style';

const RangeAxisMinValue = ({ classes }) => (
    <TextBaseOption
        className={classes.rangeAxisMin}
        type="number"
        option={{
            name: 'rangeAxisMinValue',
            label: i18n.t('Range axis min'),
        }}
    />
);

export default withStyles(styles)(RangeAxisMinValue);
