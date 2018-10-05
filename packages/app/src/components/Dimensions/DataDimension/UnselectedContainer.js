import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';
import { DEFAULT_DATATYPE_ID } from './defaults';

const style = {
    container: {
        paddingRight: 46,
    },
};

export class UnselectedContainer extends Component {
    state = {
        dataType: DEFAULT_DATATYPE_ID,
        searchText: '',
        detailsOrTotals: '',
    };

    handleDataTypeChange = dataType => {
        this.setState({ dataType });
    };

    handleDetailChange = detailsOrTotals => {
        this.setState({ detailsOrTotals });
    };

    handleSearchTextChange = searchText => {
        this.setState({ searchText });
    };

    render = () => {
        return (
            <div style={style.container}>
                <DataTypes
                    currentDataType={this.state.dataType}
                    onDataTypeChange={this.handleDataTypeChange}
                />
                <Groups
                    dataType={this.state.dataType}
                    onGroupChange={this.props.onGroupChange}
                    onDetailChange={this.handleDetailChange}
                    detailValue={this.state.detailsOrTotals}
                />
                <SearchField
                    searchFieldInput={this.state.searchText}
                    onSearchFieldChange={this.handleSearchTextChange}
                />
                <UnselectedItems
                    items={this.props.items}
                    onSelect={this.props.onSelect}
                    searchFieldInput={this.state.searchText}
                />
            </div>
        );
    };
}

UnselectedContainer.propTypes = {
    items: PropTypes.array.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    requestMoreItems: PropTypes.func.isRequired,
};

export default UnselectedContainer;
