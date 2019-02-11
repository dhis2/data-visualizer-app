import React from 'react';
import PropTypes from 'prop-types';

import ColumnIcon from '../../assets/ColumnIcon';
import StackedColumnIcon from '../../assets/StackedColumnIcon';
import BarIcon from '../../assets/BarIcon';
import StackedBarIcon from '../../assets/StackedBarIcon';
import PieIcon from '../../assets/PieIcon';
import GaugeIcon from '../../assets/GaugeIcon';
import LineIcon from '../../assets/LineIcon';
import AreaIcon from '../../assets/AreaIcon';
import RadarIcon from '../../assets/RadarIcon';
import YearOverYearLineIcon from '../../assets/YearOverYearLineIcon';
import YearOverYearColumnIcon from '../../assets/YearOverYearColumnIcon';
import GlobeIcon from '../../assets/GlobeIcon';

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
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    OPEN_AS_GEO_MAP,
    chartTypeDisplayNames,
} from '../../modules/chartTypes';

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
        case YEAR_OVER_YEAR_LINE:
            return <YearOverYearLineIcon style={style} />;
        case YEAR_OVER_YEAR_COLUMN:
            return <YearOverYearColumnIcon style={style} />;
        case OPEN_AS_GEO_MAP:
            return <GlobeIcon style={style} />;
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
