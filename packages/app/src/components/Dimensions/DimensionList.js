import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DimensionItem } from './DimensionItem';
import * as fromReducers from '../../reducers';
import { styles } from './styles/DimensionList.style';

export class DimensionList extends Component {
    searchTextContains = dimensionName => {
        const { searchText } = this.props;

        return dimensionName.toLowerCase().includes(searchText.toLowerCase());
    };

    filterMatchingDimensions = dimension => {
        return this.searchTextContains(dimension.displayName)
            ? this.renderItem(dimension)
            : null;
    };

    renderItem = dimension => {
        return (
            <DimensionItem
                id={dimension.id}
                key={dimension.id}
                displayName={dimension.displayName}
                isSelected={!!this.props.selected.includes(dimension.id)}
                toggleDialog={this.props.toggleDialog}
            />
        );
    };

    render = () => {
        const { searchText, dimensions } = this.props;
        const dimensionsList = Object.values(dimensions).map(
            listItem =>
                searchText.length
                    ? this.filterMatchingDimensions(listItem)
                    : this.renderItem(listItem)
        );
        return <ul style={styles.listContainer}>{dimensionsList}</ul>;
    };
}

DimensionList.propTypes = {
    dimensions: PropTypes.object.isRequired,
    selected: PropTypes.array,
    searchText: PropTypes.string.isRequired,
    toggleDialog: PropTypes.func.isRequired,
};

DimensionList.defaultProps = {
    selected: [],
};

const mapStateToProps = state => ({
    dimensions: fromReducers.fromDimensions.sGetDimensions(state),
    selected: fromReducers.fromUi.sGetDimensionIdsFromLayout(state),
});

export default connect(mapStateToProps)(DimensionList);
