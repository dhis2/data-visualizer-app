import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const BaseLineValue = ({ classes }) => (
    <TextBaseOption
        className={classes.baseLineValue}
        type="number"
        option={{
            name: 'baseLineValue',
            label: i18n.t('Base line value'),
        }}
    />
);

BaseLineValue.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseLineValue);
