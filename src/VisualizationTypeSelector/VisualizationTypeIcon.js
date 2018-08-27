import React from 'react';
import propTypes from 'prop-types';

import ColumnIcon from './DataTypeIcons/ColumnIcon';
import StackedColumnIcon from './DataTypeIcons/StackedColumnIcon';
import BarIcon from './DataTypeIcons/BarIcon';
import StackedBarIcon from './DataTypeIcons/StackedBarIcon';
import PieIcon from './DataTypeIcons/PieIcon';
import GaugeIcon from './DataTypeIcons/GaugeIcon';
import LineIcon from './DataTypeIcons/LineIcon';
import AreaIcon from './DataTypeIcons/AreaIcon';
import RadarIcon from './DataTypeIcons/RadarIcon';
import BubbleIcon from './DataTypeIcons/BubbleIcon';
import YearOnYearIcon from './DataTypeIcons/YearOnYearIcon';

const VisualizationTypeIcon = ({ type = 'column', style }) => {
    switch (type) {
        case 'stackedColumn':
            return <StackedColumnIcon style={style} />;
        case 'bar':
            return <BarIcon style={style} />;
        case 'stackedBar':
            return <StackedBarIcon style={style} />;
        case 'pie':
            return <PieIcon style={style} />;
        case 'gauge':
            return <GaugeIcon style={style} />;
        case 'line':
            return <LineIcon style={style} />;
        case 'area':
            return <AreaIcon style={style} />;
        case 'radar':
            return <RadarIcon style={style} />;
        case 'bubble':
            return <BubbleIcon style={style} />;
        case 'yearOnYear':
            return <YearOnYearIcon style={style} />;
        case 'column':
        default:
            return <ColumnIcon style={style} />;
    }
};

export default VisualizationTypeIcon;
