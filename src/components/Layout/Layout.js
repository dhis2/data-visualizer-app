import {
    LAYOUT_TYPE_DEFAULT,
    LAYOUT_TYPE_PIE,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
    LAYOUT_TYPE_PIVOT_TABLE,
    getLayoutTypeByVisType,
    LAYOUT_TYPE_SCATTER,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { sGetUiType } from '../../reducers/ui.js'
import DefaultLayout from './DefaultLayout/DefaultLayout.js'
import PieLayout from './PieLayout/PieLayout.js'
import PivotTableLayout from './PivotTableLayout/PivotTableLayout.js'
import ScatterLayout from './ScatterLayout/ScatterLayout.js'
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout.js'

const componentMap = {
    [LAYOUT_TYPE_DEFAULT]: DefaultLayout,
    [LAYOUT_TYPE_PIE]: PieLayout,
    [LAYOUT_TYPE_YEAR_OVER_YEAR]: YearOverYearLayout,
    [LAYOUT_TYPE_PIVOT_TABLE]: PivotTableLayout,
    [LAYOUT_TYPE_SCATTER]: ScatterLayout,
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
