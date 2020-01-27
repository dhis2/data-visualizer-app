import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { getAxisName, isDimensionLocked } from '@dhis2/analytics'
import { withStyles } from '@material-ui/core'

import Chip from '../Chip'
import {
    sGetUi,
    sGetUiLayout,
    sGetUiItems,
    sGetUiType,
} from '../../../reducers/ui'
import {
    acAddUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../../actions/ui'

import styles from './styles/DefaultAxis.style'
class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault()
    }

    render() {
        const { axisId, axis, style, type, getOpenHandler } = this.props

        return (
            <div
                id={axisId}
                style={{ ...styles.axisContainer, ...style }}
                onDragOver={this.onDragOver}
            >
                <div style={styles.label}>{getAxisName(axisId)}</div>
                <Droppable droppableId={axisId} direction="horizontal">
                    {provided => (
                        <div
                            className={this.props.classes.content}
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
    classes: PropTypes.object,
    getMoveHandler: PropTypes.func,
    getOpenHandler: PropTypes.func,
    getRemoveHandler: PropTypes.func,
    itemsByDimension: PropTypes.object,
    layout: PropTypes.object,
    style: PropTypes.object,
    type: PropTypes.string,
    ui: PropTypes.object,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(withStyles(styles)(Axis))
