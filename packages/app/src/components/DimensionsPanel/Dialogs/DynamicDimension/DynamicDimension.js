import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import keyBy from 'lodash-es/keyBy';
import { ItemSelector } from '@dhis2/d2-ui-analytics';

import FilterField from '../FilterField';

import { apiFetchItemsByDimension } from '../../../../api/dimensions';

import { sGetUiItemsByDimension } from '../../../../reducers/ui';
import {
    acRemoveUiItems,
    acAddUiItems,
    acSetUiItems,
} from '../../../../actions/ui';
import { sGetMetadata } from '../../../../reducers/metadata';
import { acAddMetadata } from '../../../../actions/metadata';

import { styles } from './styles/DynamicDimension.style';

const emptyItems = [];

export class DynamicDimension extends Component {
    state = {
        filterText: '',
        nextPage: null,
        items: [],
        unselectedIds: [],
        selectedIds: [],
    };

    componentDidMount = async () => {
        const items = await apiFetchItemsByDimension(this.props.dialogId);

        this.setState({ items });
    };

    onClearFilter = () => {
        this.setState({ filterText: '' });
    };

    onFilterTextChange = filterText => {
        const filteredItems = this.state.items.map(
            item =>
                item.name.toLowerCase().includes(filterText.toLowerCase()) &&
                item.id
        );

        this.setState({
            filterText,
            unselectedIds: filteredItems,
        });
    };

    selectItemsByDimensions = selectedIds => {
        const unselectedIds = this.state.unselectedIds.filter(
            id => !selectedIds.includes(id)
        );
        this.setState({ unselectedIds });

        const itemsToAdd = keyBy(
            this.state.items.filter(di => selectedIds.includes(di.id)),
            'id'
        );

        this.props.addItems({
            dimensionType: this.props.dialogId,
            value: selectedIds,
        });

        this.props.addMetadata(itemsToAdd);
    };

    deselectItemsByDimensions = ids => {
        const unselectedIds = [
            ...new Set([...this.state.unselectedIds, ...ids]),
        ];
        this.setState({ unselectedIds });

        this.props.removeItems({
            dimensionType: this.props.dialogId,
            value: ids,
        });
    };

    getUnselectedItems = () =>
        this.state.items.filter(
            item => !this.props.selectedItems.includes(item.id)
        );

    setUiItems = items =>
        this.props.setItems({
            dimensionType: this.props.dialogId,
            items,
        });

    render = () => {
        const filterZone = () => {
            return (
                <FilterField
                    text={this.state.filterText}
                    onFilterTextChange={this.onFilterTextChange}
                    onClearFilter={this.onClearFilter}
                />
            );
        };

        const unselected = {
            items: this.getUnselectedItems(),
            onSelect: this.selectItemsByDimensions,
            filterText: this.state.filterText,
        };

        const selectedItems = this.props.selectedItems.map(i => ({
            id: i,
            name: this.props.metadata[i].name,
        }));

        const selected = {
            items: selectedItems,
            onDeselect: this.deselectItemsByDimensions,
            onReorder: this.setUiItems,
        };

        return (
            <Fragment>
                <DialogTitle>{i18n.t(this.props.dialogTitle)}</DialogTitle>
                <DialogContent style={styles.dialogContent}>
                    <ItemSelector
                        itemClassName="dynamic-dimension"
                        unselected={unselected}
                        selected={selected}
                    >
                        {filterZone()}
                    </ItemSelector>
                </DialogContent>
            </Fragment>
        );
    };
}

DynamicDimension.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    addItems: PropTypes.func.isRequired,
    setItems: PropTypes.func.isRequired,
    removeItems: PropTypes.func.isRequired,
    addMetadata: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    selectedItems:
        sGetUiItemsByDimension(state, ownProps.dialogId) || emptyItems,
    metadata: sGetMetadata(state),
});

export default connect(
    mapStateToProps,
    {
        removeItems: acRemoveUiItems,
        addItems: acAddUiItems,
        setItems: acSetUiItems,
        addMetadata: acAddMetadata,
    }
)(DynamicDimension);
