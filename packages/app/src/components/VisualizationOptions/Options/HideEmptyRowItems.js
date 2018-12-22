import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import SelectBaseOption from './SelectBaseOption';
import styles from '../styles/VisualizationOptions.style';

const HideEmptyRowItems = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseOption}
        option={{
            name: 'hideEmptyRowItems',
            label: i18n.t('Hide empty categories'),
            items: [
                { id: 'NONE', label: i18n.t('None') },
                { id: 'BEFORE_FIRST', label: i18n.t('Before first') },
                { id: 'AFTER_FIRST', label: i18n.t('After first') },
                {
                    id: 'BEFORE_FIRST_AFTER_LAST',
                    label: i18n.t('Before first and after last'),
                },
                { id: 'ALL', label: i18n.t('All') },
            ],
        }}
    />
);

HideEmptyRowItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HideEmptyRowItems);
