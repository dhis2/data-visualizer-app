// TODO: Deprecated, moved to Analytics. Remove file + /styles/DefaultAxis.style completely?

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { getAxisName } from '@dhis2/analytics'

import Chip from '../Chip'
import { sGetUi } from '../../../reducers/ui'
import { decodeDataTransfer } from '../../../modules/dnd'
import {
    acAddUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../../actions/ui'
import { SOURCE_DIMENSIONS } from '../../../modules/layout'
import { getAdaptedUiByType } from '../../../modules/ui'

import styles from './styles/DefaultAxis.style'
class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault()
    }

    onDrop = e => {
        e.preventDefault()

        const { dimensionId, source } = decodeDataTransfer(e)

        this.props.onAddDimension({
            [dimensionId]: this.props.axisId,
        })

        const items = this.props.itemsByDimension[dimensionId]
        const hasNoItems = Boolean(!items || !items.length)

        if (source === SOURCE_DIMENSIONS && hasNoItems) {
            this.props.onDropWithoutItems(dimensionId)
        }
    }

    render() {
        return (
            <div
                id={this.props.axisId}
                style={{ ...styles.axisContainer, ...this.props.style }}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                <div style={styles.label}>{getAxisName(this.props.axisId)}</div>
                <Droppable
                    droppableId={this.props.axisId}
                    direction="horizontal"
                >
                    {provided => (
                        <div
                            style={styles.content}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.axis.map((dimensionId, index) => {
                                const key = `${this.props.axisId}-${dimensionId}`

                                return (
                                    <Draggable
                                        key={key}
                                        draggableId={key}
                                        index={index}
                                    >
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Chip
                                                    onClick={this.props.getOpenHandler(
                                                        dimensionId
                                                    )}
                                                    axisId={this.props.axisId}
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
    style: PropTypes.object,
    type: PropTypes.string,
    ui: PropTypes.object,
    onAddDimension: PropTypes.func,
    onDropWithoutItems: PropTypes.func,
    onOpenAxisSetup: PropTypes.func,
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
})

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    onDropWithoutItems: dimensionId =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
    getOpenHandler: dimensionId => () =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const adaptedUi = getAdaptedUiByType(stateProps.ui)

    return {
        axis: adaptedUi.layout[ownProps.axisId],
        itemsByDimension: adaptedUi.itemsByDimension,
        type: adaptedUi.type,
        ...dispatchProps,
        ...ownProps,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
