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
    rearrangeLayoutDimensions = ({
        sourceAxisId,
        sourceIndex,
        destinationAxisId: axisId,
        destinationIndex: index,
    }) => {
        const layout = this.props.layout

        const sourceList = Array.from(layout[sourceAxisId])
        const [moved] = sourceList.splice(sourceIndex, 1)

        if (sourceAxisId === axisId) {
            sourceList.splice(index, 0, moved)

            this.props.onReorderDimensions({
                ...layout,
                [sourceAxisId]: sourceList,
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
                    [moved]: { axisId, index },
                })
            }
        }
    }

    addDimensionToLayout = ({ axisId, index, dimensionId }) => {
        const { layout, type } = this.props

        if (!canDimensionBeAddedToAxis(type, layout[axisId], axisId)) {
            return
        }

        this.props.onAddDimensions({ [dimensionId]: { axisId, index } })

        const items = this.props.itemsByDimension[dimensionId]
        const hasNoItems = Boolean(!items || !items.length)

        if (hasNoItems) {
            this.props.onDropWithoutItems(dimensionId)
        }
    }

    onDragEnd = result => {
        const { source, destination, draggableId } = result

        if (!destination) {
            return
        }

        if (source.droppableId === SOURCE_DIMENSIONS) {
            this.addDimensionToLayout({
                axisId: destination.droppableId,
                index: destination.index,
                dimensionId: draggableId,
            })
        } else {
            this.rearrangeLayoutDimensions({
                sourceAxisId: source.droppableId,
                sourceIndex: source.index,
                destinationAxisId: destination.droppableId,
                destinationIndex: destination.index,
            })
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
    layout: fromReducers.fromUi.sGetUiLayout(state),
    type: fromReducers.fromUi.sGetUiType(state),
    ui: fromReducers.fromUi.sGetUi(state),
})

const mapDispatchToProps = dispatch => ({
    onAddDimensions: map =>
        dispatch(fromActions.fromUi.acAddUiLayoutDimensions(map)),
    onDropWithoutItems: dimensionId =>
        dispatch(fromActions.fromUi.acSetUiActiveModalDialog(dimensionId)),
    onReorderDimensions: layout =>
        dispatch(fromActions.fromUi.acSetUiLayout(layout)),
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
