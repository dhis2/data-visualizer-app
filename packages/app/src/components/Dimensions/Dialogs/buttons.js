import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/buttons.style';
import { colors } from '../../../modules/colors';

export const AssignButton = ({ className, action }) => {
    return (
        <div className={`${className}-arrow-forward-button`}>
            <IconButton
                variant="contained"
                style={styles.assignButton}
                onClick={action}
            >
                <ArrowForward style={styles.arrowIcon} />
            </IconButton>
        </div>
    );
};

export const UnAssignButton = ({ className, action }) => {
    return (
        <div className={`${className}-arrow-back-button`}>
            <IconButton
                variant="contained"
                style={styles.assignButton}
                onClick={action}
            >
                <ArrowBack style={styles.arrowIcon} />
            </IconButton>
        </div>
    );
};

export const ArrowButton = ({ style, className, onClick, iconType }) => (
    <div className={className}>
        <IconButton variant="contained" style={style} onClick={onClick}>
            {iconType === 'arrowForward' ? (
                <ArrowBack style={styles.arrowIcon} />
            ) : (
                <ArrowForward style={styles.arrowIcon} />
            )}
        </IconButton>
    </div>
);

export const selectButton = ({ style, onClick, label }) => (
    <Button style={style} onClick={onClick}>
        <span style={styles.buttonText}>{label}</span>
    </Button>
);

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

export const RemoveSelectedItemButton = ({
    showButton,
    isHighlighted,
    onClick,
}) => {
    return showButton === 'selected' ? (
        <IconButton style={styles.deleteButton} onClick={onClick} disableRipple>
            <Close
                style={
                    isHighlighted
                        ? {
                              ...styles.deleteButtonIcon,
                              fill: colors.white,
                          }
                        : styles.deleteButtonIcon
                }
            />
        </IconButton>
    ) : null;
};
