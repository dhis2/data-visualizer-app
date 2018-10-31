import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import keyBy from 'lodash-es/keyBy';

import SearchField from '../../Dialogs/SearchField';
import UnselectedItems from '../../Dialogs/UnselectedItems';
import SelectedItems from '../../Dialogs/SelectedItems';

import { apiFetchItemsByDimension } from '../../../../api/dimensions';

import { sGetUiItems, sGetUiLayout } from '../../../../reducers/ui';
import { acRemoveUiItems, acAddUiItems } from '../../../../actions/ui';
import { acAddMetadata } from '../../../../actions/metadata';

import '../Dialog.css';
import current from '../../../../reducers/current';

const dimensionTypes = ['dx', 'pe', 'ou'];

export class GenericDimension extends Component {
    state = {
        filterText: '',
        dimensionItems: [],
        unselectedIds: [],
        selectedIds: [],
        dimensionType: '',
    };

    componentDidMount = async () => {
        const dimensionItems = await apiFetchItemsByDimension(
            this.props.dimension.id
        );

        this.setState({ dimensionItems });
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

        this.props.addDxItems({
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

        this.props.removeDxItems({
            dimensionType: this.state.dimensionType,
            value: ids,
        });
    };

    getSelectedItems = () => {
        let selectedIds = [];

        const { selectedLayout, selectedItems, dimension } = this.props;
        const currentLayout = Object.values(selectedLayout);

        const layoutIndex = currentLayout.findIndex(ids =>
            ids.includes(dimension.id)
        );
        const isSelected = layoutIndex > -1;

        if (isSelected) {
            selectedIds = selectedItems[dimensionTypes[layoutIndex]];

            selectedIds = this.state.dimensionItems
                .filter(item => selectedIds.includes(item.id))
                .map(item => item.id);

            if (!this.state.dimensionType.length)
                this.setState({
                    dimensionType: dimensionTypes[layoutIndex],
                });
        }

        return selectedIds;
    };

    render = () => {
        /* const unselectedItems = this.state.dimensionItems.filter(di =>
            this.state.unselectedIds.includes(di.id)
        );*/
        const selectedIds = this.getSelectedItems();
        console.log(selectedIds);
        console.log(this.state.dimensionItems);
        const unselectedItems = this.state.dimensionItems.filter(
            item => !selectedIds.includes(item.id)
        );
        console.log(unselectedItems);
        console.log(selectedIds);

        return (
            <Fragment>
                <DialogTitle>{i18n.t(this.props.dimension.title)}</DialogTitle>
                <DialogContent>
                    <div style={{ paddingRight: 46 }}>
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

GenericDimension.propTypes = {
    selectedItems: PropTypes.object.isRequired,
    addDxItems: PropTypes.func.isRequired,
    removeDxItems: PropTypes.func.isRequired,
    addMetadata: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedLayout: sGetUiLayout(state),
    selectedItems: sGetUiItems(state),
});

export default connect(
    mapStateToProps,
    {
        removeDxItems: acRemoveUiItems,
        addDxItems: acAddUiItems,
        addMetadata: acAddMetadata,
    }
)(GenericDimension);
