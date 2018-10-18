import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DialogContent, DialogActions } from '@material-ui/core';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { /*sGetUiItems*/ sGetUi } from '../../reducers/ui';
import { sGetMetadata } from '../../reducers/metadata';
import { acSetCurrentFromUi } from '../../actions/current';
import { acRemoveUiItems, acAddUiItems } from '../../actions/ui';
import { acAddMetadata } from '../../actions/metadata';

import { HideButton, UpdateButton } from './DataDimension/buttons';
import { styles } from './styles/PeriodDimension.style';
import { arrayToIdMap } from '../../util';

const PE = 'pe';
const PERIOD = 'PERIOD';
const DIALOG_TITLE = i18n.t('Period');

export class PeriodDimension extends Component {
    onUpdateClick = () => {
        this.props.onUpdate(this.props.ui);
        this.props.toggleDialog(null);
    };

    selectPeriodDimensions = periods => {
        const idsToAdd = periods.map(periodRange => periodRange.id);

        this.props.addPeItems({
            dimensionType: PE,
            value: idsToAdd,
        });

        this.props.addMetaData(arrayToIdMap(periods));
    };

    deselectPeriodDimensions = periods => {
        const idsToRemove = periods.map(periodRange => periodRange.id);

        this.props.removePeItems({
            dimensionType: PE,
            value: idsToRemove,
        });
    };

    getSelectedPeriods = () => {
        return Object.values(this.props.selectedItems)
            .filter(item => item.dimensionItemType === PERIOD)
            .map(item => ({ ...item, id: item.uid }));
    };

    render = () => {
        const selectedPeriods = this.getSelectedPeriods();

        return (
            <div style={styles.container}>
                <DialogContent style={styles.dialogContent}>
                    <h3 style={styles.dialogTitle}>{DIALOG_TITLE}</h3>
                    <PeriodSelector
                        d2={this.props.d2}
                        onSelect={this.selectPeriodDimensions}
                        onDeselect={this.deselectPeriodDimensions}
                        selectedItems={selectedPeriods}
                    />
                </DialogContent>
                <DialogActions style={styles.dialogActions}>
                    <HideButton action={() => this.props.toggleDialog(null)} />
                    <UpdateButton action={this.onUpdateClick} />
                </DialogActions>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    selectedItems: sGetMetadata(state),
    //selectedItems: sGetUiItems(state).pe,
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        addMetaData: acAddMetadata,
        addPeItems: acAddUiItems,
        removePeItems: acRemoveUiItems,
        onUpdate: acSetCurrentFromUi,
    }
)(PeriodDimension);

PeriodDimension.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
};

PeriodDimension.contextTypes = {
    d2: PropTypes.object,
};
