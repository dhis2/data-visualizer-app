import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import { GenericDimension } from '../icons';
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
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        borderRadius: 30,
        border: '1px solid black',
    },
    unHighlighted: {
        display: 'flex',
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    text: {
        fontSize: 13,
        fontFamily: 'Roboto',
        paddingLeft: 2,
    },
    listItem: {
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 5,
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
