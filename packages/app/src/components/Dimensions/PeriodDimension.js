import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

import { sGetUiItems, sGetUi } from '../../reducers/ui';
import { acSetCurrentFromUi } from '../../actions/current';
//import { acRemoveUiItems, acAddUiItems } from '../../actions/ui';

const PE = 'pe';

export class PeriodDimension extends Component {
    state = {
        periods: [],
    };

    savePeriods = periods => {
        this.setState({
            periods,
        });
        this.props.toggleDialog(null);
    };

    handleClose = periods => {
        console.log(periods);
        this.savePeriods(periods);
    };

    handlePeriodsSelect = periods => {
        console.log(periods);
    };

    handleUpdate = periods => {
        console.log(periods);
        console.log(this.state.periods);

        const itemsToAdd = periods.map(item => item.id);

        this.props.addPeItems({
            dimensionType: PE,
            value: itemsToAdd,
        });
        this.savePeriods(periods);
    };

    render = () => {
        console.log(this.props.selectedItems);
        return (
            <PeriodSelector
                d2={this.props.d2}
                periods={this.props.selectedItems.pe}
                onPeriodsSelect={this.handlePeriodsSelect}
            />
        );
    };
}

const mapStateToProps = state => ({
    selectedItems: sGetUiItems(state),
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
