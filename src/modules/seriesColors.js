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
export const PALETTE_BY_AXIS = 'BY_AXIS'

// Palettes offered in "Apply colours" and the picker grid (Patterns is a fill, not a palette)
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
})

// Copy of defaultMultiAxisTheme1 in @dhis2/analytics (not exported)
const AXIS_THEME = {
    0: { start: '#08306b', end: '#c6dbef', main: '#4292c6' },
    1: { start: '#67000d', end: '#fcbba1', main: '#cb181d' },
    2: { start: '#00441b', end: '#c7e9c0', main: '#41ab5d' },
    3: { start: '#3f007d', end: '#dadaeb', main: '#6c66b8' },
}

const normalize = (hex) => hex?.toLowerCase()

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

export const getPaletteColors = (paletteId) =>
    paletteId === COLOR_SET_PATTERNS
        ? colorSets[COLOR_SET_PATTERNS].patterns.map((p) => p.color)
        : (colorSets[paletteId] || colorSets[COLOR_SET_DEFAULT]).colors

export const getNextSeedColor = (paletteId, usedColors = []) => {
    const palette = getPaletteColors(paletteId)
    const used = new Set(usedColors.map(normalize))

    return (
        palette.find((color) => !used.has(normalize(color))) ??
        palette[usedColors.length % palette.length]
    )
}

export const resolveItemColor = (item, getMetadataColor) =>
    item.color === COLOR_AUTO
        ? getMetadataColor(item.dimensionItem)
        : item.color

export const seedSeriesColors = ({ items, paletteId, getMetadataColor }) => {
    // reserve every colour that is or will be shown, so seeds never duplicate it
    const used = items
        .map((item) =>
            item.color
                ? resolveItemColor(item, getMetadataColor)
                : getMetadataColor(item.dimensionItem)
        )
        .filter(Boolean)

    return items.map((item) => {
        if (item.color) {
            return item
        }

        if (getMetadataColor(item.dimensionItem)) {
            return { ...item, color: COLOR_AUTO }
        }

        const color = getNextSeedColor(paletteId, used)
        used.push(color)

        return { ...item, color }
    })
}

export const applyPalette = ({ items, paletteId }) => {
    const palette = getPaletteColors(paletteId)

    return items.map((item, index) => ({
        ...item,
        color: palette[index % palette.length],
    }))
}

export const applyAxisPalette = ({ items }) => {
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
        const color =
            counts[axis] === 1
                ? theme.main
                : interpolateColors(theme.start, theme.end, counts[axis])[
                      position
                  ]

        return { ...item, color }
    })
}

export const resetToAuto = ({ items, paletteId, getMetadataColor }) =>
    seedSeriesColors({
        // eslint-disable-next-line no-unused-vars
        items: items.map(({ color, ...rest }) => rest),
        paletteId,
        getMetadataColor,
    })

// Old saved charts: freeze what analytics rendered so nothing visibly changes
export const seedLegacyColors = ({ items, colorSet }) => {
    if (hasCustomAxes(items)) {
        return {
            items: applyAxisPalette({ items }),
            colorSeed: COLOR_SET_DEFAULT,
            fillType: FILL_TYPE_SOLID,
        }
    }

    const isPatterns = colorSet === COLOR_SET_PATTERNS

    return {
        items: applyPalette({
            items,
            paletteId: colorSet || COLOR_SET_DEFAULT,
        }),
        colorSeed: isPatterns
            ? COLOR_SET_DEFAULT
            : colorSet || COLOR_SET_DEFAULT,
        fillType: isPatterns ? FILL_TYPE_PATTERN : FILL_TYPE_SOLID,
    }
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
