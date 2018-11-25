import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import keyBy from 'lodash-es/keyBy';

import FilterField from '../FilterField';
import UnselectedItems from '../UnselectedItems';
import SelectedItems from '../SelectedItems';
import { ArrowButton } from '../buttons/ArrowButton';

import { apiFetchItemsByDimension } from '../../../../api/dimensions';

import { sGetUiItemsByDimension } from '../../../../reducers/ui';
import {
    acRemoveUiItems,
    acAddUiItems,
    acSetUiItems,
} from '../../../../actions/ui';
import { acAddMetadata } from '../../../../actions/metadata';

import { styles } from './styles/DynamicDimension.style';
import '../styles/Dialog.css';

const emptyItems = [];

export class DynamicDimension extends Component {
    state = {
        filterText: '',
        nextPage: null,
        items: [],
        unselectedIds: [],
        selectedIds: [],
        highlightedUnselectedIds: [],
        highlightedSelectedIds: [],
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

        const highlightedUnselectedIds = this.state.highlightedUnselectedIds.filter(
            id => !selectedIds.includes(id)
        );

        this.setState({ unselectedIds, highlightedUnselectedIds });

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

        const highlightedSelectedIds = this.state.highlightedSelectedIds.filter(
            id => !ids.includes(id)
        );

        this.setState({ unselectedIds, highlightedSelectedIds });

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

    onHighlightItem = (arrayName, highlightedIds) => {
        this.setState({ [arrayName]: highlightedIds });
    };

    renderSelectButtons = () => (
        <div className="select-buttons">
            <ArrowButton
                className={'data-dimension-arrow-forward-button'}
                onClick={() =>
                    this.state.highlightedUnselectedIds.length
                        ? this.selectItemsByDimensions(
                              this.state.highlightedUnselectedIds
                          )
                        : null
                }
                iconType={'arrowForward'}
            />
            <ArrowButton
                className={`data-dimenison-arrow-back-button`}
                onClick={() =>
                    this.state.highlightedSelectedIds.length
                        ? this.deselectItemsByDimensions(
                              this.state.highlightedSelectedIds
                          )
                        : null
                }
                iconType={'arrowBack'}
            />
        </div>
    );

    render() {
        const SelectButtons = this.renderSelectButtons();
        const unselectedItems = this.getUnselectedItems();

        return (
            <Fragment>
                <DialogTitle>{i18n.t(this.props.dialogTitle)}</DialogTitle>
                <DialogContent style={styles.dialogContent}>
                    <div style={styles.unselectedContainer}>
                        <FilterField
                            text={this.state.filterText}
                            onFilterTextChange={this.onFilterTextChange}
                            onClearFilter={this.onClearFilter}
                        />
                        <UnselectedItems
                            className="dynamic-dimension"
                            items={unselectedItems}
                            highlighted={this.state.highlightedUnselectedIds}
                            onHighlightItem={this.onHighlightItem}
                            onSelect={this.selectItemsByDimensions}
                            filterText={this.state.filterText}
                        />
                    </div>
                    {SelectButtons}
                    <SelectedItems
                        className="dynamic-dimension"
                        items={this.props.selectedItems}
                        highlighted={this.state.highlightedSelectedIds}
                        onHighlightItem={this.onHighlightItem}
                        dialogId={this.props.dialogId}
                        onDeselect={this.deselectItemsByDimensions}
                        onReorder={this.setUiItems}
                    />
                </DialogContent>
            </Fragment>
        );
    }
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
