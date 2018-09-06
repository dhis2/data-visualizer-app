import React from 'react';
import PropTypes from 'prop-types';

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
import {
    COLUMN,
    STACKED_COLUMN,
    BAR,
    STACKED_BAR,
    LINE,
    AREA,
    PIE,
    RADAR,
    GAUGE,
    BUBBLE,
    YEAR_ON_YEAR,
    visualizationTypeMap,
} from './visualizationTypes';

const VisualizationTypeIcon = ({ type = COLUMN, style }) => {
    switch (type) {
        case STACKED_COLUMN:
            return <StackedColumnIcon style={style} />;
        case BAR:
            return <BarIcon style={style} />;
        case STACKED_BAR:
            return <StackedBarIcon style={style} />;
        case PIE:
            return <PieIcon style={style} />;
        case GAUGE:
            return <GaugeIcon style={style} />;
        case LINE:
            return <LineIcon style={style} />;
        case AREA:
            return <AreaIcon style={style} />;
        case RADAR:
            return <RadarIcon style={style} />;
        case BUBBLE:
            return <BubbleIcon style={style} />;
        case YEAR_ON_YEAR:
            return <YearOnYearIcon style={style} />;
        case COLUMN:
        default:
            return <ColumnIcon style={style} />;
    }
};

VisualizationTypeIcon.propTypes = {
    type: PropTypes.oneOf(Object.keys(visualizationTypeMap)),
    style: PropTypes.object,
};

export default VisualizationTypeIcon;
