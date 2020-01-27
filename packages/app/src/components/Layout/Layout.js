import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    LAYOUT_TYPE_DEFAULT,
    LAYOUT_TYPE_PIE,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
    getLayoutTypeByVisType,
} from '@dhis2/analytics'

import DefaultLayout from './DefaultLayout/DefaultLayout'
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout'
import PieLayout from './PieLayout/PieLayout'
import { sGetUiType } from '../../reducers/ui'

const componentMap = {
    [LAYOUT_TYPE_DEFAULT]: DefaultLayout,
    [LAYOUT_TYPE_PIE]: PieLayout,
    [LAYOUT_TYPE_YEAR_OVER_YEAR]: YearOverYearLayout,
}

const Layout = ({ visType }) => {
    const layoutType = getLayoutTypeByVisType(visType)
    const LayoutComponent = componentMap[layoutType]

    return <LayoutComponent visType={visType} />
}

Layout.propTypes = {
    visType: PropTypes.string,
}

const mapStateToProps = state => ({
    visType: sGetUiType(state),
})

export default connect(mapStateToProps, null)(Layout)
