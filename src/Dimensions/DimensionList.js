import React, { Component } from 'react';
import DimensionItem from './DimensionItem';

const style = {
    listContainer: {
        maxHeight: 697,
        overflowY: 'scroll',
        position: 'absolute',
        padding: 0,
        minWidth: 250,
        width: 250,
    },
};

export class DimensionList extends Component {
    state = { selected: [] };

    addDimension = index => {
        !this.state.selected.includes(index) &&
            this.setState({
                selected: [...this.state.selected, index],
            });
        this.props.onClick(index);
    };
    removeDimension = index => {
        this.state.selected.includes(index) &&
            this.setState({
                selected: this.state.selected.filter(entry => index !== entry),
            });
    };

    render = () => {
        const { dimensions, searchFieldValue } = this.props;
        const dimensionsList = dimensions.map(
            (
                dimensionName,
                index,
                searchFieldContainsName = dimensionName
                    .toLowerCase()
                    .includes(searchFieldValue.toLowerCase())
            ) =>
                searchFieldContainsName && (
                    <DimensionItem
                        key={index}
                        id={index}
                        dimensionName={dimensionName}
                        addDimension={() => this.addDimension(index)}
                        removeDimension={() => this.removeDimension(index)}
                        isSelected={this.state.selected.includes(index)}
                    />
                )
        );
        return <ul style={style.listContainer}>{dimensionsList}</ul>;
    };
}
export default DimensionList;
