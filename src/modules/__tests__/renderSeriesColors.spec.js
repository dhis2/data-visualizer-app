import {
    colorSets,
    COLOR_SET_BRIGHT,
    COLOR_SET_DEFAULT,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    VIS_TYPE_COLUMN,
    VIS_TYPE_GAUGE,
    VIS_TYPE_LINE,
    VIS_TYPE_PIE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
} from '@dhis2/analytics'
import { FILL_TYPE_PATTERN } from '../options.js'
import {
    applySeriesColorsToChart,
    getRenderColors,
} from '../renderSeriesColors.js'
import { COLOR_AUTO } from '../seriesColors.js'

const DEFAULT = colorSets[COLOR_SET_DEFAULT].colors
const BRIGHT = colorSets[COLOR_SET_BRIGHT].colors
const getMetadataColor = (id) => ({ m: '#123456' }[id])

describe('getRenderColors', () => {
    it('returns null in legend mode even with stored colours', () => {
        expect(
            getRenderColors({
                visualization: {
                    type: VIS_TYPE_COLUMN,
                    legend: { strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM },
                    series: [{ dimensionItem: 'a', color: '#ffffff' }],
                },
                seriesIds: ['a'],
                positional: false,
                getMetadataColor,
            })
        ).toBeNull()
    })
    it('returns null for a saved chart with no stored colours (legacy)', () => {
        expect(
            getRenderColors({
                visualization: {
                    id: 'saved',
                    colorSet: COLOR_SET_BRIGHT,
                    series: [],
                },
                seriesIds: ['a', 'm'],
                positional: false,
                getMetadataColor,
            })
        ).toBeNull()
    })
    it('seeds on the fly for a new chart (Auto + seed palette)', () => {
        expect(
            getRenderColors({
                visualization: { series: [] },
                seriesIds: ['a', 'm'],
                positional: false,
                getMetadataColor,
            })
        ).toEqual([DEFAULT[0], '#123456'])
    })
    it('uses stored colours and seeds unknown series from colorSeed', () => {
        expect(
            getRenderColors({
                visualization: {
                    id: 'saved',
                    colorSeed: COLOR_SET_BRIGHT,
                    series: [{ dimensionItem: 'a', color: '#ffffff' }],
                },
                seriesIds: ['a', 'b'],
                positional: false,
                getMetadataColor,
            })
        ).toEqual(['#ffffff', BRIGHT[0]])
    })
    it('falls back to a seed colour when an Auto item lost its metadata colour', () => {
        expect(
            getRenderColors({
                visualization: {
                    series: [
                        { dimensionItem: 'gone', color: COLOR_AUTO },
                        { dimensionItem: 'b', color: DEFAULT[0] },
                    ],
                },
                seriesIds: ['gone', 'b'],
                positional: false,
                getMetadataColor,
            })
        ).toEqual([DEFAULT[1], DEFAULT[0]])
    })
    it('colours relative series in order from the chosen palette', () => {
        expect(
            getRenderColors({
                visualization: {
                    colorSeed: COLOR_SET_BRIGHT,
                    series: [{ dimensionItem: 'x', color: '#ffffff' }],
                },
                seriesIds: ['x', 'y'],
                positional: true,
                getMetadataColor,
            })
        ).toEqual([BRIGHT[0], BRIGHT[1]])
    })
    it('cycles the palette for many relative series', () => {
        const ids = Array.from({ length: BRIGHT.length + 1 }, (_, i) => `p${i}`)
        const colors = getRenderColors({
            visualization: { colorSeed: COLOR_SET_BRIGHT },
            seriesIds: ids,
            positional: true,
            getMetadataColor,
        })
        expect(colors[BRIGHT.length]).toBe(BRIGHT[0])
    })
    it('returns null for a saved relative chart with no palette chosen (legacy)', () => {
        expect(
            getRenderColors({
                visualization: { id: 'saved', colorSet: COLOR_SET_BRIGHT },
                seriesIds: ['x'],
                positional: true,
                getMetadataColor,
            })
        ).toBeNull()
    })
})

const fakeSeries = (options, type = 'column') => ({
    options,
    type,
    update: jest.fn(),
})

describe('applySeriesColorsToChart', () => {
    it('recolours data series by id, skips trend lines, redraws', () => {
        const a = fakeSeries({ id: 'a' })
        const trend = fakeSeries(
            { type: 'spline', dashStyle: 'solid', lineWidth: 1 },
            'spline'
        )
        const chart = { series: [a, trend], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_COLUMN,
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [{ dimensionItem: 'a', color: '#ffffff' }],
        })

        expect(a.update).toHaveBeenCalledWith({ color: '#ffffff' }, false)
        expect(trend.update).not.toHaveBeenCalled()
        expect(chart.redraw).toHaveBeenCalledWith(false)
    })
    it('uses pattern fills for non-line series when fill is pattern', () => {
        const a = fakeSeries({ id: 'a' })
        const chart = { series: [a], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_COLUMN,
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [{ dimensionItem: 'a', color: '#ffffff' }],
            fillType: FILL_TYPE_PATTERN,
        })

        const { color } = a.update.mock.calls[0][0]
        expect(color.pattern.color).toBe('#ffffff')
        expect(typeof color.pattern.path.d).toBe('string')
    })
    it('recolours pie points', () => {
        const point = { options: { id: 'a' }, update: jest.fn() }
        const chart = {
            series: [
                {
                    options: {},
                    type: 'pie',
                    points: [point],
                    update: jest.fn(),
                },
            ],
            redraw: jest.fn(),
        }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_PIE,
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [{ dimensionItem: 'a', color: '#ffffff' }],
        })

        expect(point.update).toHaveBeenCalledWith({ color: '#ffffff' }, false)
    })
    it('does nothing for a legacy saved chart', () => {
        const a = fakeSeries({ id: 'a' })
        const chart = { series: [a], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            id: 'saved',
            type: VIS_TYPE_COLUMN,
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [],
        })

        expect(a.update).not.toHaveBeenCalled()
        expect(chart.redraw).not.toHaveBeenCalled()
    })
})

describe('applySeriesColorsToChart (review fixes)', () => {
    it('skips linear trend lines (type line) so positional colours do not shift', () => {
        const s1 = fakeSeries({ id: 'x' }, 'line')
        const trend = fakeSeries(
            { type: 'line', dashStyle: 'solid', lineWidth: 1 },
            'line'
        )
        const s2 = fakeSeries({ id: 'y' }, 'line')
        const chart = { series: [s1, trend, s2], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_YEAR_OVER_YEAR_LINE,
            colorSeed: COLOR_SET_BRIGHT,
        })

        expect(trend.update).not.toHaveBeenCalled()
        expect(s2.update).toHaveBeenCalledWith({ color: BRIGHT[1] }, false)
    })

    it('applies static colours on a line chart that carries a leftover legend option', () => {
        const a = fakeSeries({ id: 'a' }, 'line')
        const chart = { series: [a], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_LINE,
            legend: { strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM },
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [{ dimensionItem: 'a', color: '#ffffff' }],
        })

        expect(a.update).toHaveBeenCalledWith({ color: '#ffffff' }, false)
    })

    it.each([VIS_TYPE_SCATTER, VIS_TYPE_GAUGE])(
        'leaves %s charts untouched',
        (type) => {
            const a = fakeSeries({ id: 'a' })
            const chart = { series: [a], redraw: jest.fn() }

            applySeriesColorsToChart(chart, {
                type,
                columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
                series: [{ dimensionItem: 'a', color: '#ffffff' }],
            })

            expect(a.update).not.toHaveBeenCalled()
            expect(chart.redraw).not.toHaveBeenCalled()
        }
    )

    it('clears the analytics patternIndex so the custom pattern colour wins', () => {
        const a = fakeSeries({ id: 'a', color: { patternIndex: 0 } })
        const chart = { series: [a], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_COLUMN,
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [{ dimensionItem: 'a', color: '#ff0000' }],
            fillType: FILL_TYPE_PATTERN,
        })

        const { color } = a.update.mock.calls[0][0]
        expect(Object.keys(color)).toContain('patternIndex')
        expect(color.patternIndex).toBeUndefined()
        expect(color.pattern.color).toBe('#ff0000')
    })

    it('does not send patternIndex when the existing colour is a plain hex (Highcharts diff would throw)', () => {
        const a = fakeSeries({ id: 'a', color: '#4292c6' })
        const chart = { series: [a], redraw: jest.fn() }

        applySeriesColorsToChart(chart, {
            type: VIS_TYPE_COLUMN,
            columns: [{ dimension: 'dx', items: [{ id: 'a' }] }],
            series: [{ dimensionItem: 'a', color: '#ff0000' }],
            fillType: FILL_TYPE_PATTERN,
        })

        const { color } = a.update.mock.calls[0][0]
        expect(Object.keys(color)).not.toContain('patternIndex')
        expect(color.pattern.color).toBe('#ff0000')
    })
})
