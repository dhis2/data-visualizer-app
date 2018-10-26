import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash-es/throttle';
import { AssignButton, SelectAllButton } from './buttons';
import { styles } from './styles/UnselectedItems.style';

const UnselectedIcon = () => <div style={styles.icon} />;

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
            ? { ...styles.unHighlighted, ...styles.highlighted }
            : styles.unHighlighted;

        return (
            <li
                className="dimension-item"
                key={dataDim.id}
                style={styles.listItem}
                onDoubleClick={() => this.onDoubleClickItem(dataDim.id)}
                onClick={() => this.toggleHighlight(dataDim.id)}
            >
                <div style={itemStyle}>
                    <UnselectedIcon />
                    <span style={styles.text}>{dataDim.name}</span>
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
            <div style={styles.container} onScroll={this.requestMoreItems}>
                <ul ref={this.ulRef} style={styles.listContainer}>
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
