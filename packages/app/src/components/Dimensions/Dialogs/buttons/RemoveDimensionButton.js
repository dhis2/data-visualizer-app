import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { styles } from '../styles/buttons.style';

export const RemoveDimensionButton = ({ isHighlighted, onClick }) => (
    <IconButton
        style={styles.deleteButton}
        disableRipple
        onClick={e => {
            e.stopPropagation();
            onClick();
        }}
    >
        <Close style={isHighlighted ? styles.highlightedClose : styles.close} />
    </IconButton>
);

RemoveDimensionButton.propTypes = {
    isHighlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RemoveDimensionButton;
