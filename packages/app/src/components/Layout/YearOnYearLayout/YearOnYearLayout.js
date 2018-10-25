import React from 'react';
import { connect } from 'react-redux';

import DefaultAxis from '../DefaultLayout/DefaultAxis';
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style';
import YearOnYearAxis from './YearOnYearAxis';
import YearOnYearSelect from './YearOnYearSelect';
import {
    sGetUiYearOnYearSeries,
    sGetUiYearOnYearCategory,
} from '../../../reducers/ui';
import {
    acSetUiYearOnYearSeries,
    acSetUiYearOnYearCategory,
} from '../../../actions/ui';
import { seriesOptions, categoryOptions } from '../../../yearOnYear';

const Layout = props => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...defaultLayoutStyles.axisGroupLeft,
            }}
        >
            <YearOnYearAxis
                axisName="yearOnYearSeries"
                style={defaultLayoutStyles.columns}
            >
                <YearOnYearSelect
                    value={props.yearOnYearSeries}
                    onChange={props.onSeriesChange}
                    options={seriesOptions}
                />
            </YearOnYearAxis>
            <YearOnYearAxis
                axisName="yearOnYearCategory"
                style={defaultLayoutStyles.rows}
            >
                <YearOnYearSelect
                    value={props.yearOnYearCategory}
                    onChange={props.onCategoryChange}
                    options={categoryOptions}
                />
            </YearOnYearAxis>
        </div>
        <div
            id="axis-group-2"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...defaultLayoutStyles.axisGroupRight,
            }}
        >
            <DefaultAxis
                axisName="filters"
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
);

Layout.displayName = 'Layout';

const mapStateToProps = state => ({
    yearOnYearSeries: sGetUiYearOnYearSeries(state),
    yearOnYearCategory: sGetUiYearOnYearCategory(state),
});

const mapDispatchToProps = dispatch => ({
    onSeriesChange: event => {
        console.log('e.t.v', event.target.value);
        dispatch(acSetUiYearOnYearSeries(event.target.value));
    },
    onCategoryChange: event =>
        dispatch(acSetUiYearOnYearCategory(event.target.value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
