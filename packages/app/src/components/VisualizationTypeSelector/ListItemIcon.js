import React from 'react'
import PropTypes from 'prop-types'
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
} from '@dhis2/analytics'

import ColumnIcon from '../../assets/ColumnIcon'
import StackedColumnIcon from '../../assets/StackedColumnIcon'
import BarIcon from '../../assets/BarIcon'
import StackedBarIcon from '../../assets/StackedBarIcon'
import PieIcon from '../../assets/PieIcon'
import GaugeIcon from '../../assets/GaugeIcon'
import LineIcon from '../../assets/LineIcon'
import AreaIcon from '../../assets/AreaIcon'
import StackedAreaIcon from '../../assets/StackedAreaIcon'
import RadarIcon from '../../assets/RadarIcon'
import YearOverYearLineIcon from '../../assets/YearOverYearLineIcon'
import YearOverYearColumnIcon from '../../assets/YearOverYearColumnIcon'
import SingleValueIcon from '../../assets/SingleValueIcon'
import GlobeIcon from '../../assets/GlobeIcon'
import PivotTableIcon from '../../assets/PivotTableIcon'

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
