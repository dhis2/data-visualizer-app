import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const RangeAxisSteps = ({ classes }) => (
    <TextBaseOption
        className={classes.textBaseRoot}
        type="number"
        option={{
            name: 'rangeAxisSteps',
            label: i18n.t('Range axis tick steps'),
        }}
    />
);

RangeAxisSteps.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RangeAxisSteps);
