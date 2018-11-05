import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import {
    sGetUiYearOverYearSeries,
    sGetUiYearOverYearCategory,
} from '../../../reducers/ui';
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style';
import YearOverYearAxisStyles from './styles/YearOverYearAxis.style';

const axisLabels = {
    yearOverYearSeries: i18n.t('Series'),
    yearOverYearCategory: i18n.t('Category'),
};

const YearOverYearAxis = props => (
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
                ...YearOverYearAxisStyles.content,
            }}
        >
            {props.children}
        </div>
    </div>
);

const mapStateToProps = state => ({
    yearOverYearSeries: sGetUiYearOverYearSeries(state),
    yearOverYearCategory: sGetUiYearOverYearCategory(state),
});

export default connect(mapStateToProps)(YearOverYearAxis);
