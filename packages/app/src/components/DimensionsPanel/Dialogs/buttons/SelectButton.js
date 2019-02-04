import React from 'react';
import Button from '@material-ui/core/Button';
import { styles } from '../styles/buttons.style';

export const SelectButton = ({ style, onClick, label }) => (
    <Button style={style} onClick={onClick}>
        <span style={styles.buttonText}>{label}</span>
    </Button>
);
