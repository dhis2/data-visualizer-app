import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { sGetUi } from '../../reducers/ui';
import { sGetMetadata } from '../../reducers/metadata';
import { acSetCurrentFromUi } from '../../actions/current';
import { acRemoveUiItems, acAddUiItems } from '../../actions/ui';
import { acAddMetadata } from '../../actions/metadata';

import { HideButton, UpdateButton } from './DataDimension/buttons';
import { styles } from './styles/PeriodDimension.style';

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

        const arrToId = periods.reduce((obj, item) => {
            obj[item.id] = { ...item, dimensionItemType: PERIOD };
            return obj;
        }, {});

        this.props.addMetaData(arrToId);
    };

    deselectPeriodDimensions = periods => {
        const idsToRemove = periods.map(periodRange => periodRange.id);

        this.props.removePeItems({
            dimensionType: PE,
            value: idsToRemove,
        });
    };

    getSelectedPeriods = () => {
        return this.props.ui.itemsByDimension[PE].map(item => ({
            id: item,
            name: this.props.metadata[item].name,
        }));
    };

    render = () => {
        const selectedPeriods = this.getSelectedPeriods();

        return (
            <div style={styles.container}>
                <DialogContent style={styles.dialogContent}>
                    <h3 style={styles.dialogTitle}>{DIALOG_TITLE}</h3>
                    <PeriodSelector
                        d2={this.context.d2}
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
    metadata: sGetMetadata(state),
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
    selectedItems: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

PeriodDimension.contextTypes = {
    d2: PropTypes.object,
};
