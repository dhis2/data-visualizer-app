import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import {
    getAxisName,
    isDimensionLocked,
    canDimensionBeAddedToAxis,
} from '@dhis2/analytics'

import Chip from '../Chip'
import {
    sGetUi,
    sGetUiLayout,
    sGetUiItems,
    sGetUiType,
} from '../../../reducers/ui'
import { decodeDataTransfer } from '../../../modules/dnd'
import {
    acAddUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../../actions/ui'
import { SOURCE_DIMENSIONS } from '../../../modules/layout'

import styles from './styles/DefaultAxis.style'
class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault()
    }

    onDrop = e => {
        e.preventDefault()

        const {
            type,
            layout,
            axisId,
            itemsByDimension,
            onAddDimension,
            onDropWithoutItems,
        } = this.props
        const { dimensionId, source } = decodeDataTransfer(e)

        if (canDimensionBeAddedToAxis(type, layout, axisId)) {
            onAddDimension({
                [dimensionId]: axisId,
            })

            const items = itemsByDimension[dimensionId]
            const hasNoItems = Boolean(!items || !items.length)

            if (source === SOURCE_DIMENSIONS && hasNoItems) {
                onDropWithoutItems(dimensionId)
            }
        }
    }

    render() {
        const { axisId, axis, style, type, getOpenHandler } = this.props

        return (
            <div
                id={axisId}
                style={{ ...styles.axisContainer, ...style }}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                <div style={styles.label}>{getAxisName(axisId)}</div>
                <Droppable droppableId={axisId} direction="horizontal">
                    {provided => (
                        <div
                            style={styles.content}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {axis.map((dimensionId, index) => {
                                const key = `${axisId}-${dimensionId}`

                                return (
                                    <Draggable
                                        key={key}
                                        draggableId={key}
                                        index={index}
                                        isDragDisabled={isDimensionLocked(
                                            type,
                                            dimensionId
                                        )}
                                    >
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Chip
                                                    onClick={getOpenHandler(
                                                        dimensionId
                                                    )}
                                                    axisId={axisId}
                                                    dimensionId={dimensionId}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

Axis.propTypes = {
    axis: PropTypes.array,
    axisId: PropTypes.string,
    getMoveHandler: PropTypes.func,
    getOpenHandler: PropTypes.func,
    getRemoveHandler: PropTypes.func,
    itemsByDimension: PropTypes.object,
    layout: PropTypes.object,
    style: PropTypes.object,
    type: PropTypes.string,
    ui: PropTypes.object,
    onAddDimension: PropTypes.func,
    onDropWithoutItems: PropTypes.func,
    onOpenAxisSetup: PropTypes.func,
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    type: sGetUiType(state),
    layout: sGetUiLayout(state),
    itemsByDimension: sGetUiItems(state),
})

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    onDropWithoutItems: dimensionId =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
    getOpenHandler: dimensionId => () =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        axis: stateProps.ui.layout[ownProps.axisId],
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
