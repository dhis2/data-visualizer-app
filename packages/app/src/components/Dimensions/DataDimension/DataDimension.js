import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DialogActions, DialogContent } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';

import UnselectedContainer from './UnselectedContainer';
import SelectedItems from './SelectedItems';
import { HideButton, UpdateButton } from './buttons';

import { sGetUiItems, sGetUi } from '../../../reducers/ui';
import { acSetCurrentFromUi } from '../../../actions/current';
import { acRemoveUiItems, acAddUiItems } from '../../../actions/ui';
import { colors } from '../../../colors';

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
        dimensionItems: [],
        unselectedIds: [],
    };

    handleChangedGroup = dimensionItems => {
        const selectedIds = this.props.selectedItems[DX].map(i => i.id);
        const unselectedIds = dimensionItems
            .filter(i => !selectedIds.includes(i.id))
            .map(i => i.id);

        this.setState({ dimensionItems, unselectedIds });
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

        this.props.removeDxItems({ dimensionType: DX, value: ids });
    };

    onUpdateClick = () => {
        this.props.onUpdate(this.props.ui);
    };

    render = () => {
        const unselected = this.state.dimensionItems.filter(di =>
            this.state.unselectedIds.includes(di.id)
        );

        return (
            <div style={style.container}>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{i18n.t('Data')}</h3>
                    <div style={style.subContainer}>
                        <UnselectedContainer
                            items={unselected}
                            onGroupChange={this.handleChangedGroup}
                            onSelect={this.selectDataDimensions}
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
    setDimension: PropTypes.func.isRequired,
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
