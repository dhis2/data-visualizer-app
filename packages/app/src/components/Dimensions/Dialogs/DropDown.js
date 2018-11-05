import React from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import i18n from '@dhis2/d2-i18n';

import { styles } from './styles/buttons.style';

const items = [
    {
        axisName: 'filters',
        name: i18n.t('Add to filter'),
    },
    {
        axisName: 'rows',
        name: i18n.t('Add to category'),
    },
];

export const DropDown = ({ open, onClose, anchorEl, onItemClick }) => {
    const listItems = items.map(option => (
        <Button
            style={styles.addToButton}
            key={option.axisName}
            onClick={() => onItemClick(option.axisName)}
            variant="contained"
        >
            <span style={styles.addToText}>{option.name}</span>
        </Button>
    ));

    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                style: styles.popover,
            }}
        >
            {listItems}
        </Popover>
    );
};

export default DropDown;
