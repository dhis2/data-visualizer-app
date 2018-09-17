import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

export class UnselectedContainer extends Component {
    state = { dataType: '' };

    handleChange = event => {
        console.log(event.target.value);
        this.setState({ dataType: event.target.value });
    };

    render = () => {
        return (
            <div>
                <DataTypes
                    value={this.state.dataType}
                    handleChange={this.handleChange}
                />
                <Groups dataType={this.state.dataType} />
                <SearchField />
                <UnselectedItems />
            </div>
        );
    };
}

export default UnselectedContainer;
