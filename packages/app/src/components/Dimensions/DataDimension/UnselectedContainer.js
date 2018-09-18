import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

export class UnselectedContainer extends Component {
    state = { dataType: '', searchField: '' };

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
                    onContentChange={this.props.onContentChange}
                />
                <SearchField
                    searchFieldInput={this.state.searchField}
                    onSearchFieldChange={this.handleSearchFieldChange}
                />
                <UnselectedItems
                    unselected={this.props.unselected}
                    searchFieldInput={this.state.searchField}
                    highlightedItems={this.props.highlightedItems}
                    onItemClick={this.props.onItemClick}
                />
            </div>
        );
    };
}

export default UnselectedContainer;
