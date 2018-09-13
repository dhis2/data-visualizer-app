import React, { Component } from 'react';
//import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 40,
        width: 420,
        border: '1px solid #E0E0E0',
        backgroundColor: '#FFFFFF',
    },
};

export class SearchField extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                1. SearchField Icon 2. TextField ("Search" placeholder)
            </div>
        );
    };
}

export default SearchField;
