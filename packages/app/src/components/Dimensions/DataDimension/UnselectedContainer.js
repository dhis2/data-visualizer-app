import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';
import { SelectAllButton } from './buttons';

export class UnselectedContainer extends Component {
    state = { dataType: 'indicators', searchField: '' };

    handleDataTypeChange = event => {
        this.setState({ dataType: event.target.value });
    };

    handleSearchFieldChange = text => {
        this.setState({ searchField: text });
    };

    render = () => {
        return (
            <div>
                <DataTypes
                    value={this.state.dataType}
                    onDataTypeChange={this.handleDataTypeChange}
                />
                <Groups
                    dataType={this.state.dataType}
                    onGroupChange={this.props.onGroupChange}
                />
                <SearchField
                    searchFieldInput={this.state.searchField}
                    onSearchFieldChange={this.handleSearchFieldChange}
                />
                <UnselectedItems
                    unSelected={this.props.unSelected}
                    searchFieldInput={this.state.searchField}
                    highlighted={this.props.highlighted}
                    onItemClick={this.props.onItemClick}
                />
                <SelectAllButton action={this.props.selectAll} />
            </div>
        );
    };
}

export default UnselectedContainer;
