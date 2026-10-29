import {
    colorSets,
    COLOR_SET_BRIGHT,
    COLOR_SET_DEFAULT,
    COLOR_SET_PATTERNS,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    VIS_TYPE_COLUMN,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
} from '@dhis2/analytics'
import { FILL_TYPE_PATTERN, FILL_TYPE_SOLID } from '../options.js'
import {
    COLOR_AUTO,
    COLOR_PALETTE,
    getPaletteColors,
    isLegendMode,
    isPositionalSeries,
    mergeSeriesItems,
    COLOR_MODE_PALETTE,
    COLOR_MODE_SINGLE,
    COLOR_SOURCE_AUTO,
    COLOR_SOURCE_CUSTOM,
    COLOR_SOURCE_PALETTE,
    COLOR_SOURCE_SINGLE,
    DEFAULT_SINGLE_COLOR,
    getAxisColors,
    getInitialColourOptions,
    PALETTE_BY_AXIS,
    resolveSeriesColors,
} from '../seriesColors.js'

const DEFAULT = colorSets[COLOR_SET_DEFAULT].colors
const BRIGHT = colorSets[COLOR_SET_BRIGHT].colors
const metadataColors = { withColor: '#123456' }
const getMetadataColor = (id) => metadataColors[id]

describe('getPaletteColors', () => {
    it('returns the colour set colours', () => {
        expect(getPaletteColors(COLOR_SET_BRIGHT)).toEqual(BRIGHT)
    })
    it('returns the pattern colours for the patterns set', () => {
        expect(getPaletteColors(COLOR_SET_PATTERNS)).toEqual(
            colorSets[COLOR_SET_PATTERNS].patterns.map((p) => p.color)
        )
    })
    it('falls back to default for unknown ids', () => {
        expect(getPaletteColors('NOPE')).toEqual(DEFAULT)
    })
})

describe('mergeSeriesItems', () => {
    it('follows layout order, keeps option props, takes name from layout', () => {
        expect(
            mergeSeriesItems(
                [
                    { dimensionItem: 'b', name: 'B', axis: 0 },
                    { dimensionItem: 'a', name: 'A', axis: 0 },
                ],
                [{ dimensionItem: 'a', name: 'old', axis: 1, color: '#fff000' }]
            )
        ).toEqual([
            { dimensionItem: 'b', name: 'B', axis: 0 },
            { dimensionItem: 'a', name: 'A', axis: 1, color: '#fff000' },
        ])
    })
})

describe('isLegendMode', () => {
    it('is false for no legend, fixed without set', () => {
        expect(isLegendMode(undefined)).toBe(false)
        expect(isLegendMode({ strategy: LEGEND_DISPLAY_STRATEGY_FIXED })).toBe(
            false
        )
    })
    it('is true for by data item or a fixed set', () => {
        expect(
            isLegendMode({ strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM })
        ).toBe(true)
        expect(
            isLegendMode({
                strategy: LEGEND_DISPLAY_STRATEGY_FIXED,
                set: { id: 'x' },
            })
        ).toBe(true)
    })
})

describe('isPositionalSeries', () => {
    it('is true for year over year, relative items and ALL items', () => {
        expect(
            isPositionalSeries({
                type: VIS_TYPE_YEAR_OVER_YEAR_LINE,
                dimensionId: 'dx',
                itemIds: ['a'],
            })
        ).toBe(true)
        expect(
            isPositionalSeries({
                type: VIS_TYPE_COLUMN,
                dimensionId: 'pe',
                itemIds: ['LAST_12_MONTHS'],
            })
        ).toBe(true)
        expect(
            isPositionalSeries({
                type: VIS_TYPE_COLUMN,
                dimensionId: 'ou',
                itemIds: ['USER_ORGUNIT'],
            })
        ).toBe(true)
        expect(
            isPositionalSeries({
                type: VIS_TYPE_COLUMN,
                dimensionId: 'dx',
                itemIds: ['ALL_ITEMS'],
            })
        ).toBe(true)
    })
    it('is false for fixed items', () => {
        expect(
            isPositionalSeries({
                type: VIS_TYPE_COLUMN,
                dimensionId: 'dx',
                itemIds: ['fbfJHSPpUQD'],
            })
        ).toBe(false)
    })
})

describe('resolveSeriesColors', () => {
    const resolve = (items, settings = {}) =>
        resolveSeriesColors({ items, getMetadataColor, ...settings })

    it('gives each series the palette colour at its position', () => {
        expect(
            resolve([{ dimensionItem: 'a' }, { dimensionItem: 'b' }], {
                colorMode: COLOR_MODE_PALETTE,
                colorPalette: COLOR_SET_BRIGHT,
            })
        ).toEqual([
            {
                color: BRIGHT[0],
                source: COLOR_SOURCE_PALETTE,
                isOverride: false,
            },
            {
                color: BRIGHT[1],
                source: COLOR_SOURCE_PALETTE,
                isOverride: false,
            },
        ])
    })

    it('does not shift later palette colours when an earlier series is overridden', () => {
        const result = resolve(
            [{ dimensionItem: 'a', color: '#ff0000' }, { dimensionItem: 'b' }],
            { colorPalette: COLOR_SET_BRIGHT }
        )
        expect(result[0]).toEqual({
            color: '#ff0000',
            source: COLOR_SOURCE_CUSTOM,
            isOverride: true,
        })
        expect(result[1].color).toBe(BRIGHT[1])
    })

    it('uses metadata colours only when useItemColors is on in palette mode', () => {
        const items = [{ dimensionItem: 'withColor' }, { dimensionItem: 'b' }]

        expect(resolve(items, { useItemColors: true })).toEqual([
            { color: '#123456', source: COLOR_SOURCE_AUTO, isOverride: false },
            {
                color: DEFAULT[1],
                source: COLOR_SOURCE_PALETTE,
                isOverride: false,
            },
        ])
        expect(resolve(items, { useItemColors: false })[0].color).toBe(
            DEFAULT[0]
        )
        expect(
            resolve(items, {
                colorMode: COLOR_MODE_SINGLE,
                singleColor: '#00ff00',
                useItemColors: true,
            })[0]
        ).toEqual({
            color: '#00ff00',
            source: COLOR_SOURCE_SINGLE,
            isOverride: false,
        })
    })

    it('applies overrides in every mode (switching modes keeps them)', () => {
        const items = [
            { dimensionItem: 'a', color: '#ff0000' },
            { dimensionItem: 'withColor', color: COLOR_AUTO },
            { dimensionItem: 'c' },
        ]

        for (const settings of [
            { colorMode: COLOR_MODE_PALETTE },
            { colorMode: COLOR_MODE_SINGLE, singleColor: '#00ff00' },
        ]) {
            const result = resolve(items, settings)
            expect(result[0].color).toBe('#ff0000')
            expect(result[1]).toEqual({
                color: '#123456',
                source: COLOR_SOURCE_AUTO,
                isOverride: true,
            })
        }
    })

    it('lets a Palette override beat the item colour, and is ignored in single colour mode', () => {
        const items = [{ dimensionItem: 'withColor', color: COLOR_PALETTE }]

        expect(resolve(items, { useItemColors: true })[0]).toEqual({
            color: DEFAULT[0],
            source: COLOR_SOURCE_PALETTE,
            isOverride: true,
        })
        expect(
            resolve(items, {
                colorMode: COLOR_MODE_SINGLE,
                singleColor: '#00ff00',
            })[0]
        ).toEqual({
            color: '#00ff00',
            source: COLOR_SOURCE_SINGLE,
            isOverride: false,
        })
    })

    it('falls back to the chart default when an AUTO override lost its metadata colour', () => {
        expect(
            resolve([{ dimensionItem: 'gone', color: COLOR_AUTO }], {
                colorPalette: COLOR_SET_BRIGHT,
            })[0]
        ).toEqual({
            color: BRIGHT[0],
            source: COLOR_SOURCE_PALETTE,
            isOverride: false,
        })
    })

    it('uses the default single colour when none is chosen', () => {
        expect(
            resolve([{ dimensionItem: 'a' }], {
                colorMode: COLOR_MODE_SINGLE,
            })[0].color
        ).toBe(DEFAULT_SINGLE_COLOR)
    })

    it('cycles the palette for more series than colours', () => {
        const items = Array.from({ length: DEFAULT.length + 2 }, (_, i) => ({
            dimensionItem: `i${i}`,
        }))
        const result = resolve(items)
        expect(result.every(({ color }) => typeof color === 'string')).toBe(
            true
        )
        expect(result[DEFAULT.length].color).toBe(DEFAULT[0])
    })

    it('colours by axis family for BY_AXIS, also when everything is on one axis', () => {
        expect(
            resolve(
                [
                    { dimensionItem: 'a', axis: 0 },
                    { dimensionItem: 'b', axis: 1 },
                ],
                { colorPalette: PALETTE_BY_AXIS }
            ).map(({ color }) => color)
        ).toEqual(['#4292c6', '#cb181d'])

        expect(
            resolve([{ dimensionItem: 'a' }, { dimensionItem: 'b' }], {
                colorPalette: PALETTE_BY_AXIS,
            }).map(({ color }) => color)
        ).toEqual(['#08306b', '#c6dbef'])
    })
})

describe('getAxisColors', () => {
    it('uses the main axis colour for single items and a gradient for several', () => {
        expect(
            getAxisColors([
                { dimensionItem: 'a', axis: 0 },
                { dimensionItem: 'b', axis: 1 },
                { dimensionItem: 'c', axis: 1 },
            ])
        ).toEqual(['#4292c6', '#67000d', '#fcbba1'])
    })
})

describe('getInitialColourOptions', () => {
    it('gives new charts the default palette with item colours on', () => {
        expect(getInitialColourOptions({ isSaved: false })).toEqual({
            colorMode: COLOR_MODE_PALETTE,
            colorPalette: COLOR_SET_DEFAULT,
            useItemColors: true,
            fillType: FILL_TYPE_SOLID,
        })
    })

    it('keeps a saved chart looking as before', () => {
        expect(
            getInitialColourOptions({
                isSaved: true,
                colorSet: COLOR_SET_BRIGHT,
                series: [],
            })
        ).toEqual({
            colorMode: COLOR_MODE_PALETTE,
            colorPalette: COLOR_SET_BRIGHT,
            useItemColors: false,
            fillType: FILL_TYPE_SOLID,
        })
    })

    it('maps the Patterns colour set to the default palette with pattern fill', () => {
        expect(
            getInitialColourOptions({
                isSaved: true,
                colorSet: COLOR_SET_PATTERNS,
            })
        ).toMatchObject({
            colorPalette: COLOR_SET_DEFAULT,
            fillType: FILL_TYPE_PATTERN,
        })
    })

    it('uses By axis for saved charts with custom axes', () => {
        expect(
            getInitialColourOptions({
                isSaved: true,
                colorSet: COLOR_SET_BRIGHT,
                series: [{ dimensionItem: 'a', axis: 1 }],
            }).colorPalette
        ).toBe(PALETTE_BY_AXIS)
    })
})
