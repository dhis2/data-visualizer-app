import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { styles } from '../styles/buttons.style';

export const ArrowButton = ({ className, onClick, iconType }) => (
    <div className={className}>
        <IconButton
            variant="contained"
            style={styles.arrowButton}
            onClick={onClick}
        >
            {iconType === 'arrowForward' ? (
                <ArrowForward style={styles.arrowIcon} />
            ) : (
                <ArrowBack style={styles.arrowIcon} />
            )}
        </IconButton>
    </div>
);

export default ArrowButton;
