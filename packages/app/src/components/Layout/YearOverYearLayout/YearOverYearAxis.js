import React from 'react';
import { connect } from 'react-redux';
import { getAxisDisplayName } from '@dhis2/analytics';

import {
    sGetUiYearOverYearSeries,
    sGetUiYearOverYearCategory,
} from '../../../reducers/ui';
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style';
import YearOverYearAxisStyles from './styles/YearOverYearAxis.style';

const YearOverYearAxis = props => (
    <div
        id={props.axisName}
        style={{ ...defaultAxisStyles.axisContainer, ...props.style }}
    >
        <div className="label" style={defaultAxisStyles.label}>
            {getAxisDisplayName(props.axisName)}
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
