import React, { Component } from 'react';
//import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 54,
        width: 420,
        border: '1px solid #E0E0E0',
    },
};

export class DataTypes extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <span>1. DropDownTitle</span>
                <span>2. DropDown with available Data types</span>
            </div>
        );
    };
}

export default DataTypes;
