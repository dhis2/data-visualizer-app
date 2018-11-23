import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const RangeAxisDecimals = ({ classes }) => (
    <TextBaseOption
        className={classes.textBaseRoot}
        type="number"
        option={{
            name: 'rangeAxisDecimals',
            label: i18n.t('Range axis decimals'),
        }}
    />
);

RangeAxisDecimals.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RangeAxisDecimals);
