import React from 'react';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';

const style = {
    buttonContainer: {
        width: 55,
        display: 'flex',
        flexFlow: 'column',
        paddingLeft: 5,
        paddingRight: 5,
    },
    actionButton: {
        height: 36,
        width: 36,
        position: 'absolute',
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24)',
    },
    assignButton: {
        top: '40%',
        left: '55%',
    },
    unAssignButton: {
        top: '50%',
        left: '55%',
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
};

const DESELECT_ALL = i18n.t('DESELECT ALL');
const SELECT_ALL = i18n.t('SELECT ALL');

export const AssignButton = ({ action }) => {
    return (
        <button
            style={{ ...style.actionButton, ...style.assignButton }}
            onClick={action}
        >
            <ArrowForward style={style.arrowIcon} />
        </button>
    );
};

export const UnAssignButton = ({ action }) => {
    return (
        <button
            style={{ ...style.actionButton, ...style.unAssignButton }}
            onClick={action}
        >
            <ArrowBack style={style.arrowIcon} />
        </button>
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
