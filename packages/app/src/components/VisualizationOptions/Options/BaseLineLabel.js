import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';

import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const BaseLineLabel = ({ classes, enabled }) => (
    <TextBaseOption
        enabled={enabled}
        className={classes.textBaseOption}
        type="text"
        option={{
            name: 'baseLineLabel',
            label: i18n.t('Base line title'),
        }}
    />
);

BaseLineLabel.propTypes = {
    classes: PropTypes.object.isRequired,
    enabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(BaseLineLabel);
