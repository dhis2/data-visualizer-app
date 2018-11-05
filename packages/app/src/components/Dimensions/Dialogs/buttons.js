import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/buttons.style';

export const AssignButton = ({ className, action }) => {
    return (
        <div className={`${className}-arrow-forward-button`}>
            <Button
                variant="contained"
                style={styles.assignButton}
                onClick={action}
            >
                <ArrowForward style={styles.arrowIcon} />
            </Button>
        </div>
    );
};

export const UnAssignButton = ({ className, action }) => {
    return (
        <div className={`${className}-arrow-back-button`}>
            <Button
                variant="contained"
                style={styles.assignButton}
                onClick={action}
            >
                <ArrowBack style={styles.arrowIcon} />
            </Button>
        </div>
    );
};

export const SelectAllButton = ({ action }) => {
    return (
        <Button style={styles.selectButton} onClick={action}>
            <span style={styles.buttonText}>{i18n.t('SELECT ALL')}</span>
        </Button>
    );
};

export const DeselectAllButton = ({ action }) => {
    return (
        <Button style={styles.deselectButton} onClick={action}>
            <span style={styles.buttonText}>{i18n.t('DESELECT ALL')}</span>
        </Button>
    );
};

export const RemoveSelectedItemButton = ({ showButton, action }) => {
    return showButton === 'selected' ? (
        <button style={styles.deleteButton} onClick={action} tabIndex={0}>
            <Close style={styles.deleteButtonIcon} />
        </button>
    ) : null;
};
