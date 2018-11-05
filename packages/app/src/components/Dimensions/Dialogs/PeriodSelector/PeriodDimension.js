import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { sGetUi, sGetUiLayout } from '../../../../reducers/ui';
import { sGetMetadata } from '../../../../reducers/metadata';
import { acRemoveUiItems, acAddUiItems } from '../../../../actions/ui';
import { acAddMetadata } from '../../../../actions/metadata';
import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

const dimensionTypes = [dxId, peId, ouId];

export class PeriodDimension extends Component {
    getDimensionType = () => {
        const { selectedLayout } = this.props;

        const currentLayout = Object.values(selectedLayout);
        const axisKey = currentLayout.findIndex(ids => ids.includes(peId));

        const dimensionType = axisKey > -1 ? dimensionTypes[axisKey] : peId;

        return dimensionType;
    };

    selectPeriodDimensions = periods => {
        const idsToAdd = periods.map(periodRange => periodRange.id);
        const dimensionType = this.getDimensionType();

        this.props.addUiItems({
            dimensionType,
            value: idsToAdd,
        });

        const arrToId = periods.reduce((obj, item) => {
            obj[item.id] = {
                ...item,
                dimensionItemType: peId,
                dimensionId: peId,
            };
            return obj;
        }, {});

        this.props.addMetadata(arrToId);
    };

    deselectPeriodDimensions = periods => {
        const idsToRemove = periods.map(periodRange => periodRange.id);
        const dimensionType = this.getDimensionType();

        this.props.removeUiItems({
            dimensionType,
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
    selectedLayout: sGetUiLayout(state),
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
