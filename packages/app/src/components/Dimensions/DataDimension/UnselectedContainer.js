import React, { Component } from 'react';
import DataTypes from './DataTypes';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';

export class UnselectedContainer extends Component {
    state = {};

    render = () => {
        return (
            <div>
                <DataTypes />
                <Groups />
                <SearchField />
                <UnselectedItems />
            </div>
        );
    };
}

export default UnselectedContainer;
