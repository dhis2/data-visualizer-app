import {
    colorSets,
    COLOR_SET_DEFAULT,
    COLOR_SET_PATTERNS,
    isLegendSetType,
    VIS_TYPE_GAUGE,
    VIS_TYPE_OUTLIER_TABLE,
    VIS_TYPE_PIE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_SINGLE_VALUE,
} from '@dhis2/analytics'
import { getMetadataColor as getMockMetadataColor } from './mockMetadataColors.js'
import { FILL_TYPE_PATTERN } from './options.js'
import {
    getNextSeedColor,
    getPaletteColors,
    isLegendMode,
    isPositionalSeries,
    resolveItemColor,
    seedSeriesColors,
} from './seriesColors.js'

const PATTERNS = colorSets[COLOR_SET_PATTERNS].patterns
const LINE_SERIES_TYPES = ['line', 'spline']
// Types without the Legend & Colours static mode keep analytics colours
const UNSUPPORTED_TYPES = [
    VIS_TYPE_GAUGE,
    VIS_TYPE_OUTLIER_TABLE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_SINGLE_VALUE,
]

// PROTOTYPE heuristic: analytics adds trend lines as thin solid lines/splines
const isTrendLine = (series) =>
    LINE_SERIES_TYPES.includes(series.options.type) &&
    series.options.dashStyle === 'solid' &&
    series.options.lineWidth === 1

const isDataSeries = (series) =>
    !isTrendLine(series) && !series.options.custom?.isTwoCategoryFakeSerie

const fillSeedColors = (colors, paletteId) => {
    const used = colors.filter(Boolean)

    return colors.map((color) => {
        if (color) {
            return color
        }
        const seed = getNextSeedColor(paletteId, used)
        used.push(seed)
        return seed
    })
}

export const getRenderColors = ({
    visualization,
    seriesIds,
    positional,
    getMetadataColor,
}) => {
    if (
        isLegendSetType(visualization.type) &&
        isLegendMode(visualization.legend)
    ) {
        return null
    }

    const paletteId = visualization.colorSeed || COLOR_SET_DEFAULT
    const isSaved = Boolean(visualization.id)

    // Relative series can't own colours: the chosen palette is applied in order
    if (positional) {
        if (!visualization.colorSeed && isSaved) {
            return null
        }

        const palette = getPaletteColors(paletteId)

        return seriesIds.map((_, index) => palette[index % palette.length])
    }

    const stored = visualization.series || []

    if (!stored.some((item) => item.color) && isSaved) {
        return null
    }

    const items = seedSeriesColors({
        items: seriesIds.map(
            (id) =>
                stored.find((item) => item.dimensionItem === id) || {
                    dimensionItem: id,
                }
        ),
        paletteId,
        getMetadataColor,
    })

    return fillSeedColors(
        items.map((item) => resolveItemColor(item, getMetadataColor)),
        paletteId
    )
}

const getFill = ({ color, index, fillType, seriesType, currentColor }) => {
    if (
        fillType !== FILL_TYPE_PATTERN ||
        LINE_SERIES_TYPES.includes(seriesType)
    ) {
        return color
    }

    const pattern = PATTERNS[index % PATTERNS.length]

    // Legacy Patterns charts: analytics sets patternIndex, which would win over a custom
    // pattern after the merge in update(). Only clear it when present: Highcharts' diff
    // throws if the key is sent while the current colour is a plain string.
    const hasPatternIndex =
        typeof currentColor === 'object' &&
        currentColor !== null &&
        'patternIndex' in currentColor

    return {
        ...(hasPatternIndex ? { patternIndex: undefined } : {}),
        pattern: {
            path: { d: pattern.path, strokeWidth: 2 },
            color,
            width: pattern.width,
            height: pattern.height,
        },
    }
}

export const applySeriesColorsToChart = (chart, visualization) => {
    if (UNSUPPORTED_TYPES.includes(visualization.type)) {
        return
    }

    const isPie = visualization.type === VIS_TYPE_PIE
    const targets = isPie
        ? chart.series[0]?.points || []
        : chart.series.filter(isDataSeries)
    const column = visualization.columns?.[0]

    const colors = getRenderColors({
        visualization,
        seriesIds: targets.map((target) => target.options.id),
        positional: isPositionalSeries({
            type: visualization.type,
            dimensionId: column?.dimension,
            itemIds: column?.items?.map((item) => item.id) || [],
        }),
        getMetadataColor: getMockMetadataColor,
    })

    if (!colors) {
        return
    }

    targets.forEach((target, index) =>
        target.update(
            {
                color: getFill({
                    color: colors[index],
                    index,
                    fillType: visualization.fillType,
                    seriesType: isPie ? 'pie' : target.type,
                    currentColor: target.options.color,
                }),
            },
            false
        )
    )

    chart.redraw(false)
}
