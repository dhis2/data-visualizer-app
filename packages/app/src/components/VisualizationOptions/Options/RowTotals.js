import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import CheckboxBaseOption from './CheckboxBaseOption';
import styles from '../styles/VisualizationOptions.style';

const RowTotals = ({ classes }) => (
    <CheckboxBaseOption
        className={classes.dataTabCheckbox}
        option={{
            name: 'rowTotals',
            label: i18n.t('Row totals'),
        }}
    />
);

RowTotals.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowTotals);
