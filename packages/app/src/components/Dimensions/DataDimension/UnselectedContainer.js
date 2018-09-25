import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';
import { AssignButton, SelectAllButton } from './buttons';

const style = {
    container: {
        paddingRight: 46,
    },
};
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
            <div style={style.container}>
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
                    unSelectedItems={this.props.unSelectedItems}
                    onSelectAllClick={this.props.onSelectAllClick}
                    onAssignClick={this.props.onAssignClick}
                    searchFieldInput={this.state.searchField}
                />
            </div>
        );
    };
}

export default UnselectedContainer;
