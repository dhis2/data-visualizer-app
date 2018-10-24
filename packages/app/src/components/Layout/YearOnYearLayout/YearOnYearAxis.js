import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import { sGetUiLayout } from '../../../reducers/ui';
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style';
// import { styles } from './styles/YearOnYearAxis.style';

// const styles = {};

const axisLabels = {
    columns: i18n.t('Yearly series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
};

const YearOnYearAxis = ({ axisName, style }) => (
    <div id={axisName} style={{ ...defaultAxisStyles.axisContainer, ...style }}>
        <div style={defaultAxisStyles.label}>{axisLabels[axisName]}</div>
        <div style={defaultAxisStyles.content}>Dropdown</div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    axis: sGetUiLayout(state)[ownProps.axisName],
});

export default connect(mapStateToProps)(YearOnYearAxis);
