import React, { Component } from 'react';
//import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 389,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
    },
};

export class UnselectedItems extends Component {
    state = {};

    renderUnselectedItems = () => {};

    render = () => {
        return (
            <div style={style.container}>{this.renderUnselectedItems()}</div>
        );
    };
}

export default UnselectedItems;
