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
    applyAxisPalette,
    applyPalette,
    COLOR_AUTO,
    getNextSeedColor,
    getPaletteColors,
    isLegendMode,
    isPositionalSeries,
    mergeSeriesItems,
    resetToAuto,
    resolveItemColor,
    seedLegacyColors,
    seedSeriesColors,
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

describe('getNextSeedColor', () => {
    it('returns the first unused palette colour (case-insensitive)', () => {
        expect(
            getNextSeedColor(COLOR_SET_DEFAULT, [DEFAULT[0].toUpperCase()])
        ).toBe(DEFAULT[1])
    })
    it('cycles when every palette colour is used', () => {
        expect(getNextSeedColor(COLOR_SET_DEFAULT, [...DEFAULT])).toBe(
            DEFAULT[DEFAULT.length % DEFAULT.length]
        )
        expect(
            getNextSeedColor(COLOR_SET_DEFAULT, [...DEFAULT, DEFAULT[0]])
        ).toBe(DEFAULT[1])
    })
})

describe('resolveItemColor', () => {
    it('resolves AUTO through metadata', () => {
        expect(
            resolveItemColor(
                { dimensionItem: 'withColor', color: COLOR_AUTO },
                getMetadataColor
            )
        ).toBe('#123456')
    })
    it('returns hex as is and undefined for missing', () => {
        expect(
            resolveItemColor(
                { dimensionItem: 'x', color: '#abcdef' },
                getMetadataColor
            )
        ).toBe('#abcdef')
        expect(
            resolveItemColor(
                { dimensionItem: 'x', color: COLOR_AUTO },
                getMetadataColor
            )
        ).toBeUndefined()
    })
})

describe('seedSeriesColors', () => {
    it('uses AUTO when metadata colour exists, otherwise next unused seed colour', () => {
        const result = seedSeriesColors({
            items: [
                { dimensionItem: 'a' },
                { dimensionItem: 'withColor' },
                { dimensionItem: 'b' },
            ],
            paletteId: COLOR_SET_DEFAULT,
            getMetadataColor,
        })
        expect(result.map((i) => i.color)).toEqual([
            DEFAULT[0],
            COLOR_AUTO,
            DEFAULT[1],
        ])
    })
    it('keeps existing colours and skips colours already in use', () => {
        const result = seedSeriesColors({
            items: [
                { dimensionItem: 'a', color: DEFAULT[0] },
                { dimensionItem: 'b' },
            ],
            paletteId: COLOR_SET_DEFAULT,
            getMetadataColor,
        })
        expect(result.map((i) => i.color)).toEqual([DEFAULT[0], DEFAULT[1]])
    })
    it('does not hand out a seed colour equal to a later Auto colour', () => {
        const result = seedSeriesColors({
            items: [{ dimensionItem: 'a' }, { dimensionItem: 'm' }],
            paletteId: COLOR_SET_DEFAULT,
            getMetadataColor: (id) => (id === 'm' ? DEFAULT[0] : undefined),
        })
        expect(result.map((i) => i.color)).toEqual([DEFAULT[1], COLOR_AUTO])
    })
    it('re-seeds a removed and re-added item without shifting others', () => {
        const merged = mergeSeriesItems(
            [
                { dimensionItem: 'a' },
                { dimensionItem: 'c' },
                { dimensionItem: 'b' },
            ],
            [
                { dimensionItem: 'a', color: '#111111' },
                { dimensionItem: 'c', color: '#333333' },
            ]
        )
        const result = seedSeriesColors({
            items: merged,
            paletteId: COLOR_SET_DEFAULT,
            getMetadataColor,
        })
        expect(result.map((i) => i.color)).toEqual([
            '#111111',
            '#333333',
            DEFAULT[0],
        ])
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

describe('applyPalette', () => {
    it('overwrites every row including AUTO, cycling the palette', () => {
        const items = Array.from({ length: BRIGHT.length + 1 }, (_, i) => ({
            dimensionItem: `i${i}`,
            color: COLOR_AUTO,
        }))
        const result = applyPalette({ items, paletteId: COLOR_SET_BRIGHT })
        expect(result[0].color).toBe(BRIGHT[0])
        expect(result[BRIGHT.length].color).toBe(BRIGHT[0])
    })
})

describe('applyAxisPalette', () => {
    it('uses the main axis colour for single items and a gradient for several', () => {
        const result = applyAxisPalette({
            items: [
                { dimensionItem: 'a', axis: 0 },
                { dimensionItem: 'b', axis: 1 },
                { dimensionItem: 'c', axis: 1 },
            ],
        })
        expect(result[0].color).toBe('#4292c6')
        expect(result[1].color).toBe('#67000d')
        expect(result[2].color).toBe('#fcbba1')
    })
})

describe('resetToAuto', () => {
    it('drops all colours and seeds again', () => {
        const result = resetToAuto({
            items: [
                { dimensionItem: 'withColor', color: '#000000' },
                { dimensionItem: 'a', color: '#000000' },
            ],
            paletteId: COLOR_SET_BRIGHT,
            getMetadataColor,
        })
        expect(result.map((i) => i.color)).toEqual([COLOR_AUTO, BRIGHT[0]])
    })
})

describe('seedLegacyColors', () => {
    it('freezes the chart colour set as hex, never AUTO', () => {
        const result = seedLegacyColors({
            items: [{ dimensionItem: 'withColor', axis: 0 }],
            colorSet: COLOR_SET_BRIGHT,
        })
        expect(result).toEqual({
            items: [{ dimensionItem: 'withColor', axis: 0, color: BRIGHT[0] }],
            colorSeed: COLOR_SET_BRIGHT,
            fillType: FILL_TYPE_SOLID,
        })
    })
    it('turns on pattern fill for the patterns set', () => {
        const result = seedLegacyColors({
            items: [{ dimensionItem: 'a', axis: 0 }],
            colorSet: COLOR_SET_PATTERNS,
        })
        expect(result.fillType).toBe(FILL_TYPE_PATTERN)
        expect(result.colorSeed).toBe(COLOR_SET_DEFAULT)
        expect(result.items[0].color).toBe(
            getPaletteColors(COLOR_SET_PATTERNS)[0]
        )
    })
    it('uses axis families when the chart uses custom axes', () => {
        const result = seedLegacyColors({
            items: [
                { dimensionItem: 'a', axis: 0 },
                { dimensionItem: 'b', axis: 1 },
            ],
            colorSet: COLOR_SET_BRIGHT,
        })
        expect(result.items.map((i) => i.color)).toEqual(['#4292c6', '#cb181d'])
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
