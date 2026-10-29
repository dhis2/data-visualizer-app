import {
    ALL_DYNAMIC_DIMENSION_ITEMS,
    colorSets,
    COLOR_SET_BASIC,
    COLOR_SET_BRIGHT,
    COLOR_SET_COLOR_BLIND,
    COLOR_SET_DARK,
    COLOR_SET_DEFAULT,
    COLOR_SET_EXTENDED,
    COLOR_SET_GRAY,
    COLOR_SET_PATTERNS,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    hasCustomAxes,
    hasRelativeItems,
    isYearOverYear,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { FILL_TYPE_PATTERN, FILL_TYPE_SOLID } from './options.js'

export const COLOR_AUTO = 'AUTO'
// Override meaning "use the chart palette colour at my position", even if an item colour exists
export const COLOR_PALETTE = 'PALETTE'
export const PALETTE_BY_AXIS = 'BY_AXIS'

export const COLOR_MODE_PALETTE = 'PALETTE'
export const COLOR_MODE_SINGLE = 'SINGLE'

export const COLOR_SOURCE_PALETTE = 'PALETTE'
export const COLOR_SOURCE_SINGLE = 'SINGLE'
export const COLOR_SOURCE_AUTO = 'AUTO'
export const COLOR_SOURCE_CUSTOM = 'CUSTOM'

export const DEFAULT_SINGLE_COLOR = colorSets[COLOR_SET_DEFAULT].colors[0]

// Palettes offered in the Palette select and the picker grid (Patterns is a fill, not a palette)
export const PALETTE_IDS = [
    COLOR_SET_DEFAULT,
    COLOR_SET_BASIC,
    COLOR_SET_EXTENDED,
    COLOR_SET_BRIGHT,
    COLOR_SET_DARK,
    COLOR_SET_GRAY,
    COLOR_SET_COLOR_BLIND,
]

export const getPaletteLabels = () => ({
    [COLOR_SET_DEFAULT]: i18n.t('Default'),
    [COLOR_SET_BASIC]: i18n.t('Basic'),
    [COLOR_SET_EXTENDED]: i18n.t('Extended'),
    [COLOR_SET_BRIGHT]: i18n.t('Bright'),
    [COLOR_SET_DARK]: i18n.t('Dark'),
    [COLOR_SET_GRAY]: i18n.t('Gray'),
    [COLOR_SET_COLOR_BLIND]: i18n.t('Color blind'),
    [PALETTE_BY_AXIS]: i18n.t('By axis'),
})

// Copy of defaultMultiAxisTheme1 in @dhis2/analytics (not exported)
const AXIS_THEME = {
    0: { start: '#08306b', end: '#c6dbef', main: '#4292c6' },
    1: { start: '#67000d', end: '#fcbba1', main: '#cb181d' },
    2: { start: '#00441b', end: '#c7e9c0', main: '#41ab5d' },
    3: { start: '#3f007d', end: '#dadaeb', main: '#6c66b8' },
}

const hexToRgb = (hex) =>
    [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

const rgbToHex = (rgb) =>
    '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

const interpolateColors = (start, end, steps) => {
    const [from, to] = [hexToRgb(start), hexToRgb(end)]

    return Array.from({ length: steps }, (_, i) => {
        const t = steps === 1 ? 0 : i / (steps - 1)
        return rgbToHex(from.map((v, k) => v + (to[k] - v) * t))
    })
}

// Colours shown in the palette preview strip; By axis shows each axis' main colour
export const getPalettePreviewColors = (paletteId) =>
    paletteId === PALETTE_BY_AXIS
        ? Object.values(AXIS_THEME).map(({ main }) => main)
        : getPaletteColors(paletteId)

export const getPaletteColors = (paletteId) =>
    paletteId === COLOR_SET_PATTERNS
        ? colorSets[COLOR_SET_PATTERNS].patterns.map((p) => p.color)
        : (colorSets[paletteId] || colorSets[COLOR_SET_DEFAULT]).colors

export const getDefaultColors = ({
    items,
    colorMode,
    colorPalette,
    singleColor,
}) => {
    if (colorMode === COLOR_MODE_SINGLE) {
        return items.map(() => singleColor || DEFAULT_SINGLE_COLOR)
    }

    if (colorPalette === PALETTE_BY_AXIS) {
        return getAxisColors(items)
    }

    const palette = getPaletteColors(colorPalette)

    return items.map((_, index) => palette[index % palette.length])
}

// Precedence: override (hex, Auto or Palette) > metadata colour (palette + useItemColors) > chart default by position
export const resolveSeriesColors = ({
    items,
    colorMode = COLOR_MODE_PALETTE,
    colorPalette = COLOR_SET_DEFAULT,
    singleColor,
    useItemColors = false,
    getMetadataColor,
}) => {
    const defaults = getDefaultColors({
        items,
        colorMode,
        colorPalette,
        singleColor,
    })
    const defaultSource =
        colorMode === COLOR_MODE_SINGLE
            ? COLOR_SOURCE_SINGLE
            : COLOR_SOURCE_PALETTE

    return items.map((item, index) => {
        const metadataColor = getMetadataColor(item.dimensionItem)

        if (item.color === COLOR_AUTO && metadataColor) {
            return {
                color: metadataColor,
                source: COLOR_SOURCE_AUTO,
                isOverride: true,
            }
        }

        if (item.color === COLOR_PALETTE && colorMode === COLOR_MODE_PALETTE) {
            return {
                color: defaults[index],
                source: COLOR_SOURCE_PALETTE,
                isOverride: true,
            }
        }

        if (
            item.color &&
            item.color !== COLOR_AUTO &&
            item.color !== COLOR_PALETTE
        ) {
            return {
                color: item.color,
                source: COLOR_SOURCE_CUSTOM,
                isOverride: true,
            }
        }

        if (
            useItemColors &&
            colorMode === COLOR_MODE_PALETTE &&
            metadataColor
        ) {
            return {
                color: metadataColor,
                source: COLOR_SOURCE_AUTO,
                isOverride: false,
            }
        }

        return {
            color: defaults[index],
            source: defaultSource,
            isOverride: false,
        }
    })
}

// New charts get item colours; saved charts keep what analytics drew for them
export const getInitialColourOptions = ({ colorSet, series = [], isSaved }) => {
    if (!isSaved) {
        return {
            colorMode: COLOR_MODE_PALETTE,
            colorPalette: COLOR_SET_DEFAULT,
            useItemColors: true,
            fillType: FILL_TYPE_SOLID,
        }
    }

    const isPatterns = colorSet === COLOR_SET_PATTERNS

    return {
        colorMode: COLOR_MODE_PALETTE,
        colorPalette: hasCustomAxes(series)
            ? PALETTE_BY_AXIS
            : isPatterns || !colorSet
            ? COLOR_SET_DEFAULT
            : colorSet,
        useItemColors: false,
        fillType: isPatterns ? FILL_TYPE_PATTERN : FILL_TYPE_SOLID,
    }
}

export const getAxisColors = (items) => {
    const counts = items.reduce((map, item) => {
        const axis = item.axis ?? 0
        map[axis] = (map[axis] || 0) + 1
        return map
    }, {})
    const positions = {}

    return items.map((item) => {
        const axis = item.axis ?? 0
        const theme = AXIS_THEME[axis] ?? AXIS_THEME[0]
        const position = (positions[axis] = (positions[axis] ?? -1) + 1)

        return counts[axis] === 1
            ? theme.main
            : interpolateColors(theme.start, theme.end, counts[axis])[position]
    })
}

export const mergeSeriesItems = (layoutItems, optionItems = []) =>
    layoutItems.map((layoutItem) => {
        const optionItem = optionItems.find(
            (item) => item.dimensionItem === layoutItem.dimensionItem
        )

        return optionItem
            ? { ...optionItem, name: layoutItem.name }
            : layoutItem
    })

export const isLegendMode = (legend = {}) =>
    !(
        (!legend.strategy ||
            legend.strategy === LEGEND_DISPLAY_STRATEGY_FIXED) &&
        !legend.set
    )

export const isPositionalSeries = ({ type, dimensionId, itemIds = [] }) =>
    isYearOverYear(type) ||
    itemIds.includes(ALL_DYNAMIC_DIMENSION_ITEMS) ||
    hasRelativeItems(dimensionId, itemIds)
