import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const RangeAxisLabel = ({ classes }) => (
    <TextBaseOption
        className={classes.textBaseRoot}
        type="text"
        option={{
            name: 'rangeAxisLabel',
            label: i18n.t('Range axis title'),
        }}
    />
);

RangeAxisLabel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RangeAxisLabel);
