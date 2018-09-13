import React, { Component } from 'react';
import PeriodSelectorDialog from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';

export class PeriodDimension extends Component {
    render = () => {
        return (
            <PeriodSelectorDialog
                open={false}
                onClose={() => console.log('closing period')}
                onUpdate={() =>
                    console.log('Period selector received argument')
                }
                d2={console.log('Period selector missing argument')}
            />
        );
    };
}

export default PeriodDimension;
