import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { styles } from '../styles/buttons.style';

export const RemoveDimensionButton = ({ showButton, isHighlighted, onClick }) =>
    showButton === 'selected' ? (
        <IconButton
            style={styles.deleteButton}
            disableRipple
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
        >
            <Close
                style={isHighlighted ? styles.highlightedClose : styles.close}
            />
        </IconButton>
    ) : null;

RemoveDimensionButton.propTypes = {
    showButton: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RemoveDimensionButton;
