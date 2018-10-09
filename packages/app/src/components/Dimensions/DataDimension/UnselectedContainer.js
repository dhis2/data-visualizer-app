import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTypes from './DataTypesSelector';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

const style = {
    container: {
        paddingRight: 46,
    },
};

export class UnselectedContainer extends Component {
    state = { filterText: '' };

    onFilterTextChange = filterText => {
        this.setState({ filterText });
    };

    render = () => {
        return (
            <div style={style.container}>
                <DataTypes
                    currentDataType={this.props.dataType}
                    onDataTypeChange={this.props.onDataTypeChange}
                />
                <Groups
                    dataType={this.props.dataType}
                    groups={this.props.groups}
                    selectedGroupId={this.props.selectedGroupId}
                    onGroupChange={this.props.onGroupChange}
                    onDetailChange={this.props.onDetailChange}
                    detailValue={this.props.groupDetail}
                />
                <SearchField onFilterTextChange={this.onFilterTextChange} />
                <UnselectedItems
                    items={this.props.items}
                    onSelect={this.props.onSelect}
                    filterText={this.state.filterText}
                    requestMoreItems={this.props.requestMoreItems}
                />
            </div>
        );
    };
}

UnselectedContainer.propTypes = {
    dataType: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    selectedGroupId: PropTypes.string.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    onDataTypeChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    requestMoreItems: PropTypes.func.isRequired,
    groupDetail: PropTypes.string.isRequired,
    onDetailChange: PropTypes.func.isRequired,
};

export default UnselectedContainer;
