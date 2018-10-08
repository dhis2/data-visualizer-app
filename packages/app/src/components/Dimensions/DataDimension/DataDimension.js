import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DialogActions, DialogContent } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';

import UnselectedContainer from './UnselectedContainer';
import SelectedItems from './SelectedItems';
import { HideButton, UpdateButton } from './buttons';

import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';
import { sGetUiItems, sGetUi } from '../../../reducers/ui';
import { acSetCurrentFromUi } from '../../../actions/current';
import { acRemoveUiItems, acAddUiItems } from '../../../actions/ui';
import { colors } from '../../../colors';
import { DEFAULT_DATATYPE_ID, ALL_ID, dataTypes } from './dataTypes';

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

export class DataDimension extends Component {
    state = {
        dataType: '',
        groups: {
            indicators: [],
            dataElements: [],
            dataSets: [],
            eventDataItems: [],
            programIndicators: [],
        },
        selectedGroupId: '',
        dimensionItems: [],
        unselectedIds: [],
    };

    updateUnselected = async dataType => {
        if (!this.state.groups[dataType].length) {
            const dataTypeGroups = await apiFetchGroups(dataType);

            const groups = Object.assign({}, this.state.groups, {
                [dataType]: dataTypeGroups,
            });
            this.setState({ groups });
        }

        const dimensionItems = await apiFetchAlternatives(dataType, ALL_ID);

        const selectedGroupId = dataTypes[dataType].defaultGroup
            ? dataTypes[dataType].defaultGroup.id
            : '';

        this.setState({
            dimensionItems,
            dataType,
            selectedGroupId,
        });
    };

    componentDidMount = async () => {
        await this.updateUnselected(DEFAULT_DATATYPE_ID);
    };

    onDataTypeChange = async dataType => {
        if (dataType !== this.state.dataType) {
            await this.updateUnselected(dataType);
        }
    };

    handleGroupChange = async selectedGroupId => {
        let dimensionItems = await apiFetchAlternatives(
            this.state.dataType,
            selectedGroupId
        );

        const augmentFn = dataTypes[this.state.dataType].augmentAlternatives;
        if (augmentFn) {
            dimensionItems = augmentFn(dimensionItems, selectedGroupId);
        }

        const selectedIds = this.props.selectedItems[DX].map(i => i.id);
        const unselectedIds = dimensionItems
            .filter(i => !selectedIds.includes(i.id))
            .map(i => i.id);

        this.setState({
            dimensionItems,
            unselectedIds,
            selectedGroupId,
        });
    };

    selectDataDimensions = selectedIds => {
        const unselectedIds = this.state.unselectedIds.filter(
            id => !selectedIds.includes(id)
        );
        this.setState({ unselectedIds });

        const itemsToAdd = this.state.dimensionItems.filter(di =>
            selectedIds.includes(di.id)
        );
        this.props.addDxItems({
            dimensionType: DX,
            value: itemsToAdd,
        });
    };

    deselectDataDimensions = ids => {
        const unselectedIds = [...new Set([...this.state.unselectedIds, ids])];
        this.setState({ unselectedIds });

        this.props.removeDxItems({
            dimensionType: DX,
            value: ids,
        });
    };

    requestMoreItems = () => {
        console.log('requestMoreItems');
    };

    onUpdateClick = () => {
        this.props.onUpdate(this.props.ui);
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
                        <UnselectedContainer
                            items={unselected}
                            dataType={this.state.dataType}
                            groups={groups}
                            selectedGroupId={this.state.selectedGroupId}
                            onGroupChange={this.handleGroupChange}
                            onDataTypeChange={this.onDataTypeChange}
                            onSelect={this.selectDataDimensions}
                            requestMoreItems={this.requestMoreItems}
                        />
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
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        removeDxItems: acRemoveUiItems,
        addDxItems: acAddUiItems,
        onUpdate: acSetCurrentFromUi,
    }
)(DataDimension);
