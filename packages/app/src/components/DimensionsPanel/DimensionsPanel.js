import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    DIMENSION_ID_PERIOD,
    DimensionsPanel,
    DimensionMenu,
} from '@dhis2/analytics';

import DialogManager from './Dialogs/DialogManager';
import DimensionOptions from './DimensionOptions/DimensionOptions';
import { SOURCE_DIMENSIONS, getInverseLayout } from '../../modules/layout';
import { setDataTransfer } from '../../modules/dnd';
import { isYearOverYear } from '../../modules/chartTypes';
import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { styles } from './styles/DimensionsPanel.style';
import { getAdaptedUiByType } from '../../modules/ui';

export class Dimensions extends Component {
    state = {
        dimensionOptionsAnchorEl: null,
        dimensionId: null,
    };

    onDimensionOptionsClick = (event, id) => {
        event.stopPropagation();

        // set anchor for options menu
        // open menu
        this.setState({
            dimensionOptionsAnchorEl: event.currentTarget,
            dimensionId: id,
        });
    };

    onDimensionOptionsClose = () =>
        this.setState({
            dimensionOptionsAnchorEl: null,
            dimensionId: null,
        });

    onDimensionDragStart = e => {
        setDataTransfer(e, SOURCE_DIMENSIONS);
    };

    disabledDimension = dimension => {
        return (
            dimension.id === DIMENSION_ID_PERIOD &&
            isYearOverYear(this.props.ui.type)
        );
    };

    getUiAxisName = () => {
        const adaptedUi = getAdaptedUiByType(this.props.ui);
        console.log('adaptedUi', adaptedUi);

        const inverseLayout = getInverseLayout(adaptedUi.layout);
        console.log('inverseLayout', inverseLayout);

        return inverseLayout[this.state.dimensionId];
    };

    getNumberOfDimensionItems = () =>
        (this.props.itemsByDimension[this.state.dimensionId] || []).length;

    render() {
        console.log('NUMBER OF ITEMS', this.getNumberOfDimensionItems());
        return (
            <div style={styles.divContainer}>
                <DimensionsPanel
                    dimensions={this.props.dimensions}
                    selectedIds={this.props.selectedIds}
                    disabledDimension={this.disabledDimension}
                    recommendedDimension={dimension =>
                        this.props.recommendedIds.includes(dimension.id)
                    }
                    onDimensionOptionsClick={this.onDimensionOptionsClick}
                    onDimensionDragStart={this.onDimensionDragStart}
                    onDimensionClick={this.props.onDimensionClick}
                />
                {this.state.dimensionOptionsAnchorEl && (
                    <DimensionMenu
                        dimensionId={this.state.dimensionId}
                        currentAxisName={this.getUiAxisName()}
                        visType={this.props.type}
                        numberOfDimensionItems={this.getNumberOfDimensionItems()}
                        dualAxisItemHandler={Function.prototype}
                        axisItemHandler={Function.prototype}
                        removeItemHandler={Function.prototype}
                        // isSelected={this.props.selectedIds.includes(
                        //     this.state.dimensionId
                        // )}

                        anchorEl={this.state.dimensionOptionsAnchorEl}
                        onClose={this.onDimensionOptionsClose}
                    />
                )}
                <DialogManager />
            </div>
        );
    }
}
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
    };
};

const mapDispatchToProps = dispatch => ({
    onDimensionClick: id =>
        dispatch(fromActions.fromUi.acSetUiActiveModalDialog(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dimensions);
