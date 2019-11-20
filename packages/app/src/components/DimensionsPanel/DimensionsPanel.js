import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    DimensionsPanel,
    DimensionMenu,
    getDisallowedDims,
    getLockedDims,
} from '@dhis2/analytics';

import DialogManager from './Dialogs/DialogManager';
import { SOURCE_DIMENSIONS, getInverseLayout } from '../../modules/layout';
import { setDataTransfer } from '../../modules/dnd';
import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { styles } from './styles/DimensionsPanel.style';
import { getAdaptedUiByType } from '../../modules/ui';
import { AXIS_SETUP_DIALOG_ID } from '../AxisSetup/AxisSetup';
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui';
import { sGetUiType } from '../../reducers/ui';
import { createSelector } from 'reselect';

export class Dimensions extends Component {
    state = {
        dimensionMenuAnchorEl: null,
        dimensionId: null,
    };

    onDimensionOptionsClick = (event, id) => {
        event.stopPropagation();

        // set anchor for options menu
        // open menu
        this.setState({
            dimensionMenuAnchorEl: event.currentTarget,
            dimensionId: id,
        });
    };

    onDimensionOptionsClose = () =>
        this.setState({
            dimensionMenuAnchorEl: null,
            dimensionId: null,
        });

    onDimensionDragStart = e => {
        setDataTransfer(e, SOURCE_DIMENSIONS);
    };

    disabledDimension = dimension =>
        this.props.disallowedDimensions.includes(dimension.id);

    lockedDimension = dimension =>
        this.props.lockedDimensions.includes(dimension.id);

    getUiAxisName = () => {
        const adaptedUi = getAdaptedUiByType(this.props.ui);
        const inverseLayout = getInverseLayout(adaptedUi.layout);

        return inverseLayout[this.state.dimensionId];
    };

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length;

    render() {
        return (
            <div style={styles.divContainer}>
                <DimensionsPanel
                    dimensions={this.props.dimensions}
                    selectedIds={this.props.selectedIds}
                    disabledDimension={this.disabledDimension}
                    lockedDimension={this.lockedDimension}
                    recommendedDimension={dimension =>
                        this.props.recommendedIds.includes(dimension.id)
                    }
                    onDimensionOptionsClick={this.onDimensionOptionsClick}
                    onDimensionDragStart={this.onDimensionDragStart}
                    onDimensionClick={this.props.onDimensionClick}
                />
                {/* {this.state.dimensionMenuAnchorEl && ( */}
                <DimensionMenu
                    dimensionId={this.state.dimensionId}
                    currentAxisName={this.getUiAxisName()}
                    visType={this.props.ui.type}
                    numberOfDimensionItems={this.getNumberOfDimensionItems()}
                    dualAxisItemHandler={this.props.dualAxisItemHandler}
                    axisItemHandler={this.props.axisItemHandler}
                    removeItemHandler={this.props.removeItemHandler}
                    anchorEl={this.state.dimensionMenuAnchorEl}
                    onClose={this.onDimensionOptionsClose}
                />
                {/* )} */}
                <DialogManager />
            </div>
        );
    }
}

const getDisallowedDimensions = createSelector(
    [sGetUiType],
    type => getDisallowedDims(type)
);

const getLockedDimensions = createSelector(
    [sGetUiType],
    type => getLockedDims(type)
);

const mapStateToProps = state => {
    return {
        ui: fromReducers.fromUi.sGetUi(state),
        dimensions: fromReducers.fromDimensions.sGetDimensions(state),
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
        recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(
            state
        ),
        layout: fromReducers.fromUi.sGetUiLayout(state),
        itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
        disallowedDimensions: getDisallowedDimensions(state),
        lockedDimensions: getLockedDimensions(state),
    };
};

const mapDispatchToProps = dispatch => ({
    onDimensionClick: id =>
        dispatch(fromActions.fromUi.acSetUiActiveModalDialog(id)),
    dualAxisItemHandler: () =>
        dispatch(acSetUiActiveModalDialog(AXIS_SETUP_DIALOG_ID)),
    axisItemHandler: (dimensionId, targetAxisName, numberOfDimensionItems) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: targetAxisName }));

        if (numberOfDimensionItems > 0) {
            dispatch(acSetUiActiveModalDialog(dimensionId));
        }
    },
    removeItemHandler: dimensionId => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dimensions);
