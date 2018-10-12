import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import PeriodSelectorDialog from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { sGetUiItems, sGetUi } from '../../reducers/ui';
import { acSetCurrentFromUi } from '../../actions/current';
//import { acRemoveUiItems, acAddUiItems } from '../../actions/ui';

import { colors } from '../../colors';

const PE = 'pe';
const DIALOG_TITLE = i18n.t('Period');
const Hide = i18n.t('Hide');
const Update = i18n.t('Update');

const style = {
    container: {
        maxHeight: 677,
        width: 795,
        overflow: 'hidden',
    },
    updateButton: {
        //redundant
        marginLeft: 10,
        marginRight: 24,
        backgroundColor: colors.blue,
    },
    updateText: {
        color: colors.white,
        fontSize: 13,
        letterSpacing: 0.46,
    },
};

export const HideButton = ({ action }) => {
    return (
        <Button onClick={action}>
            <span style={style.hideText}>{Hide}</span>
        </Button>
    );
};

export const UpdateButton = ({ action }) => {
    return (
        <Button
            variant={'outlined'}
            style={style.updateButton}
            onClick={action}
        >
            <span style={style.updateText}>{Update}</span>
        </Button>
    );
};

export class PeriodDimension extends Component {
    state = {
        periods: [],
    };

    handleClose = periods => {
        console.log(periods);
        this.props.toggleDialog(null);
    };

    handleUpdate = periods => {
        console.log(periods);

        this.props.onUpdate(this.props.ui);
        this.handleClose(null);
    };

    selectPeriodDimensions = selectedIds => {
        console.log(selectedIds);
        /*this.props.addPeItems({
            dimensionType: PE,
            value: selectedIds,
        });*/
    };

    deselectPeriodDimensions = selectedIds => {
        console.log(selectedIds);
        /*this.props.removePeItems({
            dimensionType: PE,
            value: selectedIds,
        });*/
    };

    render = () => {
        console.log(this.props.selectedItems);
        return (
            <PeriodSelectorDialog
                open={this.props.dialogIsOpen}
                onClose={this.handleClose}
                onUpdate={this.handleUpdate}
                d2={this.props.d2}
                periods={this.props.selectedItems}
            />
            /*<div style={style.container}>
                <DialogContent>
                    <h3>{DIALOG_TITLE}</h3>
                    <PeriodSelector
                        d2={this.props.d2}
                        periods={this.props.selectedItems.pe}
                        onSelect={this.selectPeriodDimensions}
                        onDeselect={this.deselectPeriodDimensions}
                    />
                </DialogContent>
                <DialogActions>
                    <HideButton action={this.handleClose}>{Hide}</HideButton>
                    <UpdateButton action={this.handleUpdate}>
                        {Update}
                    </UpdateButton>
                </DialogActions>
            </div>*/
        );
    };
}

const mapStateToProps = state => ({
    selectedItems: sGetUiItems(state).pe,
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        //addPeItems: acAddUiItems,
        //removePeItems: acRemoveUiItems,
        onUpdate: acSetCurrentFromUi,
    }
)(PeriodDimension);
