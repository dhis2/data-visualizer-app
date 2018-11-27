import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';
import styles from '../styles/VisualizationOptions.style';

const TargetLineValue = ({ classes }) => (
    <TextBaseOption
        className={classes.targetLineValue}
        type="number"
        option={{
            name: 'targetLineValue',
            label: i18n.t('Target line value'),
        }}
    />
);

TargetLineValue.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TargetLineValue);
