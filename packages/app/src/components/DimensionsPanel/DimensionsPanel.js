import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'

import DialogManager from './Dialogs/DialogManager'
import DndDimensionsPanel from './DndDimensionsPanel'
import * as fromReducers from '../../reducers'

import { styles } from './styles/DimensionsPanel.style'
import { AXIS_SETUP_DIALOG_ID } from '../AxisSetup/AxisSetup'
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui'

export class Dimensions extends Component {
    state = {
        dimensionMenuAnchorEl: null,
        dimensionId: null,
    }

    openOptionsMenuForDimension = (event, id) => {
        event.stopPropagation()

        this.setState({
            dimensionMenuAnchorEl: event.currentTarget,
            dimensionId: id,
        })
    }

    closeOptionsMenuForDimension = () =>
        this.setState({
            dimensionMenuAnchorEl: null,
            dimensionId: null,
        })

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length

    render() {
        return (
            <div style={styles.divContainer}>
                <DndDimensionsPanel
                    onDimensionOptionsClick={this.openOptionsMenuForDimension}
                />
                <DimensionMenu
                    dimensionId={this.state.dimensionId}
                    currentAxisId={this.props.getCurrentAxisId(
                        this.state.dimensionId
                    )}
                    visType={this.props.ui.type}
                    numberOfDimensionItems={this.getNumberOfDimensionItems()}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    isAssignedCategoriesInLayout={
                        this.props.layoutHasAssignedCategories
                    }
                    assignedCategoriesItemHandler={destination =>
                        this.props.assignedCategoriesItemHandler(
                            this.props.layoutHasAssignedCategories,
                            destination
                        )
                    }
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.dimensionMenuAnchorEl}
                    onClose={this.closeOptionsMenuForDimension}
                />
                <DialogManager />
            </div>
        )
    }
}

Dimensions.propTypes = {
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    dualAxisItemHandler: PropTypes.func,
    getCurrentAxisId: PropTypes.func,
    itemsByDimension: PropTypes.object,
    layoutHasAssignedCategories: PropTypes.bool,
    removeItemHandler: PropTypes.func,
    ui: PropTypes.object,
}

const mapStateToProps = state => ({
    ui: fromReducers.fromUi.sGetUi(state),
    dimensions: fromReducers.fromDimensions.sGetDimensions(state),
    layout: fromReducers.fromUi.sGetUiLayout(state),
    itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
    layoutHasAssignedCategories: fromReducers.fromUi.sLayoutHasAssignedCategories(
        state
    ),
    getCurrentAxisId: dimensionId =>
        fromReducers.fromUi.sGetAxisIdByDimensionId(state, dimensionId),
})

const mapDispatchToProps = dispatch => ({
    dualAxisItemHandler: () =>
        dispatch(acSetUiActiveModalDialog(AXIS_SETUP_DIALOG_ID)),
    axisItemHandler: ({
        dimensionId,
        axisId,
        numberOfDimensionItems,
        requireItems,
        isDimensionInLayout,
    }) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: { axisId } }))

        if (
            numberOfDimensionItems === 0 &&
            requireItems &&
            !isDimensionInLayout
        ) {
            dispatch(acSetUiActiveModalDialog(dimensionId))
        }
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: (layoutHasAssignedCategories, axisId) => {
        dispatch(
            layoutHasAssignedCategories
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: { axisId },
                  })
        )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions)
