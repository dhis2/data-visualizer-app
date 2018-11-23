import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';
import styles from '../styles/VisualizationOptions.style';

const HideTitle = ({ classes }) => (
    <CheckboxBaseOption
        classes={{
            checkBoxRoot: classes.checkBoxRoot,
            formControlLabelRoot: classes.formControlLabelRoot,
        }}
        option={{
            name: 'hideTitle',
            label: i18n.t('Hide title'),
        }}
    />
);

HideTitle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HideTitle);
