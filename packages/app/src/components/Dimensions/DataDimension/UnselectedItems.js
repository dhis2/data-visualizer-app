import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import { SelectAllButton } from './buttons';
import { colors } from '../../../colors';

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
    highlighted: {
        //backgroundColor: colors.lightBlue,
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 5,
        borderRadius: 4,
        border: `3px solid ${colors.lightBlue}`,
    },
    unHighlighted: {
        margin: 3,
        display: 'flex',
        paddingTop: 2,
        paddingRight: 5,
        paddingBottom: 2,
    },
    text: {
        fontSize: 13,
        fontFamily: 'Roboto',
        paddingLeft: 2,
    },
    listItem: {
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
    },
    icon: {
        height: 6,
        width: 6,
        marginTop: 4,
        marginLeft: 10,
        marginRight: 5,
        backgroundColor: '#9E9E9E',
    },
};

export class UnselectedItems extends Component {
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
        return (
            <li id={dataDim.id} key={dataDim.id} style={style.listItem}>
                <div
                    onClick={() => this.props.onItemClick(dataDim)}
                    style={
                        this.props.highlightedItems.includes(dataDim)
                            ? style.highlighted
                            : style.unHighlighted
                    }
                >
                    <div style={style.icon} />
                    <span style={style.text}>
                        {i18n.t(dataDim.displayName)}
                    </span>
                </div>
            </li>
        );
    };

    render = () => {
        const { unSelected, searchFieldInput } = this.props;
        const contents = unSelected.map(
            listItem =>
                searchFieldInput.length
                    ? this.filterMatchingDimensions(listItem)
                    : this.renderItem(listItem)
        );
        return (
            <div>
                <ul style={style.listContainer}>{contents}</ul>
                <SelectAllButton />
            </div>
        );
    };
}

export default UnselectedItems;
