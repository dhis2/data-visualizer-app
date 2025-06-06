import {
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_OUTLIER_TABLE,
} from '@dhis2/analytics'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import cloneDeep from 'lodash-es/cloneDeep'
import { DEFAULT_CURRENT } from '../reducers/current.js'
import { DEFAULT_VISUALIZATION } from '../reducers/visualization.js'
import { getOptionNamesByType } from './options/config.js'
import { default as options } from './options.js'

export const visTypes = [
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_OUTLIER_TABLE,
]

export const getVisTypeDescriptions = () => ({
    [VIS_TYPE_PIVOT_TABLE]: i18n.t(
        'View data and indicators in a manipulatable table.'
    ),
    [VIS_TYPE_COLUMN]: i18n.t(
        'Compare sizes of related elements vertically. Recommend period as filter.'
    ),
    [VIS_TYPE_STACKED_COLUMN]: i18n.t(
        'Compare parts of a whole against related elements vertically. Recommend data or org. unit as series.'
    ),
    [VIS_TYPE_BAR]: i18n.t(
        'Compare sizes of related elements horizontally. Recommend period as filter.'
    ),
    [VIS_TYPE_STACKED_BAR]: i18n.t(
        'Compare parts of a whole against related elements horizontally. Recommend data or org. unit as series.'
    ),
    [VIS_TYPE_LINE]: i18n.t(
        'Track or compare changes over time. Recommend period as category.'
    ),
    [VIS_TYPE_AREA]: i18n.t(
        'Track or compare changes over time. Recommend period as category.'
    ),
    [VIS_TYPE_STACKED_AREA]: i18n.t(
        'Track or compare parts of a whole over time. Recommend data as series and period as category.'
    ),
    [VIS_TYPE_PIE]: i18n.t(
        'Compare parts of a whole at a single point in time. Recommend period as filter.'
    ),
    [VIS_TYPE_RADAR]: i18n.t(
        'Compare several items against multiple variables.'
    ),
    [VIS_TYPE_GAUGE]: i18n.t(
        'Compare a percentage indicator against a 100% scale. Recommend period as filter.'
    ),
    [VIS_TYPE_YEAR_OVER_YEAR_LINE]: i18n.t(
        'Compare changes over time between multiple time periods.'
    ),
    [VIS_TYPE_YEAR_OVER_YEAR_COLUMN]: i18n.t(
        'Compare changes over time between multiple time periods.'
    ),
    [VIS_TYPE_SINGLE_VALUE]: i18n.t(
        'Display a single value. Recommend relative period to show latest data.'
    ),
    [VIS_TYPE_SCATTER]: i18n.t(
        'Compare the relationship between two data items across multiple places. Recommended for visualizing outliers.'
    ),
    [VIS_TYPE_OUTLIER_TABLE]: i18n.t(
        'Automatically identify extreme outliers based on historical data.'
    ),
})

export const getSaveableVisualization = (vis) => {
    const visualization = Object.assign({}, vis)
    const nonSavableOptions = Object.keys(options).filter(
        (option) => !options[option].savable
    )

    nonSavableOptions.forEach((option) => delete visualization[option])

    return visualization
}

export const getVisualizationState = (visualization, current) => {
    if (current === DEFAULT_CURRENT) {
        return STATE_EMPTY
    } else if (visualization === DEFAULT_VISUALIZATION) {
        return STATE_UNSAVED
    } else if (current === visualization) {
        return STATE_SAVED
    } else {
        return STATE_DIRTY
    }
}

export const STATE_EMPTY = 'EMPTY'
export const STATE_SAVED = 'SAVED'
export const STATE_UNSAVED = 'UNSAVED'
export const STATE_DIRTY = 'DIRTY'

export const dimensionMetadataProps = [
    'expressionDimensionItem',
    'dataElement',
    'dataElementOperand',
    'reportingRate',
    'programAttribute',
    'programIndicator',
    'indicator',
    'programDataElement',
    'programDataElementOption',
]

// Loop through and collect dimension metadata from the visualization
export const getDimensionMetadataFromVisualization = (visualization) => {
    const metadata = []

    visualization.dataDimensionItems?.forEach((dimensionItem) => {
        Object.entries(dimensionItem)?.forEach(([key, object]) => {
            if (dimensionMetadataProps.includes(key)) {
                // extract option set id so it's saved in the same place as when it's added by the Data dimension modal
                if (key === 'programAttribute') {
                    object.optionSetId = object.attribute?.optionSet?.id
                } else if (key === 'programDataElement') {
                    object.optionSetId = object.dataElement?.optionSet?.id
                }

                metadata.push({ [object.id]: object })
            }
        })
    })

    return metadata
}

export const useVisTypesFilterByVersion = () => {
    const { serverVersion } = useConfig()

    const filterVisTypesByVersion = (visType) =>
        serverVersion.minor < 41 && visType === VIS_TYPE_OUTLIER_TABLE
            ? false
            : true

    return filterVisTypesByVersion
}

export const getVisualizationWithFilteredOptionsByType = (visualization) => {
    const visualizationClone = cloneDeep(visualization)

    if (visualizationClone) {
        const supportedOptions = new Set(
            getOptionNamesByType(visualizationClone.type)
        )
        const unsupportedOptions = Object.keys(options).filter(
            (optionName) => !supportedOptions.has(optionName)
        )

        unsupportedOptions.forEach(
            (optionName) => delete visualizationClone[optionName]
        )
    }

    return visualizationClone
}
