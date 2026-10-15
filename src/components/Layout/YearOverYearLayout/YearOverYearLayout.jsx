import {
    AXIS_ID_FILTERS,
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
    acSetUiYearOverYearSeries,
    acSetUiYearOverYearCategory,
} from '../../../actions/ui.js'
import {
    seriesOptions,
    categoryOptions,
} from '../../../modules/yearOverYear.js'
import {
    sGetUiYearOverYearSeries,
    sGetUiYearOverYearCategory,
} from '../../../reducers/ui.js'
import DefaultAxis from '../DefaultLayout/DefaultAxis.jsx'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style.js'
import YearOverYearAxis from './YearOverYearAxis.jsx'
import YearOverYearSelect from './YearOverYearSelect.jsx'

const Layout = (props) => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <YearOverYearAxis
            axisId={AXIS_ID_COLUMNS}
            style={defaultLayoutStyles.firstAxis}
        >
            <YearOverYearSelect
                multiple="true"
                value={props.yearOverYearSeries}
                onChange={props.onSeriesChange}
                options={seriesOptions}
                dataTest={`yoy-layout-${AXIS_ID_COLUMNS}-select`}
            />
        </YearOverYearAxis>
        <YearOverYearAxis
            axisId={AXIS_ID_ROWS}
            style={defaultLayoutStyles.axis}
        >
            <YearOverYearSelect
                value={props.yearOverYearCategory[0]}
                onChange={props.onCategoryChange}
                options={categoryOptions}
                dataTest={`yoy-layout-${AXIS_ID_ROWS}-select`}
            />
        </YearOverYearAxis>
        <DefaultAxis
            axisId={AXIS_ID_FILTERS}
            style={defaultLayoutStyles.axis}
        />
    </div>
)

Layout.displayName = 'Layout'

Layout.propTypes = {
    yearOverYearCategory: PropTypes.array,
    yearOverYearSeries: PropTypes.array,
    onCategoryChange: PropTypes.func,
    onSeriesChange: PropTypes.func,
}

const mapStateToProps = (state) => ({
    yearOverYearSeries: sGetUiYearOverYearSeries(state),
    yearOverYearCategory: sGetUiYearOverYearCategory(state),
})

const mapDispatchToProps = (dispatch) => ({
    onSeriesChange: ({ selected }) => {
        dispatch(acSetUiYearOverYearSeries(selected))
    },
    onCategoryChange: ({ selected }) => {
        dispatch(acSetUiYearOverYearCategory(selected))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
