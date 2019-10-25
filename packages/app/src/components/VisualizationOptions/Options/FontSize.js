import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/VisualizationOptions.style';

import SelectBaseOption from './SelectBaseOption';

const FontSize = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseOption}
        option={{
            name: 'fontSize',
            label: i18n.t('Font size'),
            items: [
                { id: 'LARGE', label: i18n.t('Large') },
                { id: 'NORMAL', label: i18n.t('Normal') },
                { id: 'SMALL', label: i18n.t('Small') },
            ],
        }}
    />
);

FontSize.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FontSize);
