import {
    getAxisNameByLayoutType,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
    sGetUiYearOverYearSeries,
    sGetUiYearOverYearCategory,
} from '../../../reducers/ui.js'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style.js'
import YearOverYearAxisStyles from './styles/YearOverYearAxis.style.js'

const YearOverYearAxis = props => (
    <div
        id={props.axisId}
        data-test={`${props.axisId}-axis`}
        style={{ ...defaultAxisStyles.axisContainer, ...props.style }}
    >
        <div className="label" style={defaultAxisStyles.label}>
            {getAxisNameByLayoutType(props.axisId, LAYOUT_TYPE_YEAR_OVER_YEAR)}
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
)

YearOverYearAxis.propTypes = {
    axisId: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
}

const mapStateToProps = state => ({
    yearOverYearSeries: sGetUiYearOverYearSeries(state),
    yearOverYearCategory: sGetUiYearOverYearCategory(state),
})

export default connect(mapStateToProps)(YearOverYearAxis)
