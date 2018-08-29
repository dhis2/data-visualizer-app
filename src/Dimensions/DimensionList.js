import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DimensionItem from './DimensionItem';

const style = {
    listContainer: {
        overflow: 'hidden',
        overflowY: 'scroll',
        maxHeight: 697,
        minWidth: 250,
        width: 250,
        padding: 0,
        marginTop: 0,
    },
};

const OBJECT_POS = 1;

export class DimensionList extends Component {
    static propTypes = {
        searchText: PropTypes.string.isRequired,
        dimensions: PropTypes.object.isRequired,
        toggleDialog: PropTypes.func.isRequired,
    };

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
                isSelected={dimension.selected}
                toggleDialog={this.props.toggleDialog}
            />
        );
    };

    render = () => {
        const { searchText, dimensions } = this.props;
        const dimensionsList = Object.entries(dimensions).map(
            listItem =>
                searchText.length
                    ? this.filterMatchingDimensions(listItem[OBJECT_POS])
                    : this.renderItem(listItem[OBJECT_POS])
        );
        return <ul style={style.listContainer}>{dimensionsList}</ul>;
    };
}

export default DimensionList;
