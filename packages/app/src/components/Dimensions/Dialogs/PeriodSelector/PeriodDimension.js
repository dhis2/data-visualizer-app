import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { sGetUi } from '../../../../reducers/ui';
import { sGetMetadata } from '../../../../reducers/metadata';
import { acRemoveUiItems, acAddUiItems } from '../../../../actions/ui';
import { acAddMetadata } from '../../../../actions/metadata';
import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

const PERIOD = 'PERIOD';

export class PeriodDimension extends Component {
    selectPeriodDimensions = periods => {
        const idsToAdd = periods.map(periodRange => periodRange.id);

        this.props.addUiItems({
            dimensionType: peId,
            value: idsToAdd,
        });

        const arrToId = periods.reduce((obj, item) => {
            obj[item.id] = { ...item, dimensionItemType: PERIOD };
            return obj;
        }, {});

        this.props.addMetadata(arrToId);
    };

    deselectPeriodDimensions = periods => {
        const idsToRemove = periods.map(periodRange => periodRange.id);

        this.props.removeUiItems({
            dimensionType: peId,
            value: idsToRemove,
        });
    };

    getSelectedPeriods = () => {
        return this.props.ui.itemsByDimension[peId].map(item => ({
            id: item,
            name: this.props.metadata[item].name,
        }));
    };

    render = () => {
        const selectedPeriods = this.getSelectedPeriods();

        return (
            <Fragment>
                <DialogTitle> {i18n.t('Period')}</DialogTitle>
                <DialogContent>
                    <PeriodSelector
                        d2={this.context.d2}
                        onSelect={this.selectPeriodDimensions}
                        onDeselect={this.deselectPeriodDimensions}
                        selectedItems={selectedPeriods}
                    />
                </DialogContent>
            </Fragment>
        );
    };
}

PeriodDimension.propTypes = {
    ui: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    addMetadata: PropTypes.func.isRequired,
    addUiItems: PropTypes.func.isRequired,
    removeUiItems: PropTypes.func.isRequired,
};

PeriodDimension.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    metadata: sGetMetadata(state),
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        addMetadata: acAddMetadata,
        addUiItems: acAddUiItems,
        removeUiItems: acRemoveUiItems,
    }
)(PeriodDimension);
