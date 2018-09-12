import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';

export class OrgUnitDimension extends Component {
    state = {};

    render = () => {
        return <h3>{i18n.t('OrgUnit Dimension')}</h3>;
    };
}

export default OrgUnitDimension;
