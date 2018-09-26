import React from 'react';
import { ArrowForward, ArrowBack, Close } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';

const style = {
    actionButton: {
        height: 36,
        width: 36,
        position: 'absolute',
        borderRadius: 2,
        backgroundColor: colors.white,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24)',
    },
    arrowIcon: {
        height: 20,
        width: 24,
        position: 'relative',
        top: 2,
        right: 2,
    },
    deselectButton: {
        left: 76,
    },
    selectButton: {
        left: 165,
    },
    buttonText: {
        fontSize: 13,
        letterSpacing: 0.46,
    },
    updateButton: {
        marginLeft: 10,
        backgroundColor: colors.blue,
    },
    updateText: {
        color: colors.white,
        fontSize: 13,
        letterSpacing: 0.46,
    },
    hideText: {
        color: colors.blue,
        fontSize: 13,
        letterSpacing: 0.46,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        padding: 0,
        paddingTop: 6,
        paddingLeft: 1,
        width: 9,
    },
    deleteButtonIcon: {
        fill: colors.blue,
        height: 13,
        width: 10,
    },
    assignWrapper: {
        position: 'relative',
        bottom: '75%',
        left: '101.5%',
    },
    unAssignWrapper: {
        position: 'relative',
        right: '15%',
        bottom: '40%',
    },
};

const DESELECT_ALL = i18n.t('DESELECT ALL');
const SELECT_ALL = i18n.t('SELECT ALL');
const HIDE = i18n.t('HIDE');
const UPDATE = i18n.t('UPDATE');

export const HideButton = ({ action }) => {
    return (
        <Button onClick={action}>
            <span style={style.hideText}>{HIDE}</span>
        </Button>
    );
};

export const UpdateButton = ({ action }) => {
    return (
        <Button
            variant={'outlined'}
            style={style.updateButton}
            onClick={action}
        >
            <span style={style.updateText}>{UPDATE}</span>
        </Button>
    );
};

export const AssignButton = ({ action }) => {
    return (
        <div style={style.assignWrapper}>
            <button style={style.actionButton} onClick={action}>
                <ArrowForward style={style.arrowIcon} />
            </button>
        </div>
    );
};

export const UnAssignButton = ({ action }) => {
    return (
        <div style={style.unAssignWrapper}>
            <button style={style.actionButton} onClick={action}>
                <ArrowBack style={style.arrowIcon} />
            </button>
        </div>
    );
};

export const DeselectAllButton = ({ action }) => {
    return (
        <Button style={style.deselectButton} onClick={action}>
            <span style={style.buttonText}>{DESELECT_ALL}</span>
        </Button>
    );
};

export const SelectAllButton = ({ action }) => {
    return (
        <Button style={style.selectButton} onClick={action}>
            <span style={style.buttonText}>{SELECT_ALL}</span>
        </Button>
    );
};

export const RemoveSelectedItemButton = ({ action }) => {
    return (
        <button style={style.deleteButton} onClick={action} tabIndex={0}>
            <Close style={style.deleteButtonIcon} />
        </button>
    );
};
