import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash-es/throttle';
import { Item } from './Item';
import { AssignButton, SelectAllButton } from './buttons';
import { toggler } from './toggler';
import { styles } from './styles/UnselectedItems.style';

export class UnselectedItems extends Component {
    constructor(props) {
        super(props);
        this.ulRef = React.createRef();
    }

    state = { highlighted: [], lastClickedIndex: 0 };

    onSelectClick = () => {
        this.props.onSelect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onSelectAllClick = () => {
        this.props.onSelect(this.props.items.map(i => i.id));
        this.setState({ highlighted: [] });
    };

    toggleHighlight = (isCtrlPressed, isShiftPressed, index, id) => {
        const newState = toggler(
            id,
            isCtrlPressed,
            isShiftPressed,
            index,
            this.state.lastClickedIndex,
            this.state.highlighted,
            this.props.items.map(item => item.id)
        );

        this.setState({
            highlighted: newState.ids,
            lastClickedIndex: newState.lastClickedIndex,
        });
    };

    onDoubleClickItem = id => {
        const highlighted = this.state.highlighted.filter(
            dataDimId => dataDimId !== id
        );

        this.setState({ highlighted });
        this.props.onSelect([id]);
    };

    renderListItem = (dataDim, index) => {
        return (
            <li
                className="dimension-item"
                key={dataDim.id}
                style={styles.listItem}
                onDoubleClick={() => this.onDoubleClickItem(dataDim.id)}
            >
                <Item
                    id={dataDim.id}
                    index={index}
                    displayName={dataDim.name}
                    isHighlighted={
                        !!this.state.highlighted.includes(dataDim.id)
                    }
                    onItemClick={this.toggleHighlight}
                    className={'unselected'}
                />
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
        const listItems = this.props.items.map((item, index) =>
            this.renderListItem(item, index)
        );

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
