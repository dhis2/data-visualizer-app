import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';

import './ItemSelector.css';

const style = {
    container: {
        marginRight: 55,
        display: 'flex',
        flexDirection: 'column',
        width: 420,
        height: 534,
        border: '1px solid #e0e0e0',
    },
};

class ItemSelector extends Component {
    render() {
        const {
            unselected,
            selected,
            itemClassName,
            children: filterZone,
        } = this.props;

        return (
            <Fragment>
                <div style={style.container}>
                    {filterZone}
                    <UnselectedItems
                        style={style.unselectedItems}
                        className={itemClassName}
                        {...unselected}
                    />
                </div>
                <SelectedItems className={itemClassName} {...selected} />
            </Fragment>
        );
    }
}

ItemSelector.defaultProps = {
    unselected: {
        filterText: '',
    },
};

ItemSelector.propTypes = {
    unselected: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        onSelect: PropTypes.func.isRequired,
        filterText: PropTypes.string,
        requestMoreItems: PropTypes.func,
    }),
    selected: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        dialogId: PropTypes.string,
        onDeselect: PropTypes.func.isRequired,
        onReorder: PropTypes.func.isRequired,
    }),
    itemClassName: PropTypes.string,
};

export default ItemSelector;
