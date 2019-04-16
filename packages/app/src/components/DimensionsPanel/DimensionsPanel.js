import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DimensionsPanel } from '@dhis2/d2-ui-analytics';

import DialogManager from './Dialogs/DialogManager';
import { sGetDimensions } from '../../reducers/dimensions';
import { sGetDimensionIdsFromLayout } from '../../reducers/ui';
import { sGetRecommendedIds } from '../../reducers/recommendedIds';
import { acSetUiActiveModalDialog } from '../../actions/ui';

import { styles } from './styles/DimensionsPanel.style';

export class Dimensions extends Component {
    state = { filterText: '' };

    onClearFilter = () => {
        this.setState({ filterText: '' });
    };

    onFilterTextChange = filterText => {
        this.setState({ filterText });
    };

    onSelectDimension = id => {
        this.props.openDialog(id);
    };

    onDimensionOptionsClick = args => {
        console.log('args', args);
    };

    render() {
        const isRecommendedFn = recommendedIds => id =>
            recommendedIds.includes(id);

        return (
            <div style={styles.divContainer}>
                <DialogManager />
                <DimensionsPanel
                    dimensions={this.props.dimensions}
                    selectedIds={this.props.selectedIds}
                    recommendedDimension={isRecommendedFn(
                        this.props.recommendedIds
                    )}
                    onDimensionClick={this.onSelectDimension}
                    onDimensionOptionsClick={this.onDimensionOptionsClick}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dimensions: sGetDimensions(state),
    selectedIds: sGetDimensionIdsFromLayout(state),
    recommendedIds: sGetRecommendedIds(state),
});

export default connect(
    mapStateToProps,
    {
        openDialog: acSetUiActiveModalDialog,
    }
)(Dimensions);
