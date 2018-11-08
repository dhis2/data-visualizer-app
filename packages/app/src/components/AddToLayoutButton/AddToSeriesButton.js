import React from 'react';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { styles } from './styles/AddToSeriesButton.style';

export const AddToSeriesButton = ({ onClick }) => {
    return (
        <Button
            style={styles.addToButton}
            onClick={() => onClick('columns')}
            variant="contained"
        >
            <span style={styles.text}>{i18n.t('Add to series')}</span>
        </Button>
    );
};
