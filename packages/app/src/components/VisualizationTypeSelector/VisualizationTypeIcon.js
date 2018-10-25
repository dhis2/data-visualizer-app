import React from 'react';
import PropTypes from 'prop-types';

import ColumnIcon from './icons/ColumnIcon';
import StackedColumnIcon from './icons/StackedColumnIcon';
import BarIcon from './icons/BarIcon';
import StackedBarIcon from './icons/StackedBarIcon';
import PieIcon from './icons/PieIcon';
import GaugeIcon from './icons/GaugeIcon';
import LineIcon from './icons/LineIcon';
import AreaIcon from './icons/AreaIcon';
import RadarIcon from './icons/RadarIcon';
import YearOnYearIcon from './icons/YearOnYearIcon';
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
    YEAR_ON_YEAR,
    chartTypeDisplayNames,
} from '../../chartTypes';

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
        case YEAR_ON_YEAR:
            return <YearOnYearIcon style={style} />;
        case COLUMN:
        default:
            return <ColumnIcon style={style} />;
    }
};

VisualizationTypeIcon.propTypes = {
    type: PropTypes.oneOf(Object.keys(chartTypeDisplayNames)),
    style: PropTypes.object,
};

export default VisualizationTypeIcon;
