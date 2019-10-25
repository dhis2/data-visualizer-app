import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import CheckboxBaseOption from './CheckboxBaseOption';
import styles from '../styles/VisualizationOptions.style';

const ColSubTotals = ({ classes }) => (
    <CheckboxBaseOption
        className={classes.dataTabCheckbox}
        option={{
            name: 'colSubTotals',
            label: i18n.t('Column sub-totals'),
        }}
    />
);

ColSubTotals.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColSubTotals);
