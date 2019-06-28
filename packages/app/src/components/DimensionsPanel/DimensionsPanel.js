import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIMENSION_ID_PERIOD, DimensionsPanel } from '@dhis2/analytics';

import DialogManager from './Dialogs/DialogManager';
import DimensionOptions from './DimensionOptions/DimensionOptions';
import { SOURCE_DIMENSIONS } from '../../modules/layout';
import { setDataTransfer } from '../../modules/dnd';
import { isYearOverYear } from '../../modules/chartTypes';
import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { styles } from './styles/DimensionsPanel.style';

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
            isYearOverYear(this.props.type)
        );
    };

    render() {
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
                    <DimensionOptions
                        id={this.state.dimensionId}
                        type={this.props.type}
                        isSelected={this.props.selectedIds.includes(
                            this.state.dimensionId
                        )}
                        anchorEl={this.state.dimensionOptionsAnchorEl}
                        onCloseMenu={this.onDimensionOptionsClose}
                    />
                )}
                <DialogManager />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        type: fromReducers.fromUi.sGetUiType(state),
        dimensions: fromReducers.fromDimensions.sGetDimensions(state),
        selectedIds: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
        recommendedIds: fromReducers.fromRecommendedIds.sGetRecommendedIds(
            state
        ),
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
