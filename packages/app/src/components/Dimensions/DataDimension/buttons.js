import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/buttons.style';

const DESELECT_ALL = i18n.t('DESELECT ALL');
const SELECT_ALL = i18n.t('SELECT ALL');
const HIDE = i18n.t('HIDE');
const UPDATE = i18n.t('UPDATE');

export const HideButton = ({ action }) => {
    return (
        <Button onClick={action}>
            <span style={styles.hideText}>{HIDE}</span>
        </Button>
    );
};

export const UpdateButton = ({ action }) => {
    return (
        <Button
            onClick={action}
            variant={'outlined'}
            style={styles.updateButton}
        >
            <span style={styles.updateText}>{UPDATE}</span>
        </Button>
    );
};

export const AssignButton = ({ action }) => {
    return (
        <div style={styles.assignWrapper}>
            <button style={styles.actionButton} onClick={action}>
                <ArrowForward style={styles.arrowIcon} />
            </button>
        </div>
    );
};

export const UnAssignButton = ({ action }) => {
    return (
        <div style={styles.unAssignWrapper}>
            <button style={styles.actionButton} onClick={action}>
                <ArrowBack style={styles.arrowIcon} />
            </button>
        </div>
    );
};

export const DeselectAllButton = ({ action }) => {
    return (
        <Button style={styles.deselectButton} onClick={action}>
            <span style={styles.buttonText}>{DESELECT_ALL}</span>
        </Button>
    );
};

export const SelectAllButton = ({ action }) => {
    return (
        <Button style={styles.selectButton} onClick={action}>
            <span style={styles.buttonText}>{SELECT_ALL}</span>
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
