import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import SelectBaseOption from './SelectBaseOption';
import styles from '../styles/VisualizationOptions.style';

const RegressionType = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseRoot}
        option={{
            name: 'regressionType',
            label: i18n.t('Trend line'),
            items: [
                { id: 'NONE', label: i18n.t('None') },
                { id: 'LINEAR', label: i18n.t('Linear') },
                { id: 'POLYNOMIAL', label: i18n.t('Polynomial') },
                { id: 'LOESS', label: i18n.t('Loess') },
            ],
        }}
    />
);

export default withStyles(styles)(RegressionType);
