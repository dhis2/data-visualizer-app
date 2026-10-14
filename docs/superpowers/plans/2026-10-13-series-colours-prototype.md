# Series Colours Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A clickable in-app prototype of the "Legend & Colours" options tab (Legend | Static mode, per-item Auto/hex colours, Apply-palette actions, Fill solid/pattern), with the chart re-rendering in the chosen colours.

**Architecture:** All colour logic lives in one pure module (`src/modules/seriesColors.js`) that operates on the existing `options.series` items (adding a `color` prop) plus three new UI-only options. The Options UI dispatches the results through the existing generic `acSetUiOptions`. Rendering recolours the Highcharts chart returned by `createVisualization` inside `ChartPlugin` — `@dhis2/analytics` is not modified. Metadata colours are mocked.

**Tech Stack:** React 18, Redux, `@dhis2/ui`, `@dhis2/analytics` (Highcharts 12), Jest via `d2-app-scripts test`, new dev-only-ish dependency `react-colorful@5.6.1` for the custom picker.

**Spec:** `docs/superpowers/specs/2026-10-13-series-colours-design.md`

## Global Constraints

-   Prototype only: no `@dhis2/analytics` changes; no backend/schema changes; colours are **not persisted** (stripped on save).
-   Old saved charts with no stored colours must render exactly as today (legacy `colorSet` path untouched).
-   Tab label: `Legend & Colours` for chart types with Static; gauge / single value / pivot table keep `Legend` (their configs are not touched).
-   Mode switch shown only for: column, bar, stacked column, stacked bar (i.e. `isLegendSetType(type)` among chart types handled by `defaultConfig`).
-   Fill: Pattern hidden for line-type charts: `LINE`, `YEAR_OVER_YEAR_LINE`, `RADAR`.
-   Row state values: `color === 'AUTO'` or a `#rrggbb` hex string.
-   Apply overwrites every row; after Apply, `colorSeed` = applied palette id (not changed by _By axis_).
-   Code style: match surrounding code — 4-space indent, no semicolons, single quotes, `i18n.t()` for all user-facing strings, CSS modules. Run `yarn lint` before each commit.

## Review Focus

1. **Item removed then re-added** — a removed item's colour is dropped; when re-added it is seeded fresh (Auto if metadata colour, else next unused seed colour); other rows keep their colours. Test in Task 1 (`mergeSeriesItems` + `seedSeriesColors`).
2. **More series than palette colours** (e.g. 25 items, Default has 19) — seed cycles instead of returning `undefined`. Test in Task 1 (`getNextSeedColor`).
3. **Auto row whose metadata colour disappears** (id not in mock map anymore) — renders with next unused seed colour, not black/undefined. Test in Task 3 (`getRenderColors`).
4. **Saved legacy chart rendered without opening the Colours tab** — `getRenderColors` returns `null` so analytics colours (incl. Patterns and multi-axis families) are untouched. Test in Task 3.
5. **Legend mode with stored static colours** — switching to Legend must not apply stored hex colours over legend colours. Test in Task 3.

---

## File Structure

| File                                                                                  | Responsibility                                                                                                     |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/modules/options.js` (modify)                                                     | Register `fillType`, `colorSeed`, `positionalColors` options (UI-only, `savable: false`) + `FILL_TYPE_*` constants |
| `src/modules/seriesColors.js` (create)                                                | Pure colour model: palettes, seeding, apply, reset, legacy seed, by-axis, positional detection, merge              |
| `src/modules/mockMetadataColors.js` (create)                                          | PROTOTYPE: id → hex map standing in for metadata `style.color`                                                     |
| `src/modules/renderSeriesColors.js` (create)                                          | Pure `getRenderColors` + `applySeriesColorsToChart(chart, visualization)`                                          |
| `src/modules/visualization.js` (modify)                                               | Strip `color` from series items in `getSaveableVisualization`                                                      |
| `src/components/VisualizationPlugin/ChartPlugin.jsx` (modify)                         | Call `applySeriesColorsToChart` after `createVisualization`                                                        |
| `src/components/VisualizationOptions/Options/Colours/ColorPickerPopover.jsx` (create) | Popover: Auto / palette grid / custom picker                                                                       |
| `src/components/VisualizationOptions/Options/Colours/SeriesColorRow.jsx` (create)     | One row: name, swatch, "Auto" or hex label                                                                         |
| `src/components/VisualizationOptions/Options/Colours/ApplyColorsMenu.jsx` (create)    | Dropdown: By axis / palettes / Reset; Undo alert                                                                   |
| `src/components/VisualizationOptions/Options/Colours/ColoursTab.jsx` (create)         | Connected container: mode switch, legend settings, static list, fill, mount-time seeding                           |
| `src/components/VisualizationOptions/styles/Colours.module.css` (create)              | Styles for the above                                                                                               |
| `src/modules/options/tabs/colours.jsx` (create)                                       | Tab config `getColoursTab`                                                                                         |
| `src/modules/options/defaultConfig.js`, `pieConfig.jsx` (modify)                      | Use Colours tab, drop Color set section, register option names                                                     |

---

### Task 1: Pure colour model

**Files:**

-   Modify: `src/modules/options.js`
-   Create: `src/modules/seriesColors.js`
-   Test: `src/modules/__tests__/seriesColors.spec.js`

**Interfaces:**

-   Produces (in `options.js`): `OPTION_FILL_TYPE = 'fillType'`, `OPTION_COLOR_SEED = 'colorSeed'`, `OPTION_POSITIONAL_COLORS = 'positionalColors'`, `FILL_TYPE_SOLID = 'SOLID'`, `FILL_TYPE_PATTERN = 'PATTERN'`.
-   Produces (in `seriesColors.js`):

    -   `COLOR_AUTO = 'AUTO'`, `PALETTE_BY_AXIS = 'BY_AXIS'`, `PALETTE_IDS: string[]`, `POSITIONAL_SLOT_PREFIX = '__slot_'`, `DEFAULT_POSITIONAL_SLOT_COUNT = 4`
    -   `getPaletteColors(paletteId: string): string[]`
    -   `getNextSeedColor(paletteId: string, usedColors: string[]): string`
    -   `resolveItemColor(item: {dimensionItem, color?}, getMetadataColor: (id) => string|undefined): string|undefined`
    -   `seedSeriesColors({ items, paletteId, getMetadataColor }): Item[]`
    -   `applyPalette({ items, paletteId }): Item[]`
    -   `applyAxisPalette({ items }): Item[]`
    -   `resetToAuto({ items, paletteId, getMetadataColor }): Item[]`
    -   `seedLegacyColors({ items, colorSet }): { items: Item[], colorSeed: string, fillType: string }`
    -   `mergeSeriesItems(layoutItems: Item[], optionItems: Item[]): Item[]`
    -   `isLegendMode(legend?: { strategy?, set? }): boolean`
    -   `isPositionalSeries({ type, dimensionId, itemIds }): boolean`
    -   `positionalColorsToItems(colors: string[], count: number): Item[]` / `itemsToPositionalColors(items: Item[]): string[]`
    -   `Item` = `{ dimensionItem: string, name?: string, axis?: number, type?: string, color?: 'AUTO'|string }`

-   [ ] **Step 1: Register the options**

In `src/modules/options.js`, add next to the other `OPTION_*` exports (keep alphabetical-ish placement near `OPTION_COLOR_SET`):

```js
export const OPTION_COLOR_SEED = 'colorSeed'
export const OPTION_FILL_TYPE = 'fillType'
export const OPTION_POSITIONAL_COLORS = 'positionalColors'
```

Next to `DISPLAY_DENSITY_*` constants:

```js
export const FILL_TYPE_SOLID = 'SOLID'
export const FILL_TYPE_PATTERN = 'PATTERN'
```

Inside the `options` object, after the `[OPTION_COLOR_SET]` entry:

```js
    // PROTOTYPE: series colours are UI-only for now (not saved)
    [OPTION_COLOR_SEED]: {
        defaultValue: undefined,
        requestable: false,
        savable: false,
    },
    [OPTION_FILL_TYPE]: {
        defaultValue: FILL_TYPE_SOLID,
        requestable: false,
        savable: false,
    },
    [OPTION_POSITIONAL_COLORS]: {
        defaultValue: [],
        requestable: false,
        savable: false,
    },
```

Note: `FILL_TYPE_SOLID` must be declared above the `options` object.

-   [ ] **Step 2: Write the failing tests**

Create `src/modules/__tests__/seriesColors.spec.js`:

```js
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
    itemsToPositionalColors,
    mergeSeriesItems,
    positionalColorsToItems,
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

describe('positional conversion', () => {
    it('round-trips colours through slot items, padding to count', () => {
        const items = positionalColorsToItems(['#111111'], 2)
        expect(items).toEqual([
            { dimensionItem: '__slot_0', name: 'Item 1', color: '#111111' },
            { dimensionItem: '__slot_1', name: 'Item 2' },
        ])
        expect(
            itemsToPositionalColors([
                { ...items[0] },
                { ...items[1], color: '#222222' },
            ])
        ).toEqual(['#111111', '#222222'])
    })
})
```

-   [ ] **Step 3: Run tests to verify they fail**

Run: `yarn test src/modules/__tests__/seriesColors.spec.js`
Expected: FAIL — `Cannot find module '../seriesColors.js'`.

If `ALL_ITEMS` is not the value of `ALL_DYNAMIC_DIMENSION_ITEMS`, or `USER_ORGUNIT` is not detected by `hasRelativeItems`, check `node_modules/@dhis2/analytics/build/es/modules/relativeItems/index.js` and adjust the test inputs to real relative ids (not the implementation).

-   [ ] **Step 4: Implement `src/modules/seriesColors.js`**

```js
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
export const POSITIONAL_SLOT_PREFIX = '__slot_'
export const DEFAULT_POSITIONAL_SLOT_COUNT = 4

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

export const positionalColorsToItems = (colors, count) =>
    Array.from({ length: Math.max(colors.length, count) }, (_, index) => ({
        dimensionItem: `${POSITIONAL_SLOT_PREFIX}${index}`,
        name: i18n.t('Item {{number}}', { number: index + 1 }),
        ...(colors[index] ? { color: colors[index] } : {}),
    }))

export const itemsToPositionalColors = (items) =>
    items.map((item) => item.color)
```

-   [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/modules/__tests__/seriesColors.spec.js`
Expected: PASS. If `getNextSeedColor` "cycles" test fails on the exact index, check the arithmetic in the test (19 used → index 0; 20 used incl. a duplicate → first-unused search finds none, `20 % 19 = 1`) — keep the implementation.

-   [ ] **Step 6: Lint and commit**

```bash
yarn lint
git add src/modules/options.js src/modules/seriesColors.js src/modules/__tests__/seriesColors.spec.js
git commit -m "feat(prototype): series colour model"
```

---

### Task 2: Mock metadata colours and non-persistence

**Files:**

-   Create: `src/modules/mockMetadataColors.js`
-   Modify: `src/modules/visualization.js` (`getSaveableVisualization`, ~line 97)
-   Test: `src/modules/__tests__/visualization.test.js` (append)

**Interfaces:**

-   Produces: `getMetadataColor(id: string): string | undefined`, `MOCK_METADATA_COLORS: Record<string, string>`

-   [ ] **Step 1: Verify demo ids**

Against the dev instance DV is pointed at (Sierra Leone demo), confirm the names of these ids (open each `/api/identifiableObjects/<id>?fields=id,name` in the browser while logged in):
`fbfJHSPpUQD` (ANC 1st visit), `cYeuwXTCPkU` (ANC 2nd visit), `Jtf34kNZhzP` (ANC 3rd visit), `hfdmMSPBgLG` (ANC 4th or more visits), `Uvn6LCg7dVU` (ANC 1 Coverage), `OdiHJayrsKo` (ANC 2 Coverage), `sB79w2hiLp8` (ANC 3 Coverage).
Replace any id that doesn't resolve with one that does (same kind). Deliberately leave ANC 3rd and ANC 4th visits **without** a colour so the "no Auto" case is easy to demo.

-   [ ] **Step 2: Create `src/modules/mockMetadataColors.js`**

```js
// PROTOTYPE ONLY: stands in for the `style.color` property on data items.
// Items not listed here behave as if no colour is set in metadata.
export const MOCK_METADATA_COLORS = {
    fbfJHSPpUQD: '#1565c0', // ANC 1st visit
    cYeuwXTCPkU: '#2e7d32', // ANC 2nd visit
    Uvn6LCg7dVU: '#6a1b9a', // ANC 1 Coverage
    OdiHJayrsKo: '#ef6c00', // ANC 2 Coverage
    sB79w2hiLp8: '#c62828', // ANC 3 Coverage
}

export const getMetadataColor = (id) => MOCK_METADATA_COLORS[id]
```

-   [ ] **Step 3: Write the failing test** (append to `src/modules/__tests__/visualization.test.js`; add `getSaveableVisualization` to its existing import from `../visualization.js` if not present)

```js
describe('getSaveableVisualization (series colours prototype)', () => {
    it('strips per-item colours and UI-only colour options', () => {
        const result = getSaveableVisualization({
            series: [{ dimensionItem: 'a', axis: 1, color: '#ffffff' }],
            fillType: 'PATTERN',
            colorSeed: 'BRIGHT',
            positionalColors: ['#000000'],
        })
        expect(result.series).toEqual([{ dimensionItem: 'a', axis: 1 }])
        expect(result).not.toHaveProperty('fillType')
        expect(result).not.toHaveProperty('colorSeed')
        expect(result).not.toHaveProperty('positionalColors')
    })
})
```

-   [ ] **Step 4: Run to verify it fails**

Run: `yarn test src/modules/__tests__/visualization.test.js`
Expected: FAIL on `result.series` still containing `color` (the three options are already stripped because they're `savable: false`).

-   [ ] **Step 5: Implement** — in `getSaveableVisualization`, after the `nonSavableOptions.forEach(...)` line:

```js
// PROTOTYPE: per-item series colours are not persisted yet
if (Array.isArray(visualization.series)) {
    visualization.series = visualization.series.map(
        // eslint-disable-next-line no-unused-vars
        ({ color, ...item }) => item
    )
}
```

-   [ ] **Step 6: Run to verify it passes, lint, commit**

Run: `yarn test src/modules/__tests__/visualization.test.js` → PASS

```bash
yarn lint
git add src/modules/mockMetadataColors.js src/modules/visualization.js src/modules/__tests__/visualization.test.js
git commit -m "feat(prototype): mock metadata colours, do not persist series colours"
```

---

### Task 3: Render colours on the chart

**Files:**

-   Create: `src/modules/renderSeriesColors.js`
-   Modify: `src/components/VisualizationPlugin/ChartPlugin.jsx`
-   Test: `src/modules/__tests__/renderSeriesColors.spec.js`

**Interfaces:**

-   Consumes: Task 1 exports; `getMetadataColor` from Task 2; `OPTION_*`/`FILL_TYPE_*` from `options.js`.
-   Produces:

    -   `getRenderColors({ visualization, seriesIds, positional, getMetadataColor }): string[] | null` — `null` means "leave analytics colours untouched".
    -   `applySeriesColorsToChart(chart, visualization): void`

-   [ ] **Step 1: Write the failing tests**

Create `src/modules/__tests__/renderSeriesColors.spec.js`:

```js
import {
    colorSets,
    COLOR_SET_BRIGHT,
    COLOR_SET_DEFAULT,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    VIS_TYPE_COLUMN,
    VIS_TYPE_PIE,
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
    it('uses positional slots then continues the seed palette', () => {
        expect(
            getRenderColors({
                visualization: { positionalColors: [DEFAULT[1]] },
                seriesIds: ['x', 'y'],
                positional: true,
                getMetadataColor,
            })
        ).toEqual([DEFAULT[1], DEFAULT[0]])
    })
    it('returns null for a saved positional chart with no slots stored', () => {
        expect(
            getRenderColors({
                visualization: { id: 'saved', positionalColors: [] },
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
```

-   [ ] **Step 2: Run to verify it fails**

Run: `yarn test src/modules/__tests__/renderSeriesColors.spec.js`
Expected: FAIL — module not found.

-   [ ] **Step 3: Implement `src/modules/renderSeriesColors.js`**

```js
import {
    colorSets,
    COLOR_SET_DEFAULT,
    COLOR_SET_PATTERNS,
    VIS_TYPE_PIE,
} from '@dhis2/analytics'
import { getMetadataColor as getMockMetadataColor } from './mockMetadataColors.js'
import { FILL_TYPE_PATTERN } from './options.js'
import {
    getNextSeedColor,
    isLegendMode,
    isPositionalSeries,
    resolveItemColor,
    seedSeriesColors,
} from './seriesColors.js'

const PATTERNS = colorSets[COLOR_SET_PATTERNS].patterns
const LINE_SERIES_TYPES = ['line', 'spline']

// PROTOTYPE heuristic: analytics adds trend lines as thin solid splines
const isTrendLine = (series) =>
    series.options.type === 'spline' &&
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
    if (isLegendMode(visualization.legend)) {
        return null
    }

    const paletteId = visualization.colorSeed || COLOR_SET_DEFAULT
    const isSaved = Boolean(visualization.id)

    if (positional) {
        const stored = visualization.positionalColors || []

        if (!stored.length && isSaved) {
            return null
        }

        return fillSeedColors(
            seriesIds.map((_, index) => stored[index]),
            paletteId
        )
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

const getFill = (color, index, fillType, seriesType) => {
    if (
        fillType !== FILL_TYPE_PATTERN ||
        LINE_SERIES_TYPES.includes(seriesType)
    ) {
        return color
    }

    const pattern = PATTERNS[index % PATTERNS.length]

    return {
        pattern: {
            path: { d: pattern.path, strokeWidth: 2 },
            color,
            width: pattern.width,
            height: pattern.height,
        },
    }
}

export const applySeriesColorsToChart = (chart, visualization) => {
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
                color: getFill(
                    colors[index],
                    index,
                    visualization.fillType,
                    isPie ? 'pie' : target.type
                ),
            },
            false
        )
    )

    chart.redraw(false)
}
```

-   [ ] **Step 4: Run tests to verify they pass**

Run: `yarn test src/modules/__tests__/renderSeriesColors.spec.js` → PASS

-   [ ] **Step 5: Wire into `ChartPlugin.jsx`**

Add import:

```js
import { applySeriesColorsToChart } from '../../modules/renderSeriesColors.js'
```

In `renderVisualization`, replace

```js
onChartGenerated(visualizationConfig.visualization)
```

with

```js
// PROTOTYPE: series colours applied on top of the analytics chart
applySeriesColorsToChart(visualizationConfig.visualization, visualization)

onChartGenerated(visualizationConfig.visualization)
```

-   [ ] **Step 6: Manual check**

Run `yarn start`, create a new Column chart with ANC 1st visit, ANC 2nd visit, ANC 3rd visit as series (Data in Columns), Period in Rows, click Update.
Expected: bars are `#1565c0`, `#2e7d32`, and Default palette first colour `#a8bf24`. Open a saved chart from the favourites list → colours identical to `master` (spot-check one with Bright and one with Patterns colour set if available, or save one from `master` first).

-   [ ] **Step 7: Lint, run full suite, commit**

```bash
yarn lint
yarn test
git add src/modules/renderSeriesColors.js src/modules/__tests__/renderSeriesColors.spec.js src/components/VisualizationPlugin/ChartPlugin.jsx
git commit -m "feat(prototype): render series colours on the chart"
```

If any existing `ChartPlugin`/`VisualizationPlugin` test fails because its mocked `createVisualization` returns a `visualization` without `series`/`redraw`, make the mock chart `{ series: [], redraw: jest.fn() }` in that test rather than guarding in production code.

---

### Task 4: Picker popover and colour row

**Files:**

-   Modify: `package.json` / `yarn.lock` (add `react-colorful`)
-   Create: `src/components/VisualizationOptions/Options/Colours/ColorPickerPopover.jsx`
-   Create: `src/components/VisualizationOptions/Options/Colours/SeriesColorRow.jsx`
-   Create: `src/components/VisualizationOptions/styles/Colours.module.css`
-   Test: `src/components/VisualizationOptions/Options/Colours/__tests__/SeriesColorRow.spec.jsx`

**Interfaces:**

-   Consumes: `COLOR_AUTO`, `PALETTE_IDS`, `getPaletteColors`, `getPaletteLabels` (Task 1).
-   Produces:

    -   `<ColorPickerPopover reference={ref} metadataColor={string|undefined} value={'AUTO'|hex} onChange={(value) => void} onClose={() => void} />`
    -   `<SeriesColorRow name={string} value={'AUTO'|hex|undefined} metadataColor={string|undefined} onChange={(value) => void} />`

-   [ ] **Step 1: Add dependency**

```bash
yarn add react-colorful@5.6.1
```

-   [ ] **Step 2: Write the failing test**

Create `src/components/VisualizationOptions/Options/Colours/__tests__/SeriesColorRow.spec.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { COLOR_AUTO } from '../../../../../modules/seriesColors.js'
import SeriesColorRow from '../SeriesColorRow.jsx'

describe('SeriesColorRow', () => {
    it('shows "Auto" for auto rows and the hex for fixed rows', () => {
        const { rerender } = render(
            <SeriesColorRow
                name="ANC 1st visit"
                value={COLOR_AUTO}
                metadataColor="#1565c0"
                onChange={jest.fn()}
            />
        )
        expect(screen.getByText('Auto')).toBeInTheDocument()

        rerender(
            <SeriesColorRow
                name="ANC 1st visit"
                value="#a8bf24"
                metadataColor="#1565c0"
                onChange={jest.fn()}
            />
        )
        expect(screen.getByText('#a8bf24')).toBeInTheDocument()
    })

    it('offers Auto in the popover only when a metadata colour exists', () => {
        const { unmount } = render(
            <SeriesColorRow
                name="A"
                value="#a8bf24"
                metadataColor="#1565c0"
                onChange={jest.fn()}
            />
        )
        fireEvent.click(
            screen.getByRole('button', { name: /change colour for A/i })
        )
        expect(screen.getByText('Use data item colour')).toBeInTheDocument()
        unmount()

        render(<SeriesColorRow name="B" value="#a8bf24" onChange={jest.fn()} />)
        fireEvent.click(
            screen.getByRole('button', { name: /change colour for B/i })
        )
        expect(
            screen.queryByText('Use data item colour')
        ).not.toBeInTheDocument()
    })

    it('picking a palette swatch calls onChange with its hex', () => {
        const onChange = jest.fn()
        render(<SeriesColorRow name="A" value="#000000" onChange={onChange} />)
        fireEvent.click(
            screen.getByRole('button', { name: /change colour for A/i })
        )
        fireEvent.click(screen.getAllByRole('button', { name: '#a8bf24' })[0])
        expect(onChange).toHaveBeenCalledWith('#a8bf24')
    })
})
```

-   [ ] **Step 3: Run to verify it fails**

Run: `yarn test src/components/VisualizationOptions/Options/Colours`
Expected: FAIL — module not found.

-   [ ] **Step 4: Create `Colours.module.css`**

```css
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block-end: var(--spacers-dp8);
}

.list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--colors-grey300);
    border-radius: 3px;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacers-dp4) var(--spacers-dp8);
    border-block-end: 1px solid var(--colors-grey200);
    font-size: 14px;
    color: var(--colors-grey900);
}

.row:last-child {
    border-block-end: none;
}

.swatchButton {
    display: inline-flex;
    align-items: center;
    gap: var(--spacers-dp8);
    min-width: 120px;
    padding: var(--spacers-dp4) var(--spacers-dp8);
    background: var(--colors-white);
    border: 1px solid var(--colors-grey400);
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: var(--colors-grey800);
}

.swatchButton:hover {
    border-color: var(--colors-grey600);
}

.swatch {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
}

.swatchLabel {
    font-family: Menlo, monospace;
}

.autoLabel {
    font-weight: 500;
}

.popover {
    display: flex;
    flex-direction: column;
    gap: var(--spacers-dp12);
    width: 248px;
    padding: var(--spacers-dp12);
}

.popoverSectionTitle {
    font-size: 12px;
    color: var(--colors-grey700);
    margin-block-end: var(--spacers-dp4);
}

.autoOption {
    display: flex;
    align-items: center;
    gap: var(--spacers-dp8);
    width: 100%;
    padding: var(--spacers-dp8);
    background: var(--colors-grey050);
    border: 1px solid var(--colors-grey300);
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    text-align: start;
}

.autoOptionSelected {
    border-color: var(--colors-blue600);
    background: var(--colors-blue050);
}

.paletteRow {
    display: flex;
    gap: 2px;
    margin-block-end: 2px;
}

.paletteSwatch {
    width: 18px;
    height: 18px;
    padding: 0;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.paletteSwatchSelected {
    outline: 2px solid var(--colors-blue600);
    outline-offset: 1px;
}

.custom :global(.react-colorful) {
    width: 100%;
    height: 140px;
}

.hexInput {
    width: 100%;
    margin-block-start: var(--spacers-dp8);
    padding: var(--spacers-dp4) var(--spacers-dp8);
    border: 1px solid var(--colors-grey500);
    border-radius: 3px;
    font-family: Menlo, monospace;
    font-size: 13px;
    box-sizing: border-box;
}

.menuPalettePreview {
    display: inline-flex;
    gap: 1px;
    margin-inline-start: var(--spacers-dp8);
}

.menuPalettePreview span {
    width: 10px;
    height: 10px;
}

.fill {
    margin-block-start: var(--spacers-dp16);
}

.addSlot {
    margin-block-start: var(--spacers-dp8);
}

.positionalNote {
    font-size: 13px;
    color: var(--colors-grey700);
    margin-block-end: var(--spacers-dp8);
}
```

-   [ ] **Step 5: Create `ColorPickerPopover.jsx`**

```jsx
import i18n from '@dhis2/d2-i18n'
import { Popover } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import {
    COLOR_AUTO,
    getPaletteColors,
    getPaletteLabels,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'

const ColorPickerPopover = ({
    reference,
    metadataColor,
    value,
    onChange,
    onClose,
}) => {
    const labels = getPaletteLabels()
    const hex = value === COLOR_AUTO ? metadataColor : value

    return (
        <Popover
            reference={reference}
            placement="bottom-end"
            arrow={false}
            onClickOutside={onClose}
        >
            <div className={styles.popover}>
                {metadataColor && (
                    <button
                        type="button"
                        className={cx(styles.autoOption, {
                            [styles.autoOptionSelected]: value === COLOR_AUTO,
                        })}
                        onClick={() => onChange(COLOR_AUTO)}
                    >
                        <span
                            className={styles.swatch}
                            style={{ backgroundColor: metadataColor }}
                        />
                        <span>
                            <span className={styles.autoLabel}>
                                {i18n.t('Auto')}
                            </span>
                            {' · '}
                            {i18n.t('Use data item colour')}
                        </span>
                    </button>
                )}
                <div>
                    <div className={styles.popoverSectionTitle}>
                        {i18n.t('Palettes')}
                    </div>
                    {PALETTE_IDS.map((paletteId) => (
                        <div
                            key={paletteId}
                            className={styles.paletteRow}
                            title={labels[paletteId]}
                        >
                            {getPaletteColors(paletteId)
                                .slice(0, 12)
                                .map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        aria-label={color}
                                        className={cx(styles.paletteSwatch, {
                                            [styles.paletteSwatchSelected]:
                                                value !== COLOR_AUTO &&
                                                color.toLowerCase() ===
                                                    value?.toLowerCase(),
                                        })}
                                        style={{ backgroundColor: color }}
                                        onClick={() => onChange(color)}
                                    />
                                ))}
                        </div>
                    ))}
                </div>
                <div className={styles.custom}>
                    <div className={styles.popoverSectionTitle}>
                        {i18n.t('Custom')}
                    </div>
                    <HexColorPicker
                        color={hex || '#000000'}
                        onChange={onChange}
                    />
                    <HexColorInput
                        className={styles.hexInput}
                        color={hex || ''}
                        onChange={onChange}
                        prefixed
                    />
                </div>
            </div>
        </Popover>
    )
}

ColorPickerPopover.propTypes = {
    reference: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    metadataColor: PropTypes.string,
    value: PropTypes.string,
}

export default ColorPickerPopover
```

Note: `HexColorPicker` fires `onChange` continuously while dragging; that's fine for a prototype (the chart only re-renders on Update).

-   [ ] **Step 6: Create `SeriesColorRow.jsx`**

```jsx
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { COLOR_AUTO } from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'
import ColorPickerPopover from './ColorPickerPopover.jsx'

const SeriesColorRow = ({ name, value, metadataColor, onChange }) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)
    const isAuto = value === COLOR_AUTO
    const hex = isAuto ? metadataColor : value

    return (
        <div className={styles.row} data-test="series-colour-row">
            <span>{name}</span>
            <button
                ref={ref}
                type="button"
                className={styles.swatchButton}
                aria-label={i18n.t('Change colour for {{name}}', { name })}
                onClick={() => setOpen(true)}
            >
                <span
                    className={styles.swatch}
                    style={{ backgroundColor: hex }}
                />
                {isAuto ? (
                    <span className={styles.autoLabel}>{i18n.t('Auto')}</span>
                ) : (
                    <span className={styles.swatchLabel}>{value}</span>
                )}
            </button>
            {open && (
                <ColorPickerPopover
                    reference={ref}
                    metadataColor={metadataColor}
                    value={value}
                    onChange={onChange}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    )
}

SeriesColorRow.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    metadataColor: PropTypes.string,
    value: PropTypes.string,
}

export default SeriesColorRow
```

-   [ ] **Step 7: Run tests to verify they pass**

Run: `yarn test src/components/VisualizationOptions/Options/Colours` → PASS.
If `react-colorful` fails to import under Jest (ESM), add `react-colorful` to the existing `transformIgnorePatterns` exception list in the Jest config (check `package.json`/`jest.config.js` for where `@dhis2` exceptions live) rather than mocking it.

-   [ ] **Step 8: Lint and commit**

```bash
yarn lint
git add package.json yarn.lock src/components/VisualizationOptions/Options/Colours src/components/VisualizationOptions/styles/Colours.module.css
git commit -m "feat(prototype): series colour row and picker popover"
```

---

### Task 5: Apply menu, Colours tab container, and tab wiring

**Files:**

-   Create: `src/components/VisualizationOptions/Options/Colours/ApplyColorsMenu.jsx`
-   Create: `src/components/VisualizationOptions/Options/Colours/ColoursTab.jsx`
-   Create: `src/modules/options/tabs/colours.jsx`
-   Modify: `src/modules/options/defaultConfig.js`
-   Modify: `src/modules/options/pieConfig.jsx`

**Interfaces:**

-   Consumes: Task 1 functions/constants, `getMetadataColor` (Task 2), `SeriesColorRow` (Task 4), existing `acSetUiOptions`, `acSetUiOption`, `sGetSeriesSetupItems`, `sGetUiOptions`, `sGetUiLayout`, `sGetUiItems`, `sGetUiType`, `sGetVisualization`, `LegendDisplayStrategy`, `ShowLegendKey`.
-   Produces:

    -   `<ApplyColorsMenu showByAxis={bool} showResetToAuto={bool} onApply={(paletteId) => void} onReset={() => void} />` — By axis is only shown (and always first) when the chart uses more than one axis
    -   `getColoursTab({ showModeSwitch: bool, showFill: bool }): TabConfig`

-   [ ] **Step 1: Create `ApplyColorsMenu.jsx`**

```jsx
import i18n from '@dhis2/d2-i18n'
import { DropdownButton, FlyoutMenu, MenuDivider, MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
    getPaletteColors,
    getPaletteLabels,
    PALETTE_BY_AXIS,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'

const PalettePreview = ({ paletteId }) => (
    <span className={styles.menuPalettePreview}>
        {getPaletteColors(paletteId)
            .slice(0, 6)
            .map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
            ))}
    </span>
)

PalettePreview.propTypes = { paletteId: PropTypes.string.isRequired }

const ApplyColorsMenu = ({ showByAxis, showResetToAuto, onApply, onReset }) => {
    const [open, setOpen] = useState(false)
    const labels = getPaletteLabels()
    const apply = (paletteId) => {
        setOpen(false)
        onApply(paletteId)
    }

    return (
        <DropdownButton
            small
            secondary
            open={open}
            onClick={({ open }) => setOpen(open)}
            component={
                <FlyoutMenu dense>
                    {showByAxis && (
                        <MenuItem
                            label={i18n.t('By axis')}
                            onClick={() => apply(PALETTE_BY_AXIS)}
                        />
                    )}
                    {showByAxis && <MenuDivider dense />}
                    {PALETTE_IDS.map((paletteId) => (
                        <MenuItem
                            key={paletteId}
                            label={
                                <span>
                                    {labels[paletteId]}
                                    <PalettePreview paletteId={paletteId} />
                                </span>
                            }
                            onClick={() => apply(paletteId)}
                        />
                    ))}
                    <MenuDivider dense />
                    <MenuItem
                        label={
                            showResetToAuto
                                ? i18n.t('Reset to Auto')
                                : i18n.t('Reset colours')
                        }
                        onClick={() => {
                            setOpen(false)
                            onReset()
                        }}
                    />
                </FlyoutMenu>
            }
        >
            {i18n.t('Apply colours')}
        </DropdownButton>
    )
}

ApplyColorsMenu.propTypes = {
    onApply: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    showByAxis: PropTypes.bool,
    showResetToAuto: PropTypes.bool,
}

export default ApplyColorsMenu
```

-   [ ] **Step 2: Create `ColoursTab.jsx`**

```jsx
import {
    COLOR_SET_DEFAULT,
    hasCustomAxes,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
} from '@dhis2/analytics'
import { useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, Field, Radio, SegmentedControl } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { acSetUiOption, acSetUiOptions } from '../../../../actions/ui.js'
import { getMetadataColor } from '../../../../modules/mockMetadataColors.js'
import {
    FILL_TYPE_PATTERN,
    FILL_TYPE_SOLID,
    OPTION_COLOR_SEED,
    OPTION_COLOR_SET,
    OPTION_FILL_TYPE,
    OPTION_LEGEND,
    OPTION_LEGEND_DISPLAY_STRATEGY,
    OPTION_LEGEND_DISPLAY_STYLE,
    OPTION_LEGEND_SET,
    OPTION_POSITIONAL_COLORS,
    OPTION_SERIES,
} from '../../../../modules/options.js'
import {
    applyAxisPalette,
    applyPalette,
    DEFAULT_POSITIONAL_SLOT_COUNT,
    isLegendMode,
    isPositionalSeries,
    itemsToPositionalColors,
    mergeSeriesItems,
    PALETTE_BY_AXIS,
    positionalColorsToItems,
    resetToAuto,
    seedLegacyColors,
    seedSeriesColors,
} from '../../../../modules/seriesColors.js'
import { sGetSeriesSetupItems } from '../../../../reducers/index.js'
import {
    sGetUiItems,
    sGetUiLayout,
    sGetUiOptions,
    sGetUiType,
} from '../../../../reducers/ui.js'
import { sGetVisualization } from '../../../../reducers/visualization.js'
import styles from '../../styles/Colours.module.css'
import tabStyles from '../../styles/VisualizationOptions.module.css'
import LegendDisplayStrategy from '../LegendDisplayStrategy.jsx'
import ShowLegendKey from '../ShowLegendKey.jsx'
import ApplyColorsMenu from './ApplyColorsMenu.jsx'
import SeriesColorRow from './SeriesColorRow.jsx'

const MODE_LEGEND = 'LEGEND'
const MODE_STATIC = 'STATIC'

const ColoursTab = ({
    showModeSwitch,
    showFill,
    type,
    options,
    layoutItems,
    seriesDimensionId,
    seriesItemIds,
    isSaved,
    setOptions,
    setOption,
}) => {
    const legendMode = showModeSwitch && isLegendMode(options[OPTION_LEGEND])
    const positional = isPositionalSeries({
        type,
        dimensionId: seriesDimensionId,
        itemIds: seriesItemIds,
    })
    const paletteId = options[OPTION_COLOR_SEED] || COLOR_SET_DEFAULT
    const positionalColors = options[OPTION_POSITIONAL_COLORS] || []

    const items = positional
        ? positionalColorsToItems(
              positionalColors,
              DEFAULT_POSITIONAL_SLOT_COUNT
          )
        : mergeSeriesItems(layoutItems, options[OPTION_SERIES])

    const writeItems = (newItems, extraOptions = {}) =>
        setOptions(
            positional
                ? {
                      [OPTION_POSITIONAL_COLORS]:
                          itemsToPositionalColors(newItems),
                      ...extraOptions,
                  }
                : { [OPTION_SERIES]: newItems, ...extraOptions }
        )

    const { show: showUndo } = useAlert(
        ({ message }) => message,
        ({ onUndo }) => ({
            success: true,
            duration: 6000,
            actions: [{ label: i18n.t('Undo'), onClick: onUndo }],
        })
    )

    // Seed once when the tab opens: legacy charts freeze their colour set, everything else gets Auto/seed
    useEffect(() => {
        const hasStoredColors = positional
            ? positionalColors.length > 0
            : items.some((item) => item.color)

        if (isSaved && !hasStoredColors) {
            const legacy = seedLegacyColors({
                items,
                colorSet: options[OPTION_COLOR_SET],
            })
            writeItems(legacy.items, {
                [OPTION_COLOR_SEED]: legacy.colorSeed,
                [OPTION_FILL_TYPE]: legacy.fillType,
            })
        } else {
            writeItems(seedSeriesColors({ items, paletteId, getMetadataColor }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onModeChange = ({ value }) => {
        if (value === MODE_LEGEND) {
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
            })
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: LEGEND_DISPLAY_STYLE_FILL,
            })
        } else {
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_FIXED,
            })
            setOption({ optionId: OPTION_LEGEND_SET, value: undefined })
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: undefined,
            })
        }
    }

    const onApply = (appliedPaletteId) => {
        const previous = {
            items,
            seed: options[OPTION_COLOR_SEED],
        }

        if (appliedPaletteId === PALETTE_BY_AXIS) {
            writeItems(applyAxisPalette({ items }))
        } else {
            writeItems(applyPalette({ items, paletteId: appliedPaletteId }), {
                [OPTION_COLOR_SEED]: appliedPaletteId,
            })
        }

        showUndo({
            message: i18n.t('Colours applied'),
            onUndo: () =>
                writeItems(previous.items, {
                    [OPTION_COLOR_SEED]: previous.seed,
                }),
        })
    }

    const onReset = () =>
        writeItems(resetToAuto({ items, paletteId, getMetadataColor }))

    const onItemChange = (dimensionItem, color) =>
        writeItems(
            items.map((item) =>
                item.dimensionItem === dimensionItem ? { ...item, color } : item
            )
        )

    const onAddSlot = () =>
        writeItems(
            seedSeriesColors({
                items: [
                    ...items,
                    ...positionalColorsToItems([], items.length + 1).slice(
                        items.length
                    ),
                ],
                paletteId,
                getMetadataColor,
            })
        )

    return (
        <div className={tabStyles.tabSectionOption}>
            {showModeSwitch && (
                <div className={tabStyles.tabSectionOption}>
                    <SegmentedControl
                        options={[
                            { label: i18n.t('Legend'), value: MODE_LEGEND },
                            { label: i18n.t('Static'), value: MODE_STATIC },
                        ]}
                        selected={legendMode ? MODE_LEGEND : MODE_STATIC}
                        onChange={onModeChange}
                    />
                </div>
            )}
            {legendMode ? (
                <>
                    <div className={tabStyles.tabSectionOption}>
                        <LegendDisplayStrategy />
                    </div>
                    <ShowLegendKey />
                </>
            ) : (
                <>
                    <div className={styles.header}>
                        <span className={tabStyles.tabSectionTitle}>
                            {i18n.t('Series colours')}
                        </span>
                        <ApplyColorsMenu
                            showByAxis={!positional && hasCustomAxes(items)}
                            showResetToAuto={!positional}
                            onApply={onApply}
                            onReset={onReset}
                        />
                    </div>
                    {positional && (
                        <p className={styles.positionalNote}>
                            {i18n.t(
                                'These items change over time, so colours are applied in order.'
                            )}
                        </p>
                    )}
                    <div className={styles.list}>
                        {items.map((item) => (
                            <SeriesColorRow
                                key={item.dimensionItem}
                                name={item.name || item.dimensionItem}
                                value={item.color}
                                metadataColor={getMetadataColor(
                                    item.dimensionItem
                                )}
                                onChange={(color) =>
                                    onItemChange(item.dimensionItem, color)
                                }
                            />
                        ))}
                    </div>
                    {positional && (
                        <div className={styles.addSlot}>
                            <Button small secondary onClick={onAddSlot}>
                                {i18n.t('Add item')}
                            </Button>
                        </div>
                    )}
                    {showFill && (
                        <div className={styles.fill}>
                            <Field label={i18n.t('Fill')} dense>
                                {[
                                    [FILL_TYPE_SOLID, i18n.t('Solid')],
                                    [FILL_TYPE_PATTERN, i18n.t('Pattern')],
                                ].map(([value, label]) => (
                                    <Radio
                                        key={value}
                                        dense
                                        label={label}
                                        value={value}
                                        checked={
                                            (options[OPTION_FILL_TYPE] ||
                                                FILL_TYPE_SOLID) === value
                                        }
                                        onChange={() =>
                                            setOptions({
                                                [OPTION_FILL_TYPE]: value,
                                            })
                                        }
                                    />
                                ))}
                            </Field>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

ColoursTab.propTypes = {
    layoutItems: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    setOption: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    isSaved: PropTypes.bool,
    seriesDimensionId: PropTypes.string,
    seriesItemIds: PropTypes.array,
    showFill: PropTypes.bool,
    showModeSwitch: PropTypes.bool,
}

const mapStateToProps = (state) => {
    const seriesDimensionId = sGetUiLayout(state).columns[0]

    return {
        type: sGetUiType(state),
        options: sGetUiOptions(state),
        layoutItems: sGetSeriesSetupItems(state),
        seriesDimensionId,
        seriesItemIds: sGetUiItems(state)[seriesDimensionId] || [],
        isSaved: Boolean(sGetVisualization(state)?.id),
    }
}

const mapDispatchToProps = (dispatch) => ({
    setOptions: (value) => dispatch(acSetUiOptions(value)),
    setOption: (value) => dispatch(acSetUiOption(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColoursTab)
```

Verify while implementing: `sGetUiItems` is exported from `src/reducers/ui.js` (it's used by `sGetAxisSetup`); `acSetUiOptions` merges into `ui.options` (check the `SET_UI_OPTIONS` reducer case — if it replaces instead of merges, spread `options` in `setOptions`). `LegendDisplayStrategy` and `ShowLegendKey` take an optional `disabled` prop and are default exports.

-   [ ] **Step 3: Create `src/modules/options/tabs/colours.jsx`**

```jsx
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import ColoursTab from '../../../components/VisualizationOptions/Options/Colours/ColoursTab.jsx'

export default ({ showModeSwitch = false, showFill = true } = {}) => ({
    key: 'colours-tab',
    label: i18n.t('Legend & Colours'),
    content: [
        {
            key: 'colours-section-1',
            content: React.Children.toArray([
                <ColoursTab
                    showModeSwitch={showModeSwitch}
                    showFill={showFill}
                />,
            ]),
        },
    ],
})
```

-   [ ] **Step 4: Wire `defaultConfig.js`**

-   Replace the `getLegendTab` and `getColorSetSection` imports with `import getColoursTab from './tabs/colours.jsx'` and add `VIS_TYPE_LINE, VIS_TYPE_YEAR_OVER_YEAR_LINE, VIS_TYPE_RADAR` imports from `@dhis2/analytics`.
-   Add a `type` param to the default export's destructured props, and pass `type` from `getOptionsByType` in `config.js` (`defaultProps` gets `type`).
-   Replace `...(supportsLegends ? [getLegendTab({ hideStyleOptions: true })] : []),` with:

```js
    getColoursTab({
        showModeSwitch: supportsLegends,
        showFill: ![
            VIS_TYPE_LINE,
            VIS_TYPE_YEAR_OVER_YEAR_LINE,
            VIS_TYPE_RADAR,
        ].includes(type),
    }),
```

-   Remove `getColorSetSection(hasDisabledSections),` from the Style tab.
-   In `defaultOptionNames`, keep `OPTION_COLOR_SET` (hidden legacy fallback) and add `OPTION_COLOR_SEED, OPTION_FILL_TYPE, OPTION_POSITIONAL_COLORS` (import them from `../options.js`).

-   [ ] **Step 5: Wire `pieConfig.jsx`**

-   Import `getColoursTab from './tabs/colours.jsx'` and `OPTION_COLOR_SEED, OPTION_FILL_TYPE, OPTION_POSITIONAL_COLORS` from `../options.js`; drop the `getColorSetSection` import.
-   Config becomes:

```js
export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    getColoursTab(),
    getSeriesTab(),
    getStyleTab([getTitlesSection()]),
    getLimitValuesTab(),
]
```

-   Add `OPTION_COLOR_SEED, OPTION_FILL_TYPE, OPTION_POSITIONAL_COLORS` to `pieOptionNames` (keep `OPTION_COLOR_SET`).

-   [ ] **Step 6: Run the full test suite and lint**

Run: `yarn test` → PASS (update any snapshot that legitimately changed because the Legend tab/Color set section moved: `yarn test -u` only for snapshots under `src/modules/options` or `VisualizationOptions`, and eyeball the diff).
Run: `yarn lint` → clean. Also run `yarn d2-app-scripts i18n extract` if the repo's lint checks for missing translation keys (check `package.json` scripts).

-   [ ] **Step 7: Commit**

```bash
git add src/components/VisualizationOptions/Options/Colours src/modules/options
git commit -m "feat(prototype): Legend & Colours options tab"
```

---

### Task 6: Scenario walk-through

**Files:** none (verification only; fix bugs found in the owning task's files and commit with `fix(prototype): …`)

-   [ ] **Step 1:** `yarn start`, log in to the demo instance.
-   [ ] **Step 2: New column chart.** Series: ANC 1st, 2nd, 3rd visit. Options → Legend & Colours. Expect: mode switch on Static; rows show `Auto` (blue), `Auto` (green), `#a8bf24`. Update → bars match.
-   [ ] **Step 3: Picker.** Click ANC 3rd swatch: no Auto option; pick Bright first colour → row shows `#fd7f6f`. Click ANC 1st swatch: Auto option present and selected; drag custom picker → row becomes hex.
-   [ ] **Step 4: Apply + Undo.** Apply colours ▸ Color blind → all three rows hex from Color blind (Auto rows overwritten). Snackbar Undo → previous state restored. Re-apply Color blind, close, add ANC 4th visit to series, reopen → new row gets the next unused Color blind colour.
-   [ ] **Step 5: Reset to Auto.** → ANC 1st/2nd back to Auto, others re-seeded from Color blind.
-   [ ] **Step 6: Legend mode.** Switch to Legend → legend strategy + key options appear; Update → legend colours (stored static colours not applied). Switch back to Static → rows still there.
-   [ ] **Step 7: Fill pattern.** Fill: Pattern → Update → hatched bars in each row's colour.
-   [ ] **Step 8: Multi-axis.** Series tab: put ANC 2nd on axis 2. Legend & Colours ▸ Apply colours shows _By axis_ first; apply → axis-1 rows blue family, axis-2 red. Axis labels stay grey.
-   [ ] **Step 9: Line + pie.** Switch to Line → no mode switch, no Fill. Switch to Pie → slices coloured from rows.
-   [ ] **Step 10: Positional.** Column chart with Period (Last 4 quarters) as series → rows "Item 1…4" with note; change Item 2; Update → second series uses it. Add item → Item 5.
-   [ ] **Step 11: Year over year.** Year-over-year line → positional rows, no mode switch, no Fill.
-   [ ] **Step 12: Legacy charts.** Open a saved chart with Bright colour set → renders identical to `master`; open Legend & Colours → rows frozen Bright hex (no Auto even for ANC 1st). Saved Patterns chart (save one from `master` if none) → Fill: Pattern pre-selected. Saved multi-axis chart → axis families frozen.
-   [ ] **Step 13: Gauge / single value / pivot table** → tab still called "Legend", unchanged.
-   [ ] **Step 14: Save.** Save a chart with custom colours → no error; reopen → legacy behaviour (expected: colours are not persisted in the prototype).
-   [ ] **Step 15:** Commit any fixes; push the branch if asked.

## Known prototype gaps (do not fix)

-   Trend lines keep analytics' colours.
-   Two-category charts and stacked trend lines are not specially handled.
-   Colours aren't persisted; metadata colours are mocked.
-   `HexColorPicker` dispatches on every drag frame.
