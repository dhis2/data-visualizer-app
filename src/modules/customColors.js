import { colorSets, COLOR_SET_DEFAULT } from '@dhis2/analytics'
import {
    COLOR_SET_CUSTOM,
    OPTION_COLOR_SET,
    OPTION_CUSTOM_COLORS,
} from './options.js'

export const CUSTOM_COLOR_SLOTS = 12

const getSetColors = (id) =>
    colorSets[id]?.colors || colorSets[id]?.patterns?.map(({ color }) => color)

// Start the slots from the set the chart was using, so nothing changes until edited
export const getInitialCustomColors = (previousSet) => {
    const colors = getSetColors(previousSet) || getSetColors(COLOR_SET_DEFAULT)
    return Array.from(
        { length: CUSTOM_COLOR_SLOTS },
        (_, i) => colors[i % colors.length]
    )
}

// Setting one series' colour switches the chart to the custom set if needed
export const getOptionsWithSlotColor = (uiOptions, index, color) => {
    const colors =
        uiOptions[OPTION_COLOR_SET] === COLOR_SET_CUSTOM &&
        uiOptions[OPTION_CUSTOM_COLORS]
            ? uiOptions[OPTION_CUSTOM_COLORS]
            : getInitialCustomColors(uiOptions[OPTION_COLOR_SET])

    return {
        [OPTION_COLOR_SET]: COLOR_SET_CUSTOM,
        [OPTION_CUSTOM_COLORS]: colors.map((c, i) =>
            i === index % CUSTOM_COLOR_SLOTS ? color : c
        ),
    }
}
