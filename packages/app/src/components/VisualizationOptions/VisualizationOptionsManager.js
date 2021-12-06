import {
    AXIS_ID_COLUMNS,
    hasCustomAxes,
    hasRelativeItems,
    isDualAxisType,
    VisualizationOptions,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getOptionsByType } from '../../modules/options/config.js'
import {
    sGetUiType,
    sGetUiOptions,
    sGetDimensionItemsByAxis,
    sGetUiLayout,
} from '../../reducers/ui.js'
import MenuButton from '../MenuButton/MenuButton.js'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer.js'

const VisualizationOptionsManager = ({
    visualizationType,
    columnDimensionItems,
    columns,
    series,
}) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const onClick = handler => () => {
        handler()
        onClose()
    }

    const onClose = () => {
        toggleVisualizationOptionsDialog()
    }

    const toggleVisualizationOptionsDialog = () => {
        setDialogIsOpen(!dialogIsOpen)
    }

    const filteredSeries = series.filter(seriesItem =>
        columnDimensionItems.some(
            layoutItem => layoutItem === seriesItem.dimensionItem
        )
    )
    const optionsConfig = getOptionsByType(
        visualizationType,
        isDualAxisType(visualizationType) &&
            hasCustomAxes(filteredSeries) &&
            !hasRelativeItems(columns[0], columnDimensionItems),
        series?.length && isDualAxisType(visualizationType)
            ? [...new Set(series.map(serie => serie.axis))].sort(
                  (a, b) => a - b
              )
            : [0]
    )

    return (
        <>
            <MenuButton
                dataTest={'app-menubar-options-button'}
                onClick={toggleVisualizationOptionsDialog}
            >
                {i18n.t('Options')}
            </MenuButton>
            {dialogIsOpen && (
                <UpdateVisualizationContainer
                    renderComponent={handler => (
                        <VisualizationOptions
                            optionsConfig={optionsConfig}
                            onUpdate={onClick(handler)}
                            onClose={onClose}
                        />
                    )}
                />
            )}
        </>
    )
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
