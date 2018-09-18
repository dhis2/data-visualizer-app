import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

export class UnselectedContainer extends Component {
    state = { dataType: '', dataTypeContent: [], searchField: '' };

    handleChange = event => {
        console.log(event.target.value);
        this.setState({ dataType: event.target.value });
    };

    handleContentChange = newContent => {
        console.log(newContent);
        this.setState({ dataTypeContent: newContent });
        console.log(this.state);
    };

    handleSearchFieldChange = text => {
        this.setState({ searchField: text });
    };

    render = () => {
        return (
            <div>
                <DataTypes
                    value={this.state.dataType}
                    handleChange={this.handleChange}
                />
                <Groups
                    dataType={this.state.dataType}
                    dataTypeContent={this.state.dataTypeContent}
                    onContentChange={this.handleContentChange}
                />
                <SearchField
                    searchField={this.state.searchField}
                    onSearchFieldChange={this.handleSearchFieldChange}
                />
                <UnselectedItems
                    dataTypeContent={this.state.dataTypeContent}
                    searchField={this.state.searchField}
                />
            </div>
        );
    };
}

export default UnselectedContainer;
