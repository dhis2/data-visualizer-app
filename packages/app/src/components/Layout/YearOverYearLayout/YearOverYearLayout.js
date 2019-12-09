import React from 'react'
import { connect } from 'react-redux'
import { AXIS_ID_FILTERS } from '@dhis2/analytics'

import DefaultAxis from '../DefaultLayout/DefaultAxis'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style'
import YearOverYearAxis from './YearOverYearAxis'
import YearOverYearSelect from './YearOverYearSelect'
import YearOverYearLayoutStyles from './styles/YearOverYearLayout.style'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style'
import {
    sGetUiYearOverYearSeries,
    sGetUiYearOverYearCategory,
} from '../../../reducers/ui'
import {
    acSetUiYearOverYearSeries,
    acSetUiYearOverYearCategory,
} from '../../../actions/ui'
import { seriesOptions, categoryOptions } from '../../../modules/yearOverYear'

const Layout = props => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...YearOverYearLayoutStyles.axisGroupLeft,
            }}
        >
            <YearOverYearAxis
                axisId="yearOverYearSeries"
                style={{
                    ...defaultLayoutStyles.columns,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            >
                <YearOverYearSelect
                    multiple="true"
                    value={props.yearOverYearSeries}
                    onChange={props.onSeriesChange}
                    options={seriesOptions}
                />
            </YearOverYearAxis>
            <YearOverYearAxis
                axisId="yearOverYearCategory"
                style={{
                    ...defaultLayoutStyles.rows,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            >
                <YearOverYearSelect
                    value={props.yearOverYearCategory[0]}
                    onChange={props.onCategoryChange}
                    options={categoryOptions}
                />
            </YearOverYearAxis>
        </div>
        <div
            id="axis-group-2"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...YearOverYearLayoutStyles.axisGroupRight,
            }}
        >
            <DefaultAxis
                axisId={AXIS_ID_FILTERS}
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
)

Layout.displayName = 'Layout'

const mapStateToProps = state => ({
    yearOverYearSeries: sGetUiYearOverYearSeries(state),
    yearOverYearCategory: sGetUiYearOverYearCategory(state),
})

const mapDispatchToProps = dispatch => ({
    onSeriesChange: event => {
        if (event.target.value.length) {
            dispatch(acSetUiYearOverYearSeries(event.target.value))
        }
    },
    onCategoryChange: event =>
        dispatch(acSetUiYearOverYearCategory(event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
