import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import i18n from '@dhis2/d2-i18n';

import { styles } from './styles/DropDownButton.style';

const items = [
    {
        axisName: 'rows',
        name: i18n.t('Add to category'),
    },
    {
        axisName: 'filters',
        name: i18n.t('Add to filter'),
    },
];

export const DropDownButton = ({
    open,
    onDropDownClick,
    onItemClick,
    onClose,
    anchorEl,
}) => {
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
        <Fragment>
            <Button
                style={styles.arrowDown}
                onClick={onDropDownClick}
                variant="contained"
            >
                <ArrowDropDown style={styles.arrowIcon} />
            </Button>
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
        </Fragment>
    );
};

export default DropDownButton;
