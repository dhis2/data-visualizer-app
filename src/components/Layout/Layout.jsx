import {
    LAYOUT_TYPE_DEFAULT,
    LAYOUT_TYPE_PIE,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
    LAYOUT_TYPE_PIVOT_TABLE,
    LAYOUT_TYPE_SCATTER,
    LAYOUT_TYPE_OUTLIER_TABLE,
    getLayoutTypeByVisType,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { sGetUiType } from '../../reducers/ui.js'
import DefaultLayout from './DefaultLayout/DefaultLayout.jsx'
import OutlierTableLayout from './OutlierTable/OutlierTableLayout.jsx'
import PieLayout from './PieLayout/PieLayout.jsx'
import PivotTableLayout from './PivotTableLayout/PivotTableLayout.jsx'
import ScatterLayout from './ScatterLayout/ScatterLayout.jsx'
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout.jsx'

const componentMap = {
    [LAYOUT_TYPE_DEFAULT]: DefaultLayout,
    [LAYOUT_TYPE_PIE]: PieLayout,
    [LAYOUT_TYPE_YEAR_OVER_YEAR]: YearOverYearLayout,
    [LAYOUT_TYPE_PIVOT_TABLE]: PivotTableLayout,
    [LAYOUT_TYPE_SCATTER]: ScatterLayout,
    [LAYOUT_TYPE_OUTLIER_TABLE]: OutlierTableLayout,
}

const Layout = ({ visType }) => {
    const layoutType = getLayoutTypeByVisType(visType)
    const LayoutComponent = componentMap[layoutType]

    return <LayoutComponent visType={visType} />
}

Layout.propTypes = {
    visType: PropTypes.string,
}

const mapStateToProps = (state) => ({
    visType: sGetUiType(state),
})

export default connect(mapStateToProps, null)(Layout)
