import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import styles from '../styles/VisualizationOptions.style';

import RadioBaseOption from './RadioBaseOption';

const LegendDisplayStyle = ({ classes }) => (
    <RadioBaseOption
        //        className={classes.selectBaseOption}
        option={{
            name: 'legendDisplayStyle',
            items: [
                {
                    id: 'FILL',
                    label: i18n.t('Legend changes background color'),
                },
                { id: 'TEXT', label: i18n.t('Legend changes text color') },
            ],
        }}
    />
);

LegendDisplayStyle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LegendDisplayStyle);
