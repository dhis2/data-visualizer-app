import {
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_OUTLIER_TABLE,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'
import AreaIcon from '../../assets/AreaIcon.jsx'
import BarIcon from '../../assets/BarIcon.jsx'
import ColumnIcon from '../../assets/ColumnIcon.jsx'
import GaugeIcon from '../../assets/GaugeIcon.jsx'
import GlobeIcon from '../../assets/GlobeIcon.jsx'
import LineIcon from '../../assets/LineIcon.jsx'
import OutlierTableIcon from '../../assets/OutlierTableIcon.jsx'
import PieIcon from '../../assets/PieIcon.jsx'
import PivotTableIcon from '../../assets/PivotTableIcon.jsx'
import RadarIcon from '../../assets/RadarIcon.jsx'
import ScatterIcon from '../../assets/ScatterIcon.jsx'
import SingleValueIcon from '../../assets/SingleValueIcon.jsx'
import StackedAreaIcon from '../../assets/StackedAreaIcon.jsx'
import StackedBarIcon from '../../assets/StackedBarIcon.jsx'
import StackedColumnIcon from '../../assets/StackedColumnIcon.jsx'
import YearOverYearColumnIcon from '../../assets/YearOverYearColumnIcon.jsx'
import YearOverYearLineIcon from '../../assets/YearOverYearLineIcon.jsx'

const ListItemIcon = ({ iconType, style }) => {
    switch (iconType) {
        case VIS_TYPE_STACKED_COLUMN:
            return <StackedColumnIcon style={style} />
        case VIS_TYPE_BAR:
            return <BarIcon style={style} />
        case VIS_TYPE_STACKED_BAR:
            return <StackedBarIcon style={style} />
        case VIS_TYPE_PIE:
            return <PieIcon style={style} />
        case VIS_TYPE_GAUGE:
            return <GaugeIcon style={style} />
        case VIS_TYPE_LINE:
            return <LineIcon style={style} />
        case VIS_TYPE_AREA:
            return <AreaIcon style={style} />
        case VIS_TYPE_STACKED_AREA:
            return <StackedAreaIcon style={style} />
        case VIS_TYPE_RADAR:
            return <RadarIcon style={style} />
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            return <YearOverYearLineIcon style={style} />
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
            return <YearOverYearColumnIcon style={style} />
        case VIS_TYPE_SINGLE_VALUE:
            return <SingleValueIcon style={style} />
        case 'MAP':
            return <GlobeIcon style={style} />
        case VIS_TYPE_PIVOT_TABLE:
            return <PivotTableIcon style={style} />
        case VIS_TYPE_SCATTER:
            return <ScatterIcon style={style} />
        case VIS_TYPE_OUTLIER_TABLE:
            return <OutlierTableIcon style={style} />
        case VIS_TYPE_COLUMN:
        default:
            return <ColumnIcon style={style} />
    }
}

ListItemIcon.propTypes = {
    iconType: PropTypes.string,
    style: PropTypes.object,
}

export default ListItemIcon
