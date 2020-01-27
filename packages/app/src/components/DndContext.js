import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import { canDimensionBeAddedToAxis } from '@dhis2/analytics'

import * as fromReducers from '../reducers'
import * as fromActions from '../actions'
import { getAdaptedUiByType } from '../modules/ui'
import { SOURCE_DIMENSIONS } from '../modules/layout'

class DndContext extends Component {
    onDragEnd = result => {
        const { source, destination, draggableId } = result

        if (!destination) {
            return
        }

        const layout = this.props.layout
        const axisId = destination.droppableId

        if (source.droppableId !== SOURCE_DIMENSIONS) {
            //reorganize the layout
            const sourceList = Array.from(layout[source.droppableId])
            const [moved] = sourceList.splice(source.index, 1)

            if (source.droppableId === destination.droppableId) {
                sourceList.splice(destination.index, 0, moved)

                this.props.onReorderDimensions({
                    ...layout,
                    [source.droppableId]: sourceList,
                })
            } else {
                if (
                    canDimensionBeAddedToAxis(
                        this.props.type,
                        layout[axisId],
                        axisId
                    )
                ) {
                    this.props.onAddDimensions({
                        [moved]: destination.droppableId,
                    })
                }
            }
        } else {
            //drag an item from the Dimensions panel to the layout

            const reorderedDimensions = {}

            if (
                canDimensionBeAddedToAxis(
                    this.props.type,
                    layout[axisId],
                    axisId
                )
            ) {
                const destList = Array.from(layout[destination.droppableId])
                destList.splice(destination.index, 0, draggableId)
                reorderedDimensions[destination.droppableId] = destList

                this.props.onReorderDimensions({
                    ...layout,
                    ...reorderedDimensions,
                })

                const items = this.props.itemsByDimension[draggableId]

                const hasNoItems = Boolean(!items || !items.length)

                if (source.droppableId === SOURCE_DIMENSIONS && hasNoItems) {
                    this.props.onDropWithoutItems(draggableId)
                }
            }
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.props.children}
            </DragDropContext>
        )
    }
}

DndContext.propTypes = {
    children: PropTypes.node,
    itemsByDimension: PropTypes.object,
    layout: PropTypes.object,
    type: PropTypes.string,
    onAddDimensions: PropTypes.func,
    onDropWithoutItems: PropTypes.func,
    onReorderDimensions: PropTypes.func,
}

const mapStateToProps = state => ({
    settings: fromReducers.fromSettings.sGetSettings(state),
    current: fromReducers.fromCurrent.sGetCurrent(state),
    interpretations: fromReducers.fromVisualization.sGetInterpretations(state),
    ui: fromReducers.fromUi.sGetUi(state),
    layout: fromReducers.fromUi.sGetUiLayout(state),
    type: fromReducers.fromUi.sGetUiType(state),
})

const mapDispatchToProps = dispatch => ({
    onAddDimensions: map =>
        dispatch(fromActions.fromUi.acAddUiLayoutDimensions(map)),
    onReorderDimensions: layout =>
        dispatch(fromActions.fromUi.acSetUiLayout(layout)),
    onDropWithoutItems: dimensionId =>
        dispatch(fromActions.fromUi.acSetUiActiveModalDialog(dimensionId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const adaptedUi = getAdaptedUiByType(stateProps.ui)

    return {
        itemsByDimension: adaptedUi.itemsByDimension,
        ...dispatchProps,
        ...stateProps,
        ...ownProps,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(DndContext)
