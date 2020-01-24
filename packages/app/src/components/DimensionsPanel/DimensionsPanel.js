import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'

import DialogManager from './Dialogs/DialogManager'
import DndDimensionsPanel from './DndDimensionsPanel'
import { getInverseLayout } from '../../modules/layout'
import * as fromReducers from '../../reducers'

import { styles } from './styles/DimensionsPanel.style'
import { getAdaptedUiByType } from '../../modules/ui'
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

    onDimensionOptionsClick = (event, id) => {
        event.stopPropagation()

        // set anchor for options menu
        // open menu
        this.setState({
            dimensionMenuAnchorEl: event.currentTarget,
            dimensionId: id,
        })
    }

    onDimensionOptionsClose = () =>
        this.setState({
            dimensionMenuAnchorEl: null,
            dimensionId: null,
        })

    getUiAxisId = () => {
        const adaptedUi = getAdaptedUiByType(this.props.ui)
        const inverseLayout = getInverseLayout(adaptedUi.layout)
        return inverseLayout[this.state.dimensionId]
    }

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length

    render() {
        return (
            <div style={styles.divContainer}>
                <DndDimensionsPanel
                    onDimensionOptionsClick={this.onDimensionOptionsClick}
                />
                <DimensionMenu
                    dimensionId={this.state.dimensionId}
                    currentAxisId={this.getUiAxisId()}
                    visType={this.props.ui.type}
                    numberOfDimensionItems={this.getNumberOfDimensionItems()}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    isAssignedCategoriesInLayout={
                        this.props.adaptedLayoutHasAssignedCategories
                    }
                    assignedCategoriesItemHandler={destination =>
                        this.props.assignedCategoriesItemHandler(
                            this.props.adaptedLayoutHasAssignedCategories,
                            destination
                        )
                    }
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.dimensionMenuAnchorEl}
                    onClose={this.onDimensionOptionsClose}
                />
                <DialogManager />
            </div>
        )
    }
}

Dimensions.propTypes = {
    adaptedLayoutHasAssignedCategories: PropTypes.bool,
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    dualAxisItemHandler: PropTypes.func,
    itemsByDimension: PropTypes.object,
    removeItemHandler: PropTypes.func,
    ui: PropTypes.object,
}

const mapStateToProps = state => {
    return {
        ui: fromReducers.fromUi.sGetUi(state),
        itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
        adaptedLayoutHasAssignedCategories: fromReducers.fromUi.sAdaptedLayoutHasAssignedCategories(
            state
        ),
    }
}

const mapDispatchToProps = dispatch => ({
    dualAxisItemHandler: () =>
        dispatch(acSetUiActiveModalDialog(AXIS_SETUP_DIALOG_ID)),
    axisItemHandler: (dimensionId, targetAxisId, numberOfDimensionItems) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: targetAxisId }))

        if (numberOfDimensionItems > 0) {
            dispatch(acSetUiActiveModalDialog(dimensionId))
        }
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: (
        layoutHasAssignedCategories,
        destination
    ) => {
        dispatch(
            layoutHasAssignedCategories
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: destination,
                  })
        )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions)
