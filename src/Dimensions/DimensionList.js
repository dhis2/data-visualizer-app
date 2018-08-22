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
    state = {};

    searchTextContains = dimensionName => {
        const { searchText } = this.props;

        return dimensionName.toLowerCase().includes(searchText.toLowerCase());
    };

    filterMatchingDimensions = (dimension, tabIndex) => {
        let Item = null;

        if (this.searchTextContains(dimension.displayName)) {
            Item = this.renderItem(dimension, tabIndex);
        }

        return Item;
    };

    renderItem = (dimension, tabIndex) => {
        return (
            <DimensionItem
                id={dimension.id}
                key={dimension.id}
                tabIndex={tabIndex}
                displayName={dimension.displayName}
                isSelected={dimension.selected}
                toggleDialog={this.props.toggleDialog}
            />
        );
    };

    render = () => {
        const { searchText, dimensions } = this.props,
            dimensionsList = Object.entries(dimensions).map(
                (listItem, tabIndex) =>
                    searchText.length
                        ? this.filterMatchingDimensions(
                              listItem[OBJECT_POS],
                              tabIndex
                          )
                        : this.renderItem(listItem[OBJECT_POS], tabIndex)
            );
        return <ul style={style.listContainer}>{dimensionsList}</ul>;
    };
}

DimensionList.propTypes = {
    searchText: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    toggleDialog: PropTypes.func.isRequired,
};

export default DimensionList;
