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

import { sGetUiItems, sGetUiLayout } from '../../../../reducers/ui';
import { acRemoveUiItems, acAddUiItems } from '../../../../actions/ui';
import { acAddMetadata } from '../../../../actions/metadata';

import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';

import '../styles/Dialog.css';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

const dimensionTypes = [dxId, peId, ouId];

export class GenericItemSelector extends Component {
    state = {
        filterText: '',
        dimensionItems: [],
        unselectedIds: [],
        selectedIds: [],
        dimensionType: '',
    };

    componentDidMount = async () => {
        const { selectedLayout, dialogId } = this.props;
        const dimensionItems = await apiFetchItemsByDimension(dialogId);

        const currentLayout = Object.values(selectedLayout);
        const axisKey = currentLayout.findIndex(ids => ids.includes(dialogId));

        this.setState({
            dimensionItems,
            dimensionType: dimensionTypes[axisKey],
        });
    };

    onFilterTextChange = filterText => {
        const filteredItems = this.state.dimensionItems.map(
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
            this.state.dimensionItems.filter(di => selectedIds.includes(di.id)),
            'id'
        );

        this.props.addItems({
            dimensionType: this.state.dimensionType,
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
            dimensionType: this.state.dimensionType,
            value: ids,
        });
    };

    getSelectedIds = () => {
        const { selectedItems } = this.props;
        let selectedIds = [];

        if (selectedItems[this.state.dimensionType]) {
            selectedIds = this.state.dimensionItems
                .filter(item =>
                    selectedItems[this.state.dimensionType].includes(item.id)
                )
                .map(item => item.id);
        }
        return selectedIds;
    };

    render = () => {
        const selectedIds = this.getSelectedIds();

        const unselectedItems = this.state.dimensionItems.filter(
            item => !selectedIds.includes(item.id)
        );

        return (
            <Fragment>
                <DialogTitle>{i18n.t(this.props.dialogTitle)}</DialogTitle>
                <DialogContent>
                    <div style={{ paddingRight: 55 }}>
                        <SearchField
                            text={this.state.filterText}
                            onFilterTextChange={this.onFilterTextChange}
                        />
                        <UnselectedItems
                            className="generic-dimension"
                            items={unselectedItems}
                            onSelect={this.selectItemsByDimensions}
                            filterText={this.state.filterText}
                            requestMoreItems={this.requestMoreItems}
                        />
                    </div>
                    <SelectedItems
                        className="generic-dimension"
                        items={selectedIds}
                        onDeselect={this.deselectItemsByDimensions}
                    />
                </DialogContent>
            </Fragment>
        );
    };
}

GenericItemSelector.propTypes = {
    selectedItems: PropTypes.object.isRequired,
    addItems: PropTypes.func.isRequired,
    removeItems: PropTypes.func.isRequired,
    addMetadata: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedLayout: sGetUiLayout(state),
    selectedItems: sGetUiItems(state),
});

export default connect(
    mapStateToProps,
    {
        removeItems: acRemoveUiItems,
        addItems: acAddUiItems,
        addMetadata: acAddMetadata,
    }
)(GenericItemSelector);
