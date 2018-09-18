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

    searchTextContains = displayName => {
        const { searchField } = this.props;

        return displayName.toLowerCase().includes(searchField.toLowerCase());
    };

    filterMatchingDimensions = dataDim => {
        console.log('filtering ', dataDim.displayName, this.props.searchField);
        return this.searchTextContains(dataDim.displayName)
            ? this.renderItem(dataDim)
            : null;
    };

    renderItem = dataDim => {
        console.log(dataDim);
        return (
            <li id={dataDim.id} key={dataDim.id}>
                {dataDim.displayName}
            </li>
        );
    };

    render = () => {
        const { dataTypeContent, searchField } = this.props;
        const contents = dataTypeContent.map(
            listItem =>
                searchField.length
                    ? this.filterMatchingDimensions(listItem)
                    : this.renderItem(listItem)
        );
        return <ul style={style.container}>{contents}</ul>;
    };
}

export default UnselectedItems;
