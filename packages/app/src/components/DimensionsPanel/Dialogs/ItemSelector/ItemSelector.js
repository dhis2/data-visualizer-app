import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';

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
                <div style={{ paddingRight: 55 }}>
                    {filterZone}
                    <UnselectedItems
                        className={itemClassName}
                        items={unselected.items}
                        onSelect={unselected.onSelect}
                        filterText={unselected.filterText}
                        requestMoreItems={unselected.requestMoreItems}
                    />
                </div>
                <SelectedItems
                    className={itemClassName}
                    items={selected.items}
                    dialogId={selected.dialogId}
                    onDeselect={selected.onDeselect}
                    onReorder={selected.onReorder}
                />
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
        items: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired,
        filterText: PropTypes.string,
        requestMoreItems: PropTypes.func,
    }),
    selected: PropTypes.shape({
        items: PropTypes.array.isRequired,
        dialogId: PropTypes.string,
        onDeselect: PropTypes.func.isRequired,
        onReorder: PropTypes.func.isRequired,
    }),
    itemClassName: PropTypes.string,
};

export default ItemSelector;
