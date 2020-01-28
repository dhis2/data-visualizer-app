import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import {
    LAYOUT_TYPE_DEFAULT,
    LAYOUT_TYPE_PIE,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
    LAYOUT_TYPE_PIVOT_TABLE,
    getLayoutTypeByVisType,
    canDimensionBeAddedToAxis,
} from '@dhis2/analytics'

import DefaultLayout from './DefaultLayout/DefaultLayout'
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout'
import PieLayout from './PieLayout/PieLayout'
import PivotTableLayout from './PivotTableLayout/PivotTableLayout'
import { sGetUiLayout, sGetUiType } from '../../reducers/ui'
import { acAddUiLayoutDimensions, acSetUiLayout } from '../../actions/ui'

const componentMap = {
    [LAYOUT_TYPE_DEFAULT]: DefaultLayout,
    [LAYOUT_TYPE_PIE]: PieLayout,
    [LAYOUT_TYPE_YEAR_OVER_YEAR]: YearOverYearLayout,
    [LAYOUT_TYPE_PIVOT_TABLE]: PivotTableLayout,
}

const Layout = props => {
    const { visType, layout } = props

    const layoutType = getLayoutTypeByVisType(visType)
    const LayoutComponent = componentMap[layoutType]

    const onDragEnd = result => {
        const { source, destination } = result

        if (!destination) {
            return
        }

        const sourceList = Array.from(layout[source.droppableId])
        const [moved] = sourceList.splice(source.index, 1)

        if (source.droppableId === destination.droppableId) {
            sourceList.splice(destination.index, 0, moved)

            props.onReorderDimensions({
                ...layout,
                [source.droppableId]: sourceList,
            })
        } else {
            const axisId = destination.droppableId

            if (canDimensionBeAddedToAxis(visType, layout[axisId], axisId)) {
                props.onAddDimensions({ [moved]: destination.droppableId })
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <LayoutComponent {...props} />
        </DragDropContext>
    )
}

Layout.propTypes = {
    layout: PropTypes.object,
    visType: PropTypes.string,
    onAddDimensions: PropTypes.func,
    onReorderDimensions: PropTypes.func,
}

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
    visType: sGetUiType(state),
})

const mapDispatchToProps = dispatch => ({
    onReorderDimensions: layout => dispatch(acSetUiLayout(layout)),
    onAddDimensions: map => dispatch(acAddUiLayoutDimensions(map)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
