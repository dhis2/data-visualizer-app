import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { AssignButton, SelectAllButton } from './buttons';
import { colors } from '../../../colors';

const style = {
    container: {
        border: '1px solid #E0E0E0',
        height: 376,
    },
    listContainer: {
        listStyle: 'none',
        overflowX: 'scroll',
        height: 340,
        width: 418,
        borderBottom: 0,
        paddingLeft: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        margin: 5,
    },
    highlighted: {
        backgroundColor: '#92C9F7',
        borderRadius: 4,
    },
    unHighlighted: {
        display: 'flex',
        padding: 2,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        paddingLeft: 2,
        paddingRight: 2,
    },
    icon: {
        backgroundColor: colors.grey,
        height: 6,
        width: 6,
        marginTop: 4,
        marginLeft: 10,
        marginRight: 5,
    },
};

const UnselectedIcon = () => {
    return <div style={style.icon} />;
};

const OBJECT_POS = 1;

export class UnselectedItems extends Component {
    state = { highlighted: [] };

    onSelectClick = () => {
        this.props.onSelect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onSelectAllClick = () => {
        this.props.onSelect(this.props.items.map(i => i.id));
        this.setState({ highlighted: [] });
    };

    toggleHighlight = id => {
        const higlightedItems = this.state.highlighted.includes(id)
            ? this.state.highlighted.filter(
                  dataDimId => dataDimId !== id && dataDimId
              )
            : [...this.state.highlighted, id];

        this.setState({ highlighted: higlightedItems });
    };

    searchTextContains = displayName => {
        const { searchFieldInput } = this.props;

        return displayName
            .toLowerCase()
            .includes(searchFieldInput.toLowerCase());
    };

    filterMatchingItems = dataDim => {
        return this.searchTextContains(dataDim.displayName)
            ? this.renderUnselectedItem(dataDim)
            : null;
    };

    onDoubleClickItem = id => {
        this.props.onSelect([id]);
    };

    renderUnselectedItem = dataDim => {
        const itemStyle = this.state.highlighted.includes(dataDim.id)
            ? { ...style.unHighlighted, ...style.highlighted }
            : style.unHighlighted;

        return (
            <li
                className="dimension-item"
                id={dataDim.id}
                key={dataDim.id}
                style={style.listItem}
            >
                <div
                    onDoubleClick={() => this.onDoubleClickItem(dataDim.id)}
                    onClick={() => this.toggleHighlight(dataDim.id)}
                    style={itemStyle}
                >
                    <UnselectedIcon />
                    <span style={style.text}>
                        {i18n.t(dataDim.displayName)}
                    </span>
                </div>
            </li>
        );
    };

    render = () => {
        const { items, searchFieldInput } = this.props;

        const dataDimensions = items.map(
            listItem =>
                searchFieldInput.length
                    ? this.filterMatchingItems(listItem)
                    : this.renderUnselectedItem(listItem)
        );

        return (
            <div style={style.container}>
                <ul style={style.listContainer}>{dataDimensions}</ul>
                <AssignButton action={this.onSelectClick} />
                <SelectAllButton action={this.onSelectAllClick} />
            </div>
        );
    };
}

UnselectedItems.propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    searchFieldInput: PropTypes.string.isRequired,
};

export default UnselectedItems;
