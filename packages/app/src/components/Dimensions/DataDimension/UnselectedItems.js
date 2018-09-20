import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';
import { SelectAllButton } from './buttons';

const style = {
    container: {
        border: '1px solid #E0E0E0',
    },
    listContainer: {
        height: 311,
        width: 418,
        borderBottom: 0,
        paddingLeft: 0,
        margin: 0,
        listStyle: 'none',
        overflowX: 'scroll',
    },
    listItem: {
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
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
    icon: {
        height: 6,
        width: 6,
        marginTop: 4,
        marginLeft: 10,
        marginRight: 5,
        backgroundColor: '#9E9E9E',
    },
};

const OBJECT_POS = 1;
const UNSELECTED = 'unSelected';

export class UnselectedItems extends Component {
    searchTextContains = displayName => {
        const { searchFieldInput } = this.props;

        return displayName
            .toLowerCase()
            .includes(searchFieldInput.toLowerCase());
    };

    filterMatchingItems = dataDim => {
        return this.searchTextContains(dataDim.displayName)
            ? this.renderItem(dataDim)
            : null;
    };

    renderItem = dataDim => {
        const handleClick = () => this.props.onItemClick(UNSELECTED, dataDim);

        const itemStyle = dataDim.isHighlighted
            ? style.highlighted
            : style.unHighlighted;

        return (
            <li id={dataDim.id} key={dataDim.id} style={style.listItem}>
                <div onClick={handleClick} style={itemStyle}>
                    <div style={style.icon} />
                    <span style={style.text}>
                        {i18n.t(dataDim.displayName)}
                    </span>
                </div>
            </li>
        );
    };

    render = () => {
        const { unSelected, searchFieldInput, selectAll } = this.props;
        const dataDimensions = Object.entries(unSelected).map(
            listItem =>
                searchFieldInput.length
                    ? this.filterMatchingItems(listItem[OBJECT_POS])
                    : this.renderItem(listItem[OBJECT_POS])
        );

        return (
            <div style={style.container}>
                <ul style={style.listContainer}>{dataDimensions}</ul>
                <SelectAllButton action={selectAll} />
            </div>
        );
    };
}

export default UnselectedItems;
