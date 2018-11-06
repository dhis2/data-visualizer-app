import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DimensionItem } from './DimensionItem';

import { sGetDimensions } from '../../reducers/dimensions';
import { sGetDimensionIdsFromLayout } from '../../reducers/ui';

import { styles } from './styles/DimensionList.style';

export class DimensionList extends Component {
    filterTextContains = dimensionName => {
        const { filterText } = this.props;

        return dimensionName.toLowerCase().includes(filterText.toLowerCase());
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
                isSelected={!!this.props.selected.includes(dimension.id)}
            />
        );
    };

    render = () => {
        const { filterText, dimensions } = this.props;

        const dimensionsList = Object.values(dimensions).map(
            listItem =>
                filterText.length
                    ? this.filterMatchingDimensions(listItem)
                    : this.renderItem(listItem)
        );
        return <ul style={styles.listContainer}>{dimensionsList}</ul>;
    };
}

DimensionList.propTypes = {
    dimensions: PropTypes.object.isRequired,
    selected: PropTypes.array,
    filterText: PropTypes.string.isRequired,
};

DimensionList.defaultProps = {
    selected: [],
};

const mapStateToProps = state => ({
    dimensions: sGetDimensions(state),
    selected: sGetDimensionIdsFromLayout(state),
});

export default connect(mapStateToProps)(DimensionList);
