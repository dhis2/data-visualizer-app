import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

const style = {
    container: {
        paddingRight: 46,
    },
};
export class UnselectedContainer extends Component {
    state = { dataType: 'indicators', searchField: '', detailsOrTotals: '' };

    handleDataTypeChange = value => {
        this.setState({ dataType: value });
    };

    handleDetailChange = value => {
        this.setState({ detailsOrTotals: value });
    };

    handleSearchFieldChange = text => {
        this.setState({ searchField: text });
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

UnselectedContainer.propTypes = {
    unSelectedItems: PropTypes.object.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    onAssignClick: PropTypes.func.isRequired,
};

export default UnselectedContainer;
