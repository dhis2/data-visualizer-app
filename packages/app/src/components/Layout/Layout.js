import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import {
    LAYOUT_TYPE_DEFAULT,
    LAYOUT_TYPE_PIE,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
    getLayoutTypeByVisType,
} from '@dhis2/analytics'

import DefaultLayout from './DefaultLayout/DefaultLayout'
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout'
import PieLayout from './PieLayout/PieLayout'
import { sGetUiLayout, sGetUiType } from '../../reducers/ui'
import { acSetUiLayout } from '../../actions/ui'

const componentMap = {
    [LAYOUT_TYPE_DEFAULT]: DefaultLayout,
    [LAYOUT_TYPE_PIE]: PieLayout,
    [LAYOUT_TYPE_YEAR_OVER_YEAR]: YearOverYearLayout,
}

const Layout = props => {
    const layoutType = getLayoutTypeByVisType(props.visType)
    const LayoutComponent = componentMap[layoutType]

    const onDragEnd = result => {
        const { source, destination } = result

        if (!destination) {
            return
        }

        const sourceList = Array.from(props.layout[source.droppableId])
        const [moved] = sourceList.splice(source.index, 1)
        const reorderedDimensions = {}

        if (source.droppableId === destination.droppableId) {
            sourceList.splice(destination.index, 0, moved)
            reorderedDimensions[source.droppableId] = sourceList
        } else {
            const destList = Array.from(props.layout[destination.droppableId])
            destList.splice(destination.index, 0, moved)
            reorderedDimensions[destination.droppableId] = destList
            reorderedDimensions[source.droppableId] = sourceList
        }

        props.onReorderDimensions({ ...props.layout, ...reorderedDimensions })
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
    onReorderDimensions: PropTypes.func,
}

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
    visType: sGetUiType(state),
})

const mapDispatchToProps = dispatch => ({
    onReorderDimensions: layout => dispatch(acSetUiLayout(layout)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
