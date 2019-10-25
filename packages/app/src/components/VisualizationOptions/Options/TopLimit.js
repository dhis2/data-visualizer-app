import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';
import styles from '../styles/VisualizationOptions.style';

const TopLimit = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseOption}
        option={{
            name: 'topLimit',
            label: i18n.t('Top limit'),
            items: [
                { id: 0, label: i18n.t('None') },
                { id: 5, label: '5' },
                { id: 10, label: '10' },
                { id: 20, label: '20' },
                { id: 50, label: '50' },
                { id: 100, label: '100' },
            ],
        }}
    />
);

TopLimit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopLimit);
