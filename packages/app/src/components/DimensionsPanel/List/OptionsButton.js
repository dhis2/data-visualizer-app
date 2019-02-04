import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizontalIcon from '../../../assets/MoreHorizontalIcon';

export const OptionsButton = ({ style, onClick }) => (
    <IconButton style={style} onClick={onClick}>
        <MoreHorizontalIcon />
    </IconButton>
);

export default OptionsButton;
