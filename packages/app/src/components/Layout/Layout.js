import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_PIVOT_TABLE,
} from '@dhis2/analytics'

import DefaultLayout from './DefaultLayout/DefaultLayout'
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout'
import PieLayout from './PieLayout/PieLayout'
import { sGetUiLayout, sGetUiType } from '../../reducers/ui'
import { acSetUiLayout } from '../../actions/ui'

const layoutMap = {
    [VIS_TYPE_COLUMN]: DefaultLayout,
    [VIS_TYPE_STACKED_COLUMN]: DefaultLayout,
    [VIS_TYPE_BAR]: DefaultLayout,
    [VIS_TYPE_STACKED_BAR]: DefaultLayout,
    [VIS_TYPE_LINE]: DefaultLayout,
    [VIS_TYPE_AREA]: DefaultLayout,
    [VIS_TYPE_PIE]: PieLayout,
    [VIS_TYPE_RADAR]: DefaultLayout,
    [VIS_TYPE_GAUGE]: PieLayout,
    [VIS_TYPE_YEAR_OVER_YEAR_LINE]: YearOverYearLayout,
    [VIS_TYPE_YEAR_OVER_YEAR_COLUMN]: YearOverYearLayout,
    [VIS_TYPE_SINGLE_VALUE]: PieLayout,
    [VIS_TYPE_PIVOT_TABLE]: DefaultLayout,
}

const getLayoutByType = (type, props) => {
    const Layout = layoutMap[type]
    return <Layout {...props} />
}

const Layout = props => {
    // const onDragEnd = result => {
    //     const { source, destination } = result

    //     console.log('onDragEnd', result)

    //     if (!destination) {
    //         return
    //     }

    //     const sourceList = Array.from(props.layout[source.droppableId])
    //     const [moved] = sourceList.splice(source.index, 1)
    //     const reorderedDimensions = {}

    //     if (source.droppableId === destination.droppableId) {
    //         sourceList.splice(destination.index, 0, moved)
    //         reorderedDimensions[source.droppableId] = sourceList
    //     } else {
    //         const destList = Array.from(props.layout[destination.droppableId])
    //         destList.splice(destination.index, 0, moved)
    //         reorderedDimensions[destination.droppableId] = destList
    //         reorderedDimensions[source.droppableId] = sourceList
    //     }

    //     props.onReorderDimensions({ ...props.layout, ...reorderedDimensions })
    // }

    return <>{getLayoutByType(props.type)}</>
}

Layout.propTypes = {
    // layout: PropTypes.object,
    type: PropTypes.string,
    // onReorderDimensions: PropTypes.func,
}

const mapStateToProps = state => ({
    // layout: sGetUiLayout(state),
    type: sGetUiType(state),
})

const mapDispatchToProps = dispatch => ({
    // onReorderDimensions: layout => dispatch(acSetUiLayout(layout)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
