import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { styles } from '../styles/buttons.style';

export const RemoveDimensionButton = ({ highlighted, onClick }) => (
    <IconButton
        style={styles.deleteButton}
        disableRipple
        onClick={e => {
            e.stopPropagation();
            onClick();
        }}
    >
        <Close style={highlighted ? styles.highlightedClose : styles.close} />
    </IconButton>
);

RemoveDimensionButton.propTypes = {
    highlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RemoveDimensionButton;
