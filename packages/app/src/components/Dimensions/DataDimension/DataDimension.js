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
        unSelected: [],
    };

    handleChangedGroup = items => {
        const selectedIds = this.props.selectedItems[DX].map(i => i.id);
        const unSelected = items.filter(i => !selectedIds.includes(i.id));

        this.setState({ unSelected });
    };

    selectDataDimensions = ids => {
        const itemsToAdd = this.state.unSelected.filter(i =>
            ids.includes(i.id)
        );

        const unSelected = this.state.unSelected.filter(
            i => !ids.includes(i.id)
        );

        this.props.addDxItems({
            dimensionType: DX,
            value: itemsToAdd,
        });

        this.setState({ unSelected });
    };

    deselectDataDimensions = ids => {
        this.props.removeDxItems({ dimensionType: DX, value: ids });
    };

    onUpdateClick = () => {
        this.props.onUpdate(this.props.ui);
    };

    render = () => {
        return (
            <div style={style.container}>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{i18n.t('Data')}</h3>
                    <div style={style.subContainer}>
                        <UnselectedContainer
                            items={this.state.unSelected}
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
