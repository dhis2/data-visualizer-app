import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    hasCustomAxes,
    hasRelativeItems,
    isDualAxisType,
    VIS_TYPE_PIVOT_TABLE,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { OptionsIcon } from '../../assets/OptionsIcon.jsx'
import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { getOptionsByType } from '../../modules/options/config.js'
import {
    sGetUiType,
    sGetUiOptions,
    sGetDimensionItemsByAxis,
    sGetUiLayout,
} from '../../reducers/ui.js'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer.js'
import { OptionsPopover } from './OptionsPopover.jsx'
import optionsStyles from './VisualizationOptionsManager.module.css'

const VisualizationOptionsManager = ({
    visualizationType,
    columnDimensionItems,
    rowDimensionItems,
    columns,
    series,
    cumulativeValues,
}) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const wrapperRef = useRef(null)

    const handleClose = useCallback(() => setPopoverOpen(false), [])

    useEffect(() => {
        if (!popoverOpen) return
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setPopoverOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [popoverOpen])

    const filteredSeries = series.filter((seriesItem) =>
        columnDimensionItems.some(
            (layoutItem) => layoutItem === seriesItem.dimensionItem
        )
    )
    const optionsConfig = getOptionsByType({
        type: visualizationType,
        hasDisabledSections:
            isDualAxisType(visualizationType) &&
            hasCustomAxes(filteredSeries) &&
            !hasRelativeItems(columns[0], columnDimensionItems),
        rangeAxisIds:
            series?.length && isDualAxisType(visualizationType)
                ? [...new Set(series.map((serie) => serie.axis))].sort(
                      (a, b) => a - b
                  )
                : [0],
        hasDimensionItemsInColumns: Boolean(columnDimensionItems.length),
        hasDimensionItemsInRows: Boolean(rowDimensionItems.length),
        hasCumulativeValuesInPt:
            visualizationType === VIS_TYPE_PIVOT_TABLE && cumulativeValues,
    })

    return (
        <div className={optionsStyles.wrapper} ref={wrapperRef}>
            <button
                className={optionsStyles.optionsButton}
                onClick={() => setPopoverOpen((prev) => !prev)}
                data-test="app-menubar-options-button"
            >
                <OptionsIcon />
                {i18n.t('Options')}
            </button>
            {popoverOpen && (
                <UpdateVisualizationContainer
                    renderComponent={(handler) => (
                        <OptionsPopover
                            optionsConfig={optionsConfig}
                            onUpdate={() => {
                                handler()
                                setPopoverOpen(false)
                            }}
                            onClose={handleClose}
                        />
                    )}
                />
            )}
        </div>
    )
}

VisualizationOptionsManager.propTypes = {
    visualizationType: PropTypes.string.isRequired,
    columnDimensionItems: PropTypes.array,
    columns: PropTypes.array,
    cumulativeValues: PropTypes.bool,
    rowDimensionItems: PropTypes.array,
    series: PropTypes.array,
}

const mapStateToProps = (state) => ({
    visualizationType: sGetUiType(state),
    columnDimensionItems: sGetDimensionItemsByAxis(state, AXIS_ID_COLUMNS),
    rowDimensionItems: sGetDimensionItemsByAxis(state, AXIS_ID_ROWS),
    series: sGetUiOptions(state).series,
    columns: sGetUiLayout(state).columns,
    cumulativeValues: sGetUiOptions(state).cumulativeValues,
})

export default connect(mapStateToProps)(VisualizationOptionsManager)
