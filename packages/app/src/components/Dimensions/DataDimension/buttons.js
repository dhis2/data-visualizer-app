import React from 'react';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
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
        position: 'relative',
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24)',
    },
    assignButton: {
        top: '40%',
    },
    unAssignButton: {
        top: '45%',
    },

    arrowIcon: {
        height: 20,
        width: 24,
        position: 'relative',
        top: 2,
        right: 2,
    },
};

export const ActionButtons = (onAssignClick, onUnassignClick) => {
    return (
        <div style={style.buttonContainer}>
            <AssignButton action={() => onAssignClick} />
            <UnassignButton action={() => onUnassignClick} />
        </div>
    );
};

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

export const UnassignButton = ({ action }) => {
    return (
        <button
            style={{ ...style.actionButton, ...style.unAssignButton }}
            onClick={action}
        >
            <ArrowBack style={style.arrowIcon} />
        </button>
    );
};

const DESELECT_ALL = 'DESELECT ALL';

export const DeselectAllButton = () => {
    return <button>{i18n.t(DESELECT_ALL)}</button>;
};
