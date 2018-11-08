import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DimensionItem } from './DimensionItem';

import { sGetDimensions } from '../../reducers/dimensions';
import { sGetDimensionIdsFromLayout } from '../../reducers/ui';

import { styles } from './styles/DimensionList.style';

export class DimensionList extends Component {
    filterTextContains = dimensionName => {
        return dimensionName
            .toLowerCase()
            .includes(this.props.filterText.toLowerCase());
    };

    filterMatchingDimensions = dimension => {
        return this.filterTextContains(dimension.name)
            ? this.renderItem(dimension)
            : null;
    };

    renderItem = dimension => {
        return (
            <DimensionItem
                id={dimension.id}
                key={dimension.id}
                name={dimension.name}
                isSelected={!!this.props.selectedIds.includes(dimension.id)}
            />
        );
    };

    render = () => {
        const dimensionsList = Object.values(this.props.dimensions).map(
            listItem =>
                this.props.filterText.length
                    ? this.filterMatchingDimensions(listItem)
                    : this.renderItem(listItem)
        );

        return <ul style={styles.listContainer}>{dimensionsList}</ul>;
    };
}

DimensionList.propTypes = {
    dimensions: PropTypes.object.isRequired,
    selectedIds: PropTypes.array,
    filterText: PropTypes.string.isRequired,
};

DimensionList.defaultProps = {
    selectedIds: [],
};

const mapStateToProps = state => ({
    dimensions: sGetDimensions(state),
    selectedIds: sGetDimensionIdsFromLayout(state),
});

export default connect(mapStateToProps)(DimensionList);
