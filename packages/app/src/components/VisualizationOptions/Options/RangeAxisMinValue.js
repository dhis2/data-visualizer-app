import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';
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

RangeAxisMinValue.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RangeAxisMinValue);
