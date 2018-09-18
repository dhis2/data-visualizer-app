import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import { GenericDimension } from '../icons';

const style = {
    listContainer: {
        height: 389,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        paddingLeft: 0,
        margin: 0,
        listStyle: 'none',
    },
    listItem: {
        height: 25,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Roboto',
        paddingLeft: 2,
    },
};

export class UnselectedItems extends Component {
    constructor(props) {
        super(props);
        this.refsCollection = [];
    }

    searchTextContains = displayName => {
        const { searchFieldInput } = this.props;

        return displayName
            .toLowerCase()
            .includes(searchFieldInput.toLowerCase());
    };

    filterMatchingDimensions = dataDim => {
        return this.searchTextContains(dataDim.displayName)
            ? this.renderItem(dataDim)
            : null;
    };

    renderItem = dataDim => {
        //console.log(dataDim);
        //const ref = dataDim.id;
        //console.log(ref);
        return (
            <li
                id={dataDim.id}
                key={dataDim.id}
                ref={listItem => (this.refsCollection[dataDim.id] = listItem)}
                onClick={() => this.refsCollection[dataDim.id].focus()}
                style={style.listItem}
            >
                <GenericDimension />
                <span style={style.text}>{i18n.t(dataDim.displayName)}</span>
            </li>
        );
    };

    render = () => {
        const { unselected, searchFieldInput } = this.props;
        const contents = unselected.map(
            listItem =>
                searchFieldInput.length
                    ? this.filterMatchingDimensions(listItem)
                    : this.renderItem(listItem)
        );
        return <ul style={style.listContainer}>{contents}</ul>;
    };
}

export default UnselectedItems;
