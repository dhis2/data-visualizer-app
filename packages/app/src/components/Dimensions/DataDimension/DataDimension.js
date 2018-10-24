import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import debounce from 'lodash-es/debounce';

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

import { colors } from '../../../colors';
import { DEFAULT_DATATYPE_ID, ALL_ID, dataTypes } from './dataTypes';
import { arrayToIdMap } from '../../../util';

import './DataDimension.css';

const style = {
    container: {
        maxHeight: 677,
        maxWidth: 795,
        overflow: 'hidden',
    },
    dialogContent: {
        paddingBottom: 0,
        paddingTop: 0,
        overflow: 'hidden',
    },
    dialogTitle: {
        fontFamily: 'Roboto',
        color: colors.black,
        height: 24,
        fontSize: 16,
        fontWeight: 500,
    },
    subContainer: {
        display: 'flex',
        height: 536,
    },
    dialogActions: {
        borderTop: `1px solid ${colors.blueGrey}`,
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: 84,
        paddingRight: 24,
    },
};

const DX = 'dx';
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
        dimensionItems: [],
        nextPage: null,
        unselectedIds: [],
    };

    componentDidMount = () => {
        this.updateGroups(this.state.dataType, this.updateAlternatives);
    };

    updateGroups = async (dataType, cb) => {
        if (!this.state.groups[dataType].length) {
            const dataTypeGroups = await apiFetchGroups(dataType);

            const groups = Object.assign({}, this.state.groups, {
                [dataType]: dataTypeGroups,
            });
            this.setState({ groups }, cb);
        }
    };

    onDataTypeChange = dataType => {
        const updateCb = () => {
            this.updateGroups(this.state.dataType, this.updateAlternatives);
        };

        const groupId = dataTypes[dataType].defaultGroup
            ? dataTypes[dataType].defaultGroup.id
            : '';

        let groupDetail = '';
        if (dataTypes[dataType].groupDetail) {
            groupDetail = dataTypes[dataType].groupDetail.default;
        }

        this.setState({ dataType, groupId, groupDetail }, updateCb);
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

        const newDimensionItems = concatItems
            ? this.state.dimensionItems.concat(dimensionItems)
            : dimensionItems;

        const selectedIds = this.props.selectedItems[DX];

        const unselectedIds = newDimensionItems
            .filter(i => !selectedIds.includes(i.id))
            .map(i => i.id);

        this.setState({
            dimensionItems: newDimensionItems,
            unselectedIds,
            nextPage,
        });
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

        const itemsToAdd = arrayToIdMap(
            this.state.dimensionItems.filter(di => selectedIds.includes(di.id))
        );
        this.props.addDxItems({
            dimensionType: DX,
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
            dimensionType: DX,
            value: ids,
        });
    };

    render = () => {
        const unselected = this.state.dimensionItems.filter(di =>
            this.state.unselectedIds.includes(di.id)
        );
        const groups = this.state.groups[this.state.dataType];

        if (!groups) {
            return <div />;
        }

        return (
            <div style={style.container}>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{i18n.t('Data')}</h3>
                    <div style={style.subContainer}>
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
                            items={this.props.selectedItems.dx}
                            onDeselect={this.deselectDataDimensions}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={style.dialogActions}>
                    <HideButton action={() => this.props.toggleDialog(null)} />
                    <UpdateButton action={this.onUpdateClick} />
                </DialogActions>
            </div>
        );
    };
}

DataDimension.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedItems: sGetUiItems(state),
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
