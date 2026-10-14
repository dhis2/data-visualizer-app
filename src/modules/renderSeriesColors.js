import {
    colorSets,
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
import {
    FILL_TYPE_PATTERN,
    OPTION_COLOR_MODE,
    OPTION_COLOR_PALETTE,
    OPTION_SINGLE_COLOR,
    OPTION_USE_ITEM_COLORS,
} from './options.js'
import {
    getInitialColourOptions,
    isLegendMode,
    isPositionalSeries,
    resolveSeriesColors,
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

    const isInitialised = Boolean(visualization[OPTION_COLOR_MODE])

    // Saved charts nobody has touched keep the analytics colours
    if (!isInitialised && visualization.id) {
        return null
    }

    const settings = isInitialised
        ? {
              colorMode: visualization[OPTION_COLOR_MODE],
              colorPalette: visualization[OPTION_COLOR_PALETTE],
              singleColor: visualization[OPTION_SINGLE_COLOR],
              useItemColors: visualization[OPTION_USE_ITEM_COLORS],
          }
        : getInitialColourOptions({ isSaved: false })

    // Relative series can't own colours: they follow the chart setting in order
    const stored = positional ? [] : visualization.series || []

    return resolveSeriesColors({
        items: seriesIds.map(
            (id) =>
                stored.find((item) => item.dimensionItem === id) || {
                    dimensionItem: id,
                }
        ),
        ...settings,
        getMetadataColor,
    }).map(({ color }) => color)
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
