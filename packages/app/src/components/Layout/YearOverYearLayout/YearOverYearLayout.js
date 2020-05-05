import React from 'react'
import { connect } from 'react-redux'
import {
    AXIS_ID_FILTERS,
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'

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
                axisId={AXIS_ID_COLUMNS}
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
                axisId={AXIS_ID_ROWS}
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

Layout.propTypes = {
    yearOverYearCategory: PropTypes.array,
    yearOverYearSeries: PropTypes.array,
    onCategoryChange: PropTypes.func,
    onSeriesChange: PropTypes.func,
}

const mapStateToProps = state => ({
    yearOverYearSeries: sGetUiYearOverYearSeries(state),
    yearOverYearCategory: sGetUiYearOverYearCategory(state),
})

const mapDispatchToProps = dispatch => ({
    onSeriesChange: ({ selected }) => {
        dispatch(
            acSetUiYearOverYearSeries(
                selected?.length ? selected.map(({ value }) => value) : null
            )
        )
    },
    onCategoryChange: ({ selected }) => {
        if (selected?.value) {
            dispatch(acSetUiYearOverYearCategory(selected.value))
        }
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
