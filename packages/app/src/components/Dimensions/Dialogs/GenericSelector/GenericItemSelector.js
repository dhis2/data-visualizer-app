import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import keyBy from 'lodash-es/keyBy';

import SearchField from '../SearchField';
import UnselectedItems from '../UnselectedItems';
import SelectedItems from '../SelectedItems';

import { apiFetchItemsByDimension } from '../../../../api/dimensions';

import { sGetUiItems } from '../../../../reducers/ui';
import { acRemoveUiItems, acAddUiItems } from '../../../../actions/ui';
import { acAddMetadata } from '../../../../actions/metadata';

import { styles } from './styles/GenericItemSelector.styles';
import '../styles/Dialog.css';

export class GenericItemSelector extends Component {
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

    render = () => {
        const unselectedItems = this.state.items.filter(
            item => !this.props.selectedItems.includes(item.id)
        );

        return (
            <Fragment>
                <DialogTitle>{i18n.t(this.props.dialogTitle)}</DialogTitle>
                <DialogContent>
                    <div style={styles.dialogContainer}>
                        <SearchField
                            text={this.state.filterText}
                            onFilterTextChange={this.onFilterTextChange}
                        />
                        <UnselectedItems
                            className="generic-dimension"
                            items={unselectedItems}
                            onSelect={this.selectItemsByDimensions}
                            filterText={this.state.filterText}
                        />
                    </div>
                    <SelectedItems
                        className="generic-dimension"
                        items={this.props.selectedItems}
                        onDeselect={this.deselectItemsByDimensions}
                    />
                </DialogContent>
            </Fragment>
        );
    };
}

GenericItemSelector.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    addItems: PropTypes.func.isRequired,
    removeItems: PropTypes.func.isRequired,
    addMetadata: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    selectedItems: sGetUiItems(state)[ownProps.dialogId] || [],
});

export default connect(
    mapStateToProps,
    {
        removeItems: acRemoveUiItems,
        addItems: acAddUiItems,
        addMetadata: acAddMetadata,
    }
)(GenericItemSelector);
