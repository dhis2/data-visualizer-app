import React, { Component } from 'react';
//import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 53,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
    },
};

export class Groups extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <div>
                    1. DropDown Title 2. Dropdown with available data element
                    groups
                </div>
                <div>
                    1. Detail dropdown title 2. Dropdown with available totals.
                </div>
            </div>
        );
    };
}

export default Groups;
