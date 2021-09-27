import {
    AXIS_ID_COLUMNS,
    hasCustomAxes,
    hasRelativeItems,
    isDualAxisType,
    VisualizationOptionsManager as VOM,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOptionsByType } from '../../modules/options/config'
import {
    sGetUiType,
    sGetUiOptions,
    sGetDimensionItemsByAxis,
    sGetUiLayout,
} from '../../reducers/ui'

class VisualizationOptionsManager extends Component {
    filteredSeries = this.props.series.filter(seriesItem =>
        this.props.columnDimensionItems.some(
            layoutItem => layoutItem === seriesItem.dimensionItem
        )
    )
    optionsConfig = getOptionsByType(
        this.props.visualizationType,
        isDualAxisType(this.props.visualizationType) &&
            hasCustomAxes(this.filteredSeries) &&
            !hasRelativeItems(
                this.props.columns[0],
                this.props.columnDimensionItems
            ),
        this.props.series?.length &&
            isDualAxisType(this.props.visualizationType)
            ? [...new Set(this.props.series.map(serie => serie.axis))].sort(
                  (a, b) => a - b
              )
            : [0]
    )

    render() {
        return <VOM optionsConfig={this.optionsConfig} />
    }
}

VisualizationOptionsManager.propTypes = {
    visualizationType: PropTypes.string.isRequired,
    columnDimensionItems: PropTypes.array,
    columns: PropTypes.array,
    series: PropTypes.array,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    columnDimensionItems: sGetDimensionItemsByAxis(state, AXIS_ID_COLUMNS),
    series: sGetUiOptions(state).series,
    columns: sGetUiLayout(state).columns,
})

export default connect(mapStateToProps)(VisualizationOptionsManager)
