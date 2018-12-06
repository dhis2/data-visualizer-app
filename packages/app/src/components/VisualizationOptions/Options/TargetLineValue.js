import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';

import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const TargetLineValue = ({ classes, enabled }) => (
    <TextBaseOption
        className={classes.textBaseOption}
        enabled={enabled}
        type="number"
        option={{
            name: 'targetLineValue',
            label: i18n.t('Target line value'),
        }}
    />
);

TargetLineValue.propTypes = {
    classes: PropTypes.object.isRequired,
    enabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TargetLineValue);
