import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash-es/throttle';
import { AssignButton, SelectAllButton } from './buttons';
import { colors } from '../../../utils/colors';

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
        userSelect: 'none',
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

const UnselectedIcon = () => <div style={style.icon} />;

export class UnselectedItems extends Component {
    constructor(props) {
        super(props);
        this.ulRef = React.createRef();
    }

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

    onDoubleClickItem = id => this.props.onSelect([id]);

    renderListItem = dataDim => {
        const itemStyle = this.state.highlighted.includes(dataDim.id)
            ? { ...style.unHighlighted, ...style.highlighted }
            : style.unHighlighted;

        return (
            <li
                className="dimension-item"
                key={dataDim.id}
                style={style.listItem}
                onDoubleClick={() => this.onDoubleClickItem(dataDim.id)}
                onClick={() => this.toggleHighlight(dataDim.id)}
            >
                <div style={itemStyle}>
                    <UnselectedIcon />
                    <span style={style.text}>{dataDim.name}</span>
                </div>
            </li>
        );
    };

    requestMoreItems = throttle(() => {
        const node = this.ulRef.current;

        if (node) {
            const bottom =
                node.scrollHeight - node.scrollTop === node.clientHeight;
            if (bottom) {
                this.props.requestMoreItems();
            }
        }
    }, 1000);

    render = () => {
        const listItems = this.props.items.map(i => this.renderListItem(i));

        return (
            <div style={style.container} onScroll={this.requestMoreItems}>
                <ul ref={this.ulRef} style={style.listContainer}>
                    {listItems}
                </ul>
                <AssignButton action={this.onSelectClick} />
                <SelectAllButton action={this.onSelectAllClick} />
            </div>
        );
    };
}

UnselectedItems.propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    filterText: PropTypes.string.isRequired,
    requestMoreItems: PropTypes.func.isRequired,
};

export default UnselectedItems;
