import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/VisualizationOptions.style';

import SelectBaseOption from './SelectBaseOption';

const DisplayDensity = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseOption}
        option={{
            name: 'displayDensity',
            label: i18n.t('Display density'),
            items: [
                { id: 'COMFORTABLE', label: i18n.t('Comfortable') },
                { id: 'NORMAL', label: i18n.t('Normal') },
                { id: 'COMPACT', label: i18n.t('Compact') },
            ],
        }}
    />
);

DisplayDensity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayDensity);
