import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

export class UnselectedContainer extends Component {
    state = { dataType: '', searchField: '' };

    handleDataTypeChange = event => {
        //console.log(event.target.value);
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
                    unselected={this.props.unselected}
                    onContentChange={this.props.onContentChange}
                />
                <SearchField
                    searchFieldInput={this.state.searchField}
                    onSearchFieldChange={this.handleSearchFieldChange}
                />
                <UnselectedItems
                    unselected={this.props.unselected}
                    searchFieldInput={this.state.searchField}
                    onAddDataDimension={this.props.onAddDataDimension}
                />
            </div>
        );
    };
}

export default UnselectedContainer;
