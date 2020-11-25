import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import {
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
    isDimensionLocked,
} from '@dhis2/analytics'

import Chip from '../Chip'
import { sGetUi, sGetUiLayout, sGetUiType } from '../../../reducers/ui'
import { acSetUiActiveModalDialog } from '../../../actions/ui'
import styles from './styles/DefaultAxis.style'
import stylesModule from './styles/DefaultAxis.module.css'

class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault()
    }

    render() {
        const { axisId, axis, style, type, getOpenHandler } = this.props

        return (
            <div
                id={axisId}
                data-test={`${axisId}-axis`}
                style={{ ...styles.axisContainer, ...style }}
                onDragOver={this.onDragOver}
            >
                <div style={styles.label}>
                    {this.props.label ||
                        getAxisNameByLayoutType(
                            axisId,
                            getLayoutTypeByVisType(type)
                        )}
                </div>
                <Droppable droppableId={axisId} direction="horizontal">
                    {provided => (
                        <div
                            className={stylesModule.content}
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
                                                    isLocked={isDimensionLocked(
                                                        type,
                                                        dimensionId
                                                    )}
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
    label: PropTypes.string,
    layout: PropTypes.object,
    style: PropTypes.object,
    type: PropTypes.string,
    ui: PropTypes.object,
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    type: sGetUiType(state),
    layout: sGetUiLayout(state),
})

const mapDispatchToProps = dispatch => ({
    getOpenHandler: dimensionId => () =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    axis: stateProps.ui.layout[ownProps.axisId],
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
