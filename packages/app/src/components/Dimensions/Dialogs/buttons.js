import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
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

export const DeselectAllButton = ({ action }) => {
    return (
        <Button style={styles.deselectButton} onClick={action}>
            <span style={styles.buttonText}>{i18n.t('DESELECT ALL')}</span>
        </Button>
    );
};

export const SelectAllButton = ({ action }) => {
    return (
        <Button style={styles.selectButton} onClick={action}>
            <span style={styles.buttonText}>{i18n.t('SELECT ALL')}</span>
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

export const DropDownButton = ({ onClick }) => (
    <Button onClick={onClick} variant="contained" style={styles.arrowDown}>
        <ArrowDropDown />
    </Button>
);

export const AddToSeries = ({ onClick }) => (
    <Button
        style={styles.addToButton}
        variant="contained"
        onClick={() => onClick('columns')}
    >
        <span style={styles.addToText}>{i18n.t('Add to series')}</span>
    </Button>
);
