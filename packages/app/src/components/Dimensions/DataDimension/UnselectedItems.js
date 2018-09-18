import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 389,
        width: 395,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        margin: 0,
        paddingLeft: 25,
    },
};

export class UnselectedItems extends Component {
    state = {};

    searchTextContains = displayName => {
        const { searchFieldInput } = this.props;

        return displayName
            .toLowerCase()
            .includes(searchFieldInput.toLowerCase());
    };

    filterMatchingDimensions = dataDim => {
        //console.log('filtering ', dataDim.displayName, this.props.searchField);
        return this.searchTextContains(dataDim.displayName)
            ? this.renderItem(dataDim)
            : null;
    };

    renderItem = dataDim => {
        //console.log(dataDim);
        return (
            <li
                id={dataDim.id}
                key={dataDim.id}
                onClick={() => this.props.onAddDataDimension(dataDim)}
            >
                {i18n.t(dataDim.displayName)}
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
        return <ul style={style.container}>{contents}</ul>;
    };
}

export default UnselectedItems;
