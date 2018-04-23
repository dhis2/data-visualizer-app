import React from 'react';
import { colors } from '../colors';
import MenuBar from './MenuBar';
import ChartTypeSelector from './ChartTypeSelector';

const style = {
    display: 'flex',
    width: '100%',
    height: '40px',
    backgroundColor: colors.paleGrey,
    boxShadow: '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)',
};

const TopBar = props => {
    return (
        <div style={style}>
            <ChartTypeSelector />
            <MenuBar />
        </div>
    );
};

export default TopBar;
