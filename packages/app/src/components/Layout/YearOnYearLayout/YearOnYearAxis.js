import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import {
    sGetUiYearOnYearSeries,
    sGetUiYearOnYearCategory,
} from '../../../reducers/ui';
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style';
import YearOnYearAxisStyles from './styles/YearOnYearAxis.style';

const axisLabels = {
    yearOnYearSeries: i18n.t('Series'),
    yearOnYearCategory: i18n.t('Category'),
};

const YearOnYearAxis = props => (
    <div
        id={props.axisName}
        style={{ ...defaultAxisStyles.axisContainer, ...props.style }}
    >
        <div className="label" style={defaultAxisStyles.label}>
            {axisLabels[props.axisName]}
        </div>
        <div
            className="content"
            style={{
                ...defaultAxisStyles.content,
                ...YearOnYearAxisStyles.content,
            }}
        >
            {props.children}
        </div>
    </div>
);

const mapStateToProps = state => ({
    yearOnYearSeries: sGetUiYearOnYearSeries(state),
    yearOnYearCategory: sGetUiYearOnYearCategory(state),
});

export default connect(mapStateToProps)(YearOnYearAxis);
