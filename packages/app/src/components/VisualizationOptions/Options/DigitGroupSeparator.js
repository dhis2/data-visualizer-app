import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/VisualizationOptions.style';

import SelectBaseOption from './SelectBaseOption';

const DigitGroupSeparator = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseOption}
        option={{
            name: 'digitGroupSeparator',
            label: i18n.t('Digit group separator'),
            items: [
                { id: 'NONE', label: i18n.t('None') },
                { id: 'SPACE', label: i18n.t('Space') },
                { id: 'COMMA', label: i18n.t('Comma') },
            ],
        }}
    />
);

DigitGroupSeparator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DigitGroupSeparator);
