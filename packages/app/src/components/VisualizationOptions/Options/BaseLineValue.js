import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';

import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const BaseLineValue = ({ enabled, classes }) => (
    <TextBaseOption
        enabled={enabled}
        className={classes.textBaseOption}
        type="number"
        option={{
            name: 'baseLineValue',
            label: i18n.t('Base line value'),
        }}
    />
);

BaseLineValue.propTypes = {
    classes: PropTypes.object.isRequired,
    enabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(BaseLineValue);
