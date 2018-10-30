import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import debounce from 'lodash-es/debounce';
import keyBy from 'lodash-es/keyBy';

import DataTypes from './DataTypesSelector';
import Groups from './Groups';
import SearchField from './SearchField';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';
import { HideButton, UpdateButton } from './buttons';

import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';
import { sGetUiItems, sGetUi } from '../../../reducers/ui';
import { sGetDisplayNameProperty } from '../../../reducers/settings';

import { acSetCurrentFromUi } from '../../../actions/current';
import { acRemoveUiItems, acAddUiItems } from '../../../actions/ui';
import { acAddMetadata } from '../../../actions/metadata';

import {
    DEFAULT_DATATYPE_ID,
    ALL_ID,
    dataTypes,
    defaultGroupId,
    defaultGroupDetail,
} from '../../../modules/dataTypes';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';

import { styles } from './styles/DataDimension.style';
import './styles/DataDimension.css';

const dxId = FIXED_DIMENSIONS.dx.id;
const FIRST_PAGE = 1;

export class DataDimension extends Component {
    //defaults
    state = {
        dataType: DEFAULT_DATATYPE_ID,
        groups: {
            indicators: [],
            dataElements: [],
            dataElementOperands: [],
            dataSets: [],
            eventDataItems: [],
            programIndicators: [],
        },
        groupId: ALL_ID,
        groupDetail: '',
        filterText: '',
        items: [],
        nextPage: null,
        unselectedIds: [],
        filter: {},
    };

    componentDidMount() {
        this.updateGroups();
    }

    updateGroups = async () => {
        const dataType = this.state.dataType;

        if (!this.state.groups[dataType].length) {
            const dataTypeGroups = await apiFetchGroups(
                dataType,
                this.props.displayNameProp
            );

            const groups = Object.assign({}, this.state.groups, {
                [dataType]: dataTypeGroups,
            });
            this.setState({ groups }, this.updateAlternatives);
        } else {
            this.updateAlternatives();
        }
    };

    onDataTypeChange = dataType => {
        if (dataType !== this.state.dataType) {
            const filter = Object.assign({}, this.state.filter, {
                [this.state.dataType]: {
                    groupId: this.state.groupId,
                    groupDetail: this.state.groupDetail,
                },
            });

            const currentFilter = this.state.filter[dataType] || {};
            const groupId = currentFilter.groupId || defaultGroupId(dataType);
            const groupDetail =
                currentFilter.groupDetail || defaultGroupDetail(dataType);

            this.setState(
                { filter, dataType, groupId, groupDetail, filterText: '' },
                this.updateGroups
            );
        }
    };

    requestMoreItems = () => {
        if (this.state.nextPage) {
            this.updateAlternatives(this.state.nextPage, true);
        }
    };

    onUpdateClick = () => {
        this.props.onUpdate(this.props.ui);
        this.props.toggleDialog(null);
    };

    updateAlternatives = async (page = FIRST_PAGE, concatItems = false) => {
        const { dataType, groupId, groupDetail, filterText } = this.state;
        let { dimensionItems, nextPage } = await apiFetchAlternatives({
            dataType,
            groupId,
            groupDetail,
            page,
            filterText,
            nameProp: this.props.displayNameProp,
        });

        const augmentFn = dataTypes[dataType].augmentAlternatives;
        if (augmentFn) {
            dimensionItems = augmentFn(dimensionItems, groupId);
        }

        const items = concatItems
            ? this.state.items.concat(dimensionItems)
            : dimensionItems;

        const selectedIds = this.props.selectedItems;

        const unselectedIds = items
            .filter(i => !selectedIds.includes(i.id))
            .map(i => i.id);

        this.setState({ items, unselectedIds, nextPage });
    };

    onGroupChange = async groupId => {
        if (groupId !== this.state.groupId) {
            this.setState({ groupId }, this.updateAlternatives);
        }
    };

    onDetailChange = groupDetail => {
        if (groupDetail !== this.state.groupDetail) {
            this.setState({ groupDetail }, this.updateAlternatives);
        }
    };

    onFilterTextChange = filterText => {
        this.setState(
            { filterText },
            debounce(async () => this.updateAlternatives(), 300)
        );
    };

    selectDataDimensions = selectedIds => {
        const unselectedIds = this.state.unselectedIds.filter(
            id => !selectedIds.includes(id)
        );
        this.setState({ unselectedIds });

        const itemsToAdd = keyBy(
            this.state.items.filter(di => selectedIds.includes(di.id)),
            'id'
        );

        this.props.addDxItems({
            dimensionType: dxId,
            value: selectedIds,
        });

        this.props.addMetadata(itemsToAdd);
    };

    deselectDataDimensions = ids => {
        const unselectedIds = [
            ...new Set([...this.state.unselectedIds, ...ids]),
        ];
        this.setState({ unselectedIds });

        this.props.removeDxItems({
            dimensionType: dxId,
            value: ids,
        });
    };

    render = () => {
        const unselected = this.state.items.filter(di =>
            this.state.unselectedIds.includes(di.id)
        );
        const groups = this.state.groups[this.state.dataType];

        if (!groups.length) {
            return <div />;
        }

        return (
            <div style={styles.container}>
                <DialogContent style={styles.dialogContent}>
                    <h3 style={styles.dialogTitle}>{i18n.t('Data')}</h3>
                    <div style={styles.subContainer}>
                        <div style={{ paddingRight: 46 }}>
                            <DataTypes
                                currentDataType={this.state.dataType}
                                onDataTypeChange={this.onDataTypeChange}
                            />
                            <Groups
                                dataType={this.state.dataType}
                                groups={groups}
                                groupId={this.state.groupId}
                                onGroupChange={this.onGroupChange}
                                onDetailChange={this.onDetailChange}
                                detailValue={this.state.groupDetail}
                            />
                            <SearchField
                                text={this.state.filterText}
                                onFilterTextChange={this.onFilterTextChange}
                            />
                            <UnselectedItems
                                items={unselected}
                                onSelect={this.selectDataDimensions}
                                filterText={this.state.filterText}
                                requestMoreItems={this.requestMoreItems}
                            />
                        </div>
                        <SelectedItems
                            items={this.props.selectedItems}
                            onDeselect={this.deselectDataDimensions}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={styles.dialogActions}>
                    <HideButton action={() => this.props.toggleDialog(null)} />
                    <UpdateButton action={this.onUpdateClick} />
                </DialogActions>
            </div>
        );
    };
}

DataDimension.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
    displayNameProp: PropTypes.string.isRequired,
    selectedItems: PropTypes.array,
    ui: PropTypes.object.isRequired,
    addDxItems: PropTypes.func.isRequired,
    removeDxItems: PropTypes.func.isRequired,
    addMetadata: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

DataDimension.defaultProps = {
    selectedItems: [],
};

const mapStateToProps = state => ({
    selectedItems: sGetUiItems(state)[dxId],
    displayNameProp: sGetDisplayNameProperty(state),
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        removeDxItems: acRemoveUiItems,
        addDxItems: acAddUiItems,
        onUpdate: acSetCurrentFromUi,
        addMetadata: acAddMetadata,
    }
)(DataDimension);
