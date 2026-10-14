# Colour By + Series Overrides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the series-colours prototype so chart-level colour ("Colour by: Legend | Palette | Single colour" + Fill) lives in a restored "Legend & Colours" tab, and the Series tab becomes per-series overrides that show the resolved colour of every series.

**Architecture:** One pure resolver, `resolveSeriesColors`, in `src/modules/seriesColors.js` turns (series items + chart-level colour options) into `[{ color, source, isOverride }]`. The Series tab uses it to draw swatches; the renderer (`renderSeriesColors.js`) uses it to recolour Highcharts. Chart-level settings are new UI-only options initialised once per chart by a shared hook. The one-shot "Apply colours" model (seeding, apply, reset, `colorSeed`) is deleted.

**Tech Stack:** React 18, Redux (`react-redux` hooks + `connect`), `@dhis2/ui`, `@dhis2/analytics` (Highcharts), `react-colorful`, Jest + Testing Library via `d2-app-scripts test`.

**Spec:** `docs/superpowers/specs/2026-10-13-series-colours-design.md`. The section **"Revision 2026-10-14 (b)"** is authoritative and supersedes earlier sections where they conflict.

## Global Constraints

- Prototype only: no `@dhis2/analytics` changes, no backend changes. Colour options are UI-only (`savable: false`). `series[].color` is already stripped on save in `src/modules/visualization.js`; leave that as it is.
- Old saved chart with no colour state in the UI (`colorMode` undefined and `visualization.id` set): the renderer returns `null`, so analytics colours it exactly as today.
- Precedence per series: Legend mode > override (hex or `AUTO`) > metadata colour (Palette mode with `useItemColors` only) > chart default (palette colour **at the series' index**, axis family for `BY_AXIS`, or the single colour).
- Palette colours are positional: series *i* gets `palette[i % palette.length]` regardless of overrides before it.
- `BY_AXIS` appears in the Palette select only when `hasCustomAxes(series)` is true, or when it is already the selected value.
- Legend option is offered only where `isLegendSetType(type)` (column, bar, stacked column, stacked bar). Fill is hidden for `LINE`, `YEAR_OVER_YEAR_LINE` and `RADAR`.
- New option keys: `colorMode` (`'PALETTE' | 'SINGLE'`), `colorPalette` (colour set id or `'BY_AXIS'`), `useItemColors` (bool), `singleColor` (hex). Defaults are `undefined` in `options.js`; "undefined colorMode" is how a not-yet-initialised chart is detected.
- New chart init: `{ colorMode: 'PALETTE', colorPalette: 'DEFAULT', useItemColors: true, fillType: 'SOLID' }`. Saved chart init: palette = `BY_AXIS` if custom axes, else its `colorSet` (Patterns or missing → `DEFAULT`); `useItemColors: false`; `fillType: 'PATTERN'` only for the Patterns colour set.
- UI strings (exact): "Legend & Colours", "Colour by", "Legend", "Palette", "Single colour", "Use automatic data item colours where available", "By axis", "Fill", "Solid", "Pattern", "Set by legend", "Colours are set by the legend in Legend & Colours", "Series with relative selections change over time, so colours follow the chart setting in order. Colour, type and axis can only be set per item for fixed selections.", "Reset colour for {{name}}".
- Code style: match surrounding code (4-space indent, no semicolons, single quotes, `i18n.t()` for all user-facing strings, CSS modules). Run `yarn lint` before each commit.
- **Commits are GPG-signed by the user.** In every Commit step: `git add` the listed files, then print the `git commit -S -m "..."` command for the user to run, and wait. Do not commit yourself. End each message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Series overridden to `AUTO` whose metadata colour no longer exists**: it must fall back to the chart default colour, not render `undefined` or black. Test in Task 1.
2. **Switching Palette → Single colour → Palette**: overrides survive and the palette comes back unchanged. The resolver ignores mode for overrides; tested in Task 1. The UI writes only `colorMode`, never `series`; tested in Task 4.
3. **`BY_AXIS` selected, then every series moved back to axis 1**: the select must still show "By axis" (no blank select) and the colours become the axis-1 gradient. Tests in Task 1 (resolver) and Task 4 (select option kept).
4. **More series than palette colours**: colours cycle and are never `undefined`. Test in Task 1.
5. **Saved legacy chart rendered before any options tab is opened**: `getRenderColors` returns `null`. After a tab opens and init runs, the colours equal the chart's colour set by position. Tests in Task 2.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/modules/options.js` (modify) | Register `colorMode`, `colorPalette`, `useItemColors`, `singleColor` (UI-only); remove `colorSeed` (Task 5) |
| `src/modules/seriesColors.js` (modify) | Pure model: constants, `getAxisColors`, `resolveSeriesColors`, `getInitialColourOptions`; old seed/apply/reset helpers deleted in Task 5 |
| `src/modules/renderSeriesColors.js` (modify) | `getRenderColors` becomes a thin wrapper around the resolver |
| `src/components/VisualizationOptions/Options/Colours/useColourOptionsInit.js` (create) | Hook: write the initial colour options once if `colorMode` is undefined |
| `src/components/VisualizationOptions/Options/Colours/SeriesColorButton.jsx` (modify) | Swatch button showing an inherited state (greyed source label) or an override (hex / Auto + ↺) |
| `src/components/VisualizationOptions/Options/Colours/ColorPickerPopover.jsx` (modify) | Take `currentColor` for the custom picker instead of deriving it |
| `src/components/VisualizationOptions/Options/Colours/ColourByControl.jsx` (create) | Connected Legend & Colours tab body: segmented control, palette/checkbox, single colour, legend settings, fill |
| `src/modules/options/tabs/legendColours.jsx` (create) | Tab config `getLegendColoursTab({ showLegend, showFill })` |
| `src/modules/options/defaultConfig.js`, `pieConfig.jsx` (modify) | Add the new tab, simplify the Series tab props, register option names |
| `src/modules/options/tabs/series.jsx` (modify) | Drop `showModeSwitch` / `showFill` |
| `src/components/VisualizationOptions/Options/SeriesTable.jsx` (rewrite) | Overrides table: resolved swatches, ↺ reset, legend-disabled cell, relative note |
| `src/components/VisualizationOptions/Options/Colours/ApplyColorsMenu.jsx` (delete) | Removed with "Apply colours" |
| `src/components/VisualizationOptions/styles/Colours.module.css` (modify) | Add `.inheritedLabel`, `.resetButton`, `.legendCell`, `.colourBy`, `.modeRow`; drop unused classes |

---

### Task 1: Resolver and colour options

**Files:**
- Modify: `src/modules/options.js`
- Modify: `src/modules/seriesColors.js`
- Modify: `src/modules/options/defaultConfig.js` (option names only)
- Modify: `src/modules/options/pieConfig.jsx` (option names only)
- Test: `src/modules/__tests__/seriesColors.spec.js`

**Interfaces:**
- Produces (`options.js`): `OPTION_COLOR_MODE = 'colorMode'`, `OPTION_COLOR_PALETTE = 'colorPalette'`, `OPTION_USE_ITEM_COLORS = 'useItemColors'`, `OPTION_SINGLE_COLOR = 'singleColor'`.
- Produces (`seriesColors.js`):
  - `COLOR_MODE_PALETTE = 'PALETTE'`, `COLOR_MODE_SINGLE = 'SINGLE'`
  - `COLOR_SOURCE_PALETTE = 'PALETTE'`, `COLOR_SOURCE_SINGLE = 'SINGLE'`, `COLOR_SOURCE_AUTO = 'AUTO'`, `COLOR_SOURCE_CUSTOM = 'CUSTOM'`
  - `DEFAULT_SINGLE_COLOR: string` (first colour of the Default set)
  - `getAxisColors(items: Item[]): string[]`
  - `resolveSeriesColors({ items, colorMode?, colorPalette?, singleColor?, useItemColors?, getMetadataColor }): { color: string, source: string, isOverride: boolean }[]`
  - `getInitialColourOptions({ colorSet?, series?, isSaved }): { colorMode, colorPalette, useItemColors, fillType }` (keys are the option ids)
  - `getPaletteLabels()` now also contains `[PALETTE_BY_AXIS]: 'By axis'`
  - Unchanged and still used: `COLOR_AUTO`, `PALETTE_BY_AXIS`, `PALETTE_IDS`, `getPaletteColors`, `mergeSeriesItems`, `isLegendMode`, `isPositionalSeries`
  - `Item = { dimensionItem: string, name?: string, axis?: number, type?: string, color?: 'AUTO' | string }`

- [ ] **Step 1: Write the failing tests**

Append to `src/modules/__tests__/seriesColors.spec.js`. Add `COLOR_SET_DEFAULT`, `COLOR_SET_PATTERNS` and `COLOR_SET_BRIGHT` to the existing `@dhis2/analytics` import if they are missing, and add the new names to the `../seriesColors.js` import:

```js
import {
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
```

```js
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
            { color: BRIGHT[0], source: COLOR_SOURCE_PALETTE, isOverride: false },
            { color: BRIGHT[1], source: COLOR_SOURCE_PALETTE, isOverride: false },
        ])
    })

    it('does not shift later palette colours when an earlier series is overridden', () => {
        const result = resolve(
            [
                { dimensionItem: 'a', color: '#ff0000' },
                { dimensionItem: 'b' },
            ],
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
            { color: DEFAULT[1], source: COLOR_SOURCE_PALETTE, isOverride: false },
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
```

- [ ] **Step 2: Run the tests and check they fail**

Run: `yarn test src/modules/__tests__/seriesColors.spec.js`
Expected: FAIL, because `resolveSeriesColors` / `getAxisColors` / `getInitialColourOptions` are not exported.

- [ ] **Step 3: Register the options**

In `src/modules/options.js`, next to `OPTION_COLOR_SEED`, add the exports (keep the list alphabetical):

```js
export const OPTION_COLOR_MODE = 'colorMode'
export const OPTION_COLOR_PALETTE = 'colorPalette'
```

and next to `OPTION_SERIES_KEY` / `OPTION_SHOW_DATA`:

```js
export const OPTION_SINGLE_COLOR = 'singleColor'
export const OPTION_USE_ITEM_COLORS = 'useItemColors'
```

In the `options` object, after the `OPTION_FILL_TYPE` entry:

```js
    [OPTION_COLOR_MODE]: {
        defaultValue: undefined,
        requestable: false,
        savable: false,
    },
    [OPTION_COLOR_PALETTE]: {
        defaultValue: undefined,
        requestable: false,
        savable: false,
    },
    [OPTION_USE_ITEM_COLORS]: {
        defaultValue: undefined,
        requestable: false,
        savable: false,
    },
    [OPTION_SINGLE_COLOR]: {
        defaultValue: undefined,
        requestable: false,
        savable: false,
    },
```

In `src/modules/options/defaultConfig.js` (`defaultOptionNames`) and `src/modules/options/pieConfig.jsx` (`pieOptionNames`), add the four new ids under the `// Series tab colours (prototype)` comment, next to `OPTION_COLOR_SEED` and `OPTION_FILL_TYPE`, and import them from `../options.js`. Without this, `filterVisualizationOptionsByType` drops them before they reach the renderer.

- [ ] **Step 4: Implement the resolver**

In `src/modules/seriesColors.js`:

1. `FILL_TYPE_SOLID` / `FILL_TYPE_PATTERN` are already imported. Add the constants after `PALETTE_BY_AXIS`:

```js
export const COLOR_MODE_PALETTE = 'PALETTE'
export const COLOR_MODE_SINGLE = 'SINGLE'

export const COLOR_SOURCE_PALETTE = 'PALETTE'
export const COLOR_SOURCE_SINGLE = 'SINGLE'
export const COLOR_SOURCE_AUTO = 'AUTO'
export const COLOR_SOURCE_CUSTOM = 'CUSTOM'

export const DEFAULT_SINGLE_COLOR = colorSets[COLOR_SET_DEFAULT].colors[0]
```

2. In `getPaletteLabels`, add `[PALETTE_BY_AXIS]: i18n.t('By axis'),` as the last entry.

3. Replace the body of `applyAxisPalette` with a colour-only helper and keep `applyAxisPalette` as a wrapper. It is still imported by `SeriesTable` until Task 5:

```js
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

export const applyAxisPalette = ({ items }) => {
    const colors = getAxisColors(items)

    return items.map((item, index) => ({ ...item, color: colors[index] }))
}
```

4. Add the resolver and the init helper (after `resolveItemColor`):

```js
const getDefaultColors = ({ items, colorMode, colorPalette, singleColor }) => {
    if (colorMode === COLOR_MODE_SINGLE) {
        return items.map(() => singleColor || DEFAULT_SINGLE_COLOR)
    }

    if (colorPalette === PALETTE_BY_AXIS) {
        return getAxisColors(items)
    }

    const palette = getPaletteColors(colorPalette)

    return items.map((_, index) => palette[index % palette.length])
}

// Precedence: override > metadata colour (palette + useItemColors) > chart default by position
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

        if (item.color && item.color !== COLOR_AUTO) {
            return {
                color: item.color,
                source: COLOR_SOURCE_CUSTOM,
                isOverride: true,
            }
        }

        if (useItemColors && colorMode === COLOR_MODE_PALETTE && metadataColor) {
            return {
                color: metadataColor,
                source: COLOR_SOURCE_AUTO,
                isOverride: false,
            }
        }

        return { color: defaults[index], source: defaultSource, isOverride: false }
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
```

Note: the keys returned by `getInitialColourOptions` equal the option ids (`colorMode`, `colorPalette`, `useItemColors`, `fillType`), so callers can pass the result straight to `acSetUiOptions`.

- [ ] **Step 5: Run the tests and check they pass**

Run: `yarn test src/modules/__tests__/seriesColors.spec.js`
Expected: PASS (old tests for the seeding helpers still pass; they are removed in Task 5).

- [ ] **Step 6: Commit**

```bash
yarn lint
git add src/modules/options.js src/modules/seriesColors.js src/modules/options/defaultConfig.js src/modules/options/pieConfig.jsx src/modules/__tests__/seriesColors.spec.js
```
Hand the user: `git commit -S -m "feat: add series colour resolver and colour-by options" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 2: Renderer uses the resolver

**Files:**
- Modify: `src/modules/renderSeriesColors.js`
- Test: `src/modules/__tests__/renderSeriesColors.spec.js`

**Interfaces:**
- Consumes: `resolveSeriesColors`, `getInitialColourOptions`, `isLegendMode`, `isPositionalSeries`, `COLOR_MODE_*` from Task 1; `OPTION_COLOR_MODE`, `OPTION_COLOR_PALETTE`, `OPTION_SINGLE_COLOR`, `OPTION_USE_ITEM_COLORS` from `options.js`.
- Produces: `getRenderColors({ visualization, seriesIds, positional, getMetadataColor }): string[] | null` (same signature as before); `applySeriesColorsToChart(chart, visualization)` (unchanged signature).

- [ ] **Step 1: Rewrite the `getRenderColors` tests**

In `src/modules/__tests__/renderSeriesColors.spec.js`, replace the whole `describe('getRenderColors', ...)` block with the block below, and import `COLOR_MODE_PALETTE`, `COLOR_MODE_SINGLE`, `PALETTE_BY_AXIS` from `../seriesColors.js` (keep `COLOR_AUTO`):

```js
describe('getRenderColors', () => {
    const render = (visualization, seriesIds = ['a', 'm'], positional = false) =>
        getRenderColors({
            visualization,
            seriesIds,
            positional,
            getMetadataColor,
        })

    it('returns null in legend mode even with overrides', () => {
        expect(
            render({
                type: VIS_TYPE_COLUMN,
                colorMode: COLOR_MODE_PALETTE,
                legend: { strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM },
                series: [{ dimensionItem: 'a', color: '#ffffff' }],
            })
        ).toBeNull()
    })

    it('returns null for a saved chart whose colour options were never initialised', () => {
        expect(
            render({ id: 'saved', colorSet: COLOR_SET_BRIGHT, series: [] })
        ).toBeNull()
    })

    it('matches the colour set by position once a saved chart is initialised', () => {
        expect(
            render({
                id: 'saved',
                colorMode: COLOR_MODE_PALETTE,
                colorPalette: COLOR_SET_BRIGHT,
                useItemColors: false,
                series: [],
            })
        ).toEqual([BRIGHT[0], BRIGHT[1]])
    })

    it('uses new-chart defaults (Default palette, item colours on) before init', () => {
        expect(render({ series: [] })).toEqual([DEFAULT[0], '#123456'])
    })

    it('applies overrides over the single colour', () => {
        expect(
            render({
                colorMode: COLOR_MODE_SINGLE,
                singleColor: '#00ff00',
                series: [{ dimensionItem: 'a', color: '#ff0000' }],
            })
        ).toEqual(['#ff0000', '#00ff00'])
    })

    it('ignores stored overrides for relative series and colours them in order', () => {
        expect(
            render(
                {
                    colorMode: COLOR_MODE_PALETTE,
                    colorPalette: COLOR_SET_BRIGHT,
                    series: [{ dimensionItem: 'a', color: '#ff0000' }],
                },
                ['a', 'b', 'c'],
                true
            )
        ).toEqual([BRIGHT[0], BRIGHT[1], BRIGHT[2]])
    })

    it('reads axes from stored series for By axis', () => {
        expect(
            render({
                colorMode: COLOR_MODE_PALETTE,
                colorPalette: PALETTE_BY_AXIS,
                series: [
                    { dimensionItem: 'a', axis: 0 },
                    { dimensionItem: 'm', axis: 1 },
                ],
            })
        ).toEqual(['#4292c6', '#cb181d'])
    })
})
```

In the same file, in the test `'skips linear trend lines (type line) so positional colours do not shift'`, replace `colorSeed: COLOR_SET_BRIGHT,` with:

```js
            colorMode: COLOR_MODE_PALETTE,
            colorPalette: COLOR_SET_BRIGHT,
```

Remove `COLOR_AUTO` from the import if nothing else in the file uses it. The `applySeriesColorsToChart` tests need no other changes: they have no `id` and use hex overrides, so they resolve exactly as before.

- [ ] **Step 2: Run the tests and check they fail**

Run: `yarn test src/modules/__tests__/renderSeriesColors.spec.js`
Expected: FAIL (e.g. "matches the colour set by position once a saved chart is initialised" returns `null`, and the trend-line test uses the wrong palette).

- [ ] **Step 3: Implement**

In `src/modules/renderSeriesColors.js`:
- Remove imports `COLOR_SET_DEFAULT`, `getNextSeedColor`, `getPaletteColors`, `resolveItemColor`, `seedSeriesColors`.
- Delete `fillSeedColors`.
- Import `OPTION_COLOR_MODE`, `OPTION_COLOR_PALETTE`, `OPTION_SINGLE_COLOR`, `OPTION_USE_ITEM_COLORS` (plus the existing `FILL_TYPE_PATTERN`) from `./options.js`, and `getInitialColourOptions`, `resolveSeriesColors` from `./seriesColors.js`.
- Replace `getRenderColors` with:

```js
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
```

`applySeriesColorsToChart` and `getFill` stay as they are.

- [ ] **Step 4: Run the tests and check they pass**

Run: `yarn test src/modules/__tests__/renderSeriesColors.spec.js src/components/VisualizationPlugin`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
yarn lint
git add src/modules/renderSeriesColors.js src/modules/__tests__/renderSeriesColors.spec.js
```
Hand the user: `git commit -S -m "feat: render series colours through the shared resolver" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 3: Colour button shows inherited vs override, with reset

**Files:**
- Modify: `src/components/VisualizationOptions/Options/Colours/SeriesColorButton.jsx`
- Modify: `src/components/VisualizationOptions/Options/Colours/ColorPickerPopover.jsx`
- Modify: `src/components/VisualizationOptions/styles/Colours.module.css`
- Test: `src/components/VisualizationOptions/Options/Colours/__tests__/SeriesColorButton.spec.jsx`

**Interfaces:**
- Produces: `<SeriesColorButton name value color sourceLabel metadataColor onChange onReset />`
  - `name: string` (required): used in aria-labels
  - `value?: 'AUTO' | string`: the override; `undefined` means inherited
  - `color: string` (required): the resolved colour to draw in the swatch
  - `sourceLabel?: string`: greyed text shown when `value` is undefined
  - `metadataColor?: string`: enables "Auto" in the picker
  - `onChange(color: 'AUTO' | string)` (required)
  - `onReset?()`: when given and `value` is set, a ↺ button is rendered
- Produces: `<ColorPickerPopover reference metadataColor value currentColor onChange onClose />` (adds `currentColor`).

- [ ] **Step 1: Write the failing tests**

Replace the contents of `SeriesColorButton.spec.jsx` with:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { COLOR_AUTO } from '../../../../../modules/seriesColors.js'
import SeriesColorButton from '../SeriesColorButton.jsx'

const renderButton = (props) =>
    render(
        <SeriesColorButton
            name="ANC 1st visit"
            color="#a8bf24"
            onChange={jest.fn()}
            {...props}
        />
    )

describe('SeriesColorButton', () => {
    it('shows the greyed source label and no reset when inherited', () => {
        renderButton({ sourceLabel: 'Palette', onReset: jest.fn() })

        expect(screen.getByText('Palette')).toHaveClass('inheritedLabel')
        expect(
            screen.queryByLabelText('Reset colour for ANC 1st visit')
        ).not.toBeInTheDocument()
    })

    it('shows the hex and a reset button for a hex override', () => {
        const onReset = jest.fn()
        renderButton({ value: '#a8bf24', sourceLabel: 'Palette', onReset })

        expect(screen.getByText('#a8bf24')).toBeInTheDocument()
        expect(screen.queryByText('Palette')).not.toBeInTheDocument()

        fireEvent.click(screen.getByLabelText('Reset colour for ANC 1st visit'))
        expect(onReset).toHaveBeenCalled()
    })

    it('shows "Auto" in normal text for an Auto override', () => {
        renderButton({
            value: COLOR_AUTO,
            color: '#1565c0',
            metadataColor: '#1565c0',
            onReset: jest.fn(),
        })

        expect(screen.getByText('Auto')).not.toHaveClass('inheritedLabel')
        expect(
            screen.getByLabelText('Reset colour for ANC 1st visit')
        ).toBeInTheDocument()
    })

    it('offers Auto in the popover only when a metadata colour exists', () => {
        const { unmount } = renderButton({ metadataColor: '#1565c0' })
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(screen.getByText('Use data item colour')).toBeInTheDocument()
        unmount()

        renderButton({})
        fireEvent.click(screen.getByTestId('series-colour-button'))
        expect(
            screen.queryByText('Use data item colour')
        ).not.toBeInTheDocument()
    })

    it('reports a palette swatch pick through onChange', () => {
        const onChange = jest.fn()
        renderButton({ onChange })

        fireEvent.click(screen.getByTestId('series-colour-button'))
        fireEvent.click(screen.getAllByRole('button', { name: /^#/ })[0])

        expect(onChange).toHaveBeenCalledWith(
            expect.stringMatching(/^#[0-9a-f]{6}$/i)
        )
    })
})
```

(CSS modules are mapped to identity class names in this Jest setup: the previous spec and `SeriesTable` already rely on that. If `toHaveClass('inheritedLabel')` fails because of the mapping, check `jest.config`/`moduleNameMapper` and assert on `data-test="series-colour-inherited"` instead, adding that attribute to the span.)

- [ ] **Step 2: Run the tests and check they fail**

Run: `yarn test src/components/VisualizationOptions/Options/Colours`
Expected: FAIL (no source label, no reset button).

- [ ] **Step 3: Implement**

`SeriesColorButton.jsx`, full contents:

```jsx
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { COLOR_AUTO } from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'
import ColorPickerPopover from './ColorPickerPopover.jsx'

const SeriesColorButton = ({
    name,
    value,
    color,
    sourceLabel,
    metadataColor,
    onChange,
    onReset,
}) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)

    const renderLabel = () => {
        if (value === COLOR_AUTO) {
            return <span className={styles.autoLabel}>{i18n.t('Auto')}</span>
        }

        if (value) {
            return <span className={styles.swatchLabel}>{value}</span>
        }

        return <span className={styles.inheritedLabel}>{sourceLabel}</span>
    }

    return (
        <span className={styles.colourCell}>
            <button
                ref={ref}
                type="button"
                data-test="series-colour-button"
                className={styles.swatchButton}
                aria-label={i18n.t('Change colour for {{name}}', { name })}
                onClick={() => setOpen(true)}
            >
                <span
                    className={styles.swatch}
                    style={{ backgroundColor: color }}
                />
                {renderLabel()}
            </button>
            {onReset && value && (
                <button
                    type="button"
                    className={styles.resetButton}
                    aria-label={i18n.t('Reset colour for {{name}}', { name })}
                    title={i18n.t('Reset colour for {{name}}', { name })}
                    onClick={onReset}
                >
                    ↺
                </button>
            )}
            {open && (
                <ColorPickerPopover
                    reference={ref}
                    metadataColor={metadataColor}
                    value={value}
                    currentColor={color}
                    onChange={onChange}
                    onClose={() => setOpen(false)}
                />
            )}
        </span>
    )
}

SeriesColorButton.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    metadataColor: PropTypes.string,
    sourceLabel: PropTypes.string,
    value: PropTypes.string,
    onReset: PropTypes.func,
}

export default SeriesColorButton
```

`ColorPickerPopover.jsx`: add a `currentColor` prop (PropTypes `string`), delete the line `const hex = value === COLOR_AUTO ? metadataColor : value`, and use `currentColor` in its place in both `HexColorPicker color={currentColor || '#000000'}` and `HexColorInput color={currentColor || ''}`.

`Colours.module.css`, add:

```css
.colourCell {
    display: inline-flex;
    align-items: center;
    gap: var(--spacers-dp4);
}

.inheritedLabel {
    color: var(--colors-grey600);
    font-style: italic;
}

.resetButton {
    padding: 0 var(--spacers-dp4);
    background: none;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 15px;
    color: var(--colors-grey700);
}

.resetButton:hover {
    background: var(--colors-grey200);
    color: var(--colors-grey900);
}
```

Callers: `SeriesTable` still passes the old props (`value`, `metadataColor`, `onChange`) until Task 5. To keep it working in between, add `color={item.color === COLOR_AUTO ? getMetadataColor(item.dimensionItem) : item.color}` to its existing `<SeriesColorButton>` usage (import `COLOR_AUTO` there if needed). Task 5 replaces this.

- [ ] **Step 4: Run the tests and check they pass**

Run: `yarn test src/components/VisualizationOptions`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
yarn lint
git add src/components/VisualizationOptions/Options/Colours/SeriesColorButton.jsx src/components/VisualizationOptions/Options/Colours/ColorPickerPopover.jsx src/components/VisualizationOptions/styles/Colours.module.css src/components/VisualizationOptions/Options/Colours/__tests__/SeriesColorButton.spec.jsx src/components/VisualizationOptions/Options/SeriesTable.jsx
```
Hand the user: `git commit -S -m "feat: show inherited vs overridden series colours with reset" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 4: Legend & Colours tab

**Files:**
- Create: `src/components/VisualizationOptions/Options/Colours/useColourOptionsInit.js`
- Create: `src/components/VisualizationOptions/Options/Colours/ColourByControl.jsx`
- Create: `src/modules/options/tabs/legendColours.jsx`
- Modify: `src/modules/options/defaultConfig.js`
- Modify: `src/modules/options/pieConfig.jsx`
- Modify: `src/components/VisualizationOptions/styles/Colours.module.css`
- Test: `src/components/VisualizationOptions/Options/Colours/__tests__/ColourByControl.spec.jsx`

**Interfaces:**
- Consumes: `getInitialColourOptions`, `COLOR_MODE_*`, `PALETTE_IDS`, `PALETTE_BY_AXIS`, `getPaletteLabels`, `isLegendMode`, `DEFAULT_SINGLE_COLOR` (Task 1); `SeriesColorButton` (Task 3).
- Produces:
  - `useColourOptionsInit({ enabled = true } = {}): void`: on mount, if `options.colorMode` is undefined, dispatches `acSetUiOptions(getInitialColourOptions({ colorSet, series, isSaved }))`.
  - `<ColourByControl showLegend showFill />` (connected default export).
  - `getLegendColoursTab({ showLegend, showFill })` → tab config `{ key: 'legend-colours-tab', label: 'Legend & Colours', content }`.

- [ ] **Step 1: Write the failing tests**

Create `src/components/VisualizationOptions/Options/Colours/__tests__/ColourByControl.spec.jsx`:

```jsx
import {
    COLOR_SET_BRIGHT,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../../../../reducers/index.js'
import { DEFAULT_UI } from '../../../../../reducers/ui.js'
import ColourByControl from '../ColourByControl.jsx'

const getStore = (options = {}) =>
    createStore(rootReducer, {
        ui: {
            ...DEFAULT_UI,
            type: VIS_TYPE_COLUMN,
            layout: { columns: ['dx'], rows: ['pe'], filters: [] },
            itemsByDimension: { dx: ['a', 'b'] },
            options: { ...DEFAULT_UI.options, ...options },
        },
    })

const renderControl = (store, props = { showLegend: true, showFill: true }) =>
    render(
        <Provider store={store}>
            <ColourByControl {...props} />
        </Provider>
    )

describe('ColourByControl', () => {
    it('initialises a new chart to the default palette with item colours on', () => {
        const store = getStore()
        renderControl(store)

        const { options } = store.getState().ui
        expect(options.colorMode).toBe('PALETTE')
        expect(options.colorPalette).toBe('DEFAULT')
        expect(options.useItemColors).toBe(true)
        expect(
            screen.getByLabelText(
                'Use automatic data item colours where available'
            )
        ).toBeChecked()
    })

    it('does not re-initialise a chart that already has colour options', () => {
        const store = getStore({
            colorMode: 'SINGLE',
            singleColor: '#00ff00',
        })
        renderControl(store)

        expect(store.getState().ui.options.colorMode).toBe('SINGLE')
        expect(screen.getByText('#00ff00')).toBeInTheDocument()
        expect(
            screen.queryByText(
                'Use automatic data item colours where available'
            )
        ).not.toBeInTheDocument()
    })

    it('switches mode without touching series overrides', () => {
        const series = [{ dimensionItem: 'a', color: '#ff0000' }]
        const store = getStore({
            colorMode: 'PALETTE',
            colorPalette: COLOR_SET_BRIGHT,
            series,
        })
        renderControl(store)

        fireEvent.click(screen.getByText('Single colour'))
        expect(store.getState().ui.options.colorMode).toBe('SINGLE')
        fireEvent.click(screen.getByText('Palette'))
        expect(store.getState().ui.options.colorMode).toBe('PALETTE')
        expect(store.getState().ui.options.colorPalette).toBe(COLOR_SET_BRIGHT)
        expect(store.getState().ui.options.series).toEqual(series)
    })

    it('turns the legend on and off from the segmented control', () => {
        const store = getStore({ colorMode: 'PALETTE' })
        renderControl(store)

        fireEvent.click(screen.getByText('Legend'))
        expect(store.getState().ui.options.legend.strategy).toBe(
            LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM
        )
        expect(screen.queryByText('Fill')).not.toBeInTheDocument()

        fireEvent.click(screen.getByText('Palette'))
        expect(store.getState().ui.options.legend.strategy).toBe('FIXED')
    })

    it('hides Legend and Fill when not supported', () => {
        renderControl(getStore({ colorMode: 'PALETTE' }), {
            showLegend: false,
            showFill: false,
        })

        expect(screen.queryByText('Legend')).not.toBeInTheDocument()
        expect(screen.queryByText('Fill')).not.toBeInTheDocument()
    })

    it('offers By axis only for multi-axis charts, or when already selected', () => {
        const { unmount } = renderControl(getStore({ colorMode: 'PALETTE' }))
        fireEvent.click(screen.getByTestId('colour-palette-select-content'))
        expect(screen.queryByText('By axis')).not.toBeInTheDocument()
        unmount()

        renderControl(
            getStore({ colorMode: 'PALETTE', colorPalette: 'BY_AXIS' })
        )
        expect(screen.getByText('By axis')).toBeInTheDocument()
    })
})
```

(The `SingleSelectField` with `dataTest="colour-palette-select"` exposes `colour-palette-select-content` for its trigger. If the trigger test id differs in this `@dhis2/ui` version, inspect with `screen.debug()` and use the id it renders.)

- [ ] **Step 2: Run the tests and check they fail**

Run: `yarn test src/components/VisualizationOptions/Options/Colours/__tests__/ColourByControl.spec.jsx`
Expected: FAIL ("Cannot find module '../ColourByControl.jsx'").

- [ ] **Step 3: Implement the init hook**

`useColourOptionsInit.js`:

```js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acSetUiOptions } from '../../../../actions/ui.js'
import {
    OPTION_COLOR_MODE,
    OPTION_COLOR_SET,
    OPTION_SERIES,
} from '../../../../modules/options.js'
import { getInitialColourOptions } from '../../../../modules/seriesColors.js'
import { sGetUiOptions } from '../../../../reducers/ui.js'
import { sGetVisualization } from '../../../../reducers/visualization.js'

// Both colour tabs call this; whichever opens first sets the chart's colour options once
export const useColourOptionsInit = ({ enabled = true } = {}) => {
    const dispatch = useDispatch()
    const options = useSelector(sGetUiOptions)
    const isSaved = useSelector((state) => Boolean(sGetVisualization(state)?.id))

    useEffect(() => {
        if (enabled && !options[OPTION_COLOR_MODE]) {
            dispatch(
                acSetUiOptions(
                    getInitialColourOptions({
                        colorSet: options[OPTION_COLOR_SET],
                        series: options[OPTION_SERIES],
                        isSaved,
                    })
                )
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
```

- [ ] **Step 4: Implement `ColourByControl`**

`ColourByControl.jsx`:

```jsx
import {
    COLOR_SET_DEFAULT,
    hasCustomAxes,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    Checkbox,
    Field,
    Radio,
    SegmentedControl,
    SingleSelectField,
    SingleSelectOption,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { acSetUiOption, acSetUiOptions } from '../../../../actions/ui.js'
import {
    FILL_TYPE_PATTERN,
    FILL_TYPE_SOLID,
    OPTION_COLOR_MODE,
    OPTION_COLOR_PALETTE,
    OPTION_FILL_TYPE,
    OPTION_LEGEND,
    OPTION_LEGEND_DISPLAY_STRATEGY,
    OPTION_LEGEND_DISPLAY_STYLE,
    OPTION_LEGEND_SET,
    OPTION_SERIES,
    OPTION_SINGLE_COLOR,
    OPTION_USE_ITEM_COLORS,
} from '../../../../modules/options.js'
import {
    COLOR_MODE_PALETTE,
    COLOR_MODE_SINGLE,
    DEFAULT_SINGLE_COLOR,
    getPaletteLabels,
    isLegendMode,
    PALETTE_BY_AXIS,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import { sGetUiOptions } from '../../../../reducers/ui.js'
import styles from '../../styles/Colours.module.css'
import tabStyles from '../../styles/VisualizationOptions.module.css'
import LegendDisplayStrategy from '../LegendDisplayStrategy.jsx'
import ShowLegendKey from '../ShowLegendKey.jsx'
import SeriesColorButton from './SeriesColorButton.jsx'
import { useColourOptionsInit } from './useColourOptionsInit.js'

const MODE_LEGEND = 'LEGEND'

const ColourByControl = ({
    options,
    setOption,
    setOptions,
    showLegend = false,
    showFill = true,
}) => {
    useColourOptionsInit()

    // Local state: "Select a legend" with no set picked yet still counts as Legend here
    const [legendSelected, setLegendSelected] = useState(
        () => showLegend && isLegendMode(options[OPTION_LEGEND])
    )
    const colorMode = options[OPTION_COLOR_MODE] || COLOR_MODE_PALETTE
    const selected = legendSelected ? MODE_LEGEND : colorMode
    const palette = options[OPTION_COLOR_PALETTE] || COLOR_SET_DEFAULT
    const singleColor = options[OPTION_SINGLE_COLOR] || DEFAULT_SINGLE_COLOR
    const labels = getPaletteLabels()
    const paletteIds =
        hasCustomAxes(options[OPTION_SERIES] || []) ||
        palette === PALETTE_BY_AXIS
            ? [PALETTE_BY_AXIS, ...PALETTE_IDS]
            : PALETTE_IDS

    const onModeChange = ({ value }) => {
        if (value === selected) {
            return
        }

        if (value === MODE_LEGEND) {
            setLegendSelected(true)
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
            })
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: LEGEND_DISPLAY_STYLE_FILL,
            })
            return
        }

        if (legendSelected) {
            setLegendSelected(false)
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

        setOptions({ [OPTION_COLOR_MODE]: value })
    }

    const modeOptions = [
        ...(showLegend
            ? [{ label: i18n.t('Legend'), value: MODE_LEGEND }]
            : []),
        { label: i18n.t('Palette'), value: COLOR_MODE_PALETTE },
        { label: i18n.t('Single colour'), value: COLOR_MODE_SINGLE },
    ]

    return (
        <div className={styles.colourBy}>
            <div className={styles.modeRow}>
                <span className={styles.modeLabel}>{i18n.t('Colour by')}</span>
                <SegmentedControl
                    options={modeOptions}
                    selected={selected}
                    onChange={onModeChange}
                />
            </div>

            {selected === MODE_LEGEND && (
                <div className={styles.legendSettings}>
                    <div className={tabStyles.tabSectionOption}>
                        <LegendDisplayStrategy />
                    </div>
                    <ShowLegendKey />
                </div>
            )}

            {selected === COLOR_MODE_PALETTE && (
                <>
                    <div className={styles.paletteSelect}>
                        <SingleSelectField
                            dense
                            label={i18n.t('Palette')}
                            selected={palette}
                            onChange={({ selected }) =>
                                setOptions({ [OPTION_COLOR_PALETTE]: selected })
                            }
                            dataTest="colour-palette-select"
                        >
                            {paletteIds.map((id) => (
                                <SingleSelectOption
                                    key={id}
                                    value={id}
                                    label={labels[id]}
                                />
                            ))}
                        </SingleSelectField>
                    </div>
                    <Checkbox
                        dense
                        label={i18n.t(
                            'Use automatic data item colours where available'
                        )}
                        checked={Boolean(options[OPTION_USE_ITEM_COLORS])}
                        onChange={({ checked }) =>
                            setOptions({ [OPTION_USE_ITEM_COLORS]: checked })
                        }
                    />
                </>
            )}

            {selected === COLOR_MODE_SINGLE && (
                <Field label={i18n.t('Colour')} dense>
                    <SeriesColorButton
                        name={i18n.t('all series')}
                        value={singleColor}
                        color={singleColor}
                        onChange={(color) =>
                            setOptions({ [OPTION_SINGLE_COLOR]: color })
                        }
                    />
                </Field>
            )}

            {selected !== MODE_LEGEND && showFill && (
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
                                    setOptions({ [OPTION_FILL_TYPE]: value })
                                }
                            />
                        ))}
                    </Field>
                </div>
            )}
        </div>
    )
}

ColourByControl.propTypes = {
    options: PropTypes.object.isRequired,
    setOption: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    showFill: PropTypes.bool,
    showLegend: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    options: sGetUiOptions(state),
})

const mapDispatchToProps = {
    setOptions: acSetUiOptions,
    setOption: acSetUiOption,
}

export default connect(mapStateToProps, mapDispatchToProps)(ColourByControl)
```

Note: the Single colour button passes no `metadataColor`, so the picker has no Auto option. It passes no `onReset`, so there is no ↺.

`Colours.module.css`: add (keep `.header` and `.modeSwitch` until Task 5, because `SeriesTable` still uses them):

```css
.modeRow {
    display: flex;
    align-items: center;
    gap: var(--spacers-dp8);
}

.colourBy {
    display: flex;
    flex-direction: column;
    gap: var(--spacers-dp12);
}
```

Keep `.modeLabel`, `.legendSettings`, `.paletteSelect` and `.fill`.

- [ ] **Step 5: Add the tab and wire the configs**

`src/modules/options/tabs/legendColours.jsx`:

```jsx
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import ColourByControl from '../../../components/VisualizationOptions/Options/Colours/ColourByControl.jsx'

export default ({ showLegend, showFill } = {}) => ({
    key: 'legend-colours-tab',
    label: i18n.t('Legend & Colours'),
    content: [
        {
            key: 'legend-colours-section-1',
            content: React.Children.toArray([
                <ColourByControl showLegend={showLegend} showFill={showFill} />,
            ]),
        },
    ],
})
```

`defaultConfig.js`: import `getLegendColoursTab from './tabs/legendColours.jsx'`. Insert it right after `getDataTab(...)` (where the Legend tab used to be):

```js
    getLegendColoursTab({
        showLegend: supportsLegends,
        showFill: ![
            VIS_TYPE_LINE,
            VIS_TYPE_YEAR_OVER_YEAR_LINE,
            VIS_TYPE_RADAR,
        ].includes(type),
    }),
```

Leave the `getSeriesTab` props as they are for now; Task 5 simplifies them.

`pieConfig.jsx`: import the same tab and insert `getLegendColoursTab({ showLegend: false, showFill: true }),` after `getDataTab(...)`.

- [ ] **Step 6: Run the tests and check they pass**

Run: `yarn test src/components/VisualizationOptions src/modules`
Expected: PASS. If an options-config snapshot changes because of the new tab, review the diff and update only that snapshot with `yarn test -u <that spec path>`.

- [ ] **Step 7: Commit**

```bash
yarn lint
git add src/components/VisualizationOptions/Options/Colours/useColourOptionsInit.js src/components/VisualizationOptions/Options/Colours/ColourByControl.jsx src/components/VisualizationOptions/Options/Colours/__tests__/ColourByControl.spec.jsx src/modules/options/tabs/legendColours.jsx src/modules/options/defaultConfig.js src/modules/options/pieConfig.jsx src/components/VisualizationOptions/styles/Colours.module.css
```
Hand the user: `git commit -S -m "feat: add Legend & Colours tab with colour by legend, palette or single colour" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 5: Series tab becomes overrides; delete the Apply model

**Files:**
- Rewrite: `src/components/VisualizationOptions/Options/SeriesTable.jsx`
- Modify: `src/modules/options/tabs/series.jsx`
- Modify: `src/modules/options/defaultConfig.js`, `src/modules/options/pieConfig.jsx` (Series tab props, remove `OPTION_COLOR_SEED`)
- Modify: `src/modules/options.js` (remove `OPTION_COLOR_SEED`)
- Modify: `src/modules/seriesColors.js` (delete old helpers)
- Delete: `src/components/VisualizationOptions/Options/Colours/ApplyColorsMenu.jsx`
- Modify: `src/components/VisualizationOptions/styles/Colours.module.css` (add `.legendCell`; delete `.menuPalettePreview`, `.relative`)
- Test: `src/components/VisualizationOptions/__tests__/SeriesTable.spec.jsx`, `src/modules/__tests__/seriesColors.spec.js`
- Modify: `i18n/en.pot` (regenerated)

**Interfaces:**
- Consumes: `resolveSeriesColors`, `COLOR_SOURCE_*` (Task 1); `SeriesColorButton` (Task 3); `useColourOptionsInit` (Task 4).
- Produces: `getSeriesTab({ showAxisOptions, showTypeOptions, showColours })`; `<SeriesTable showAxisOptions showTypeOptions showColours />`.

- [ ] **Step 1: Rewrite the SeriesTable tests**

Replace the contents of `src/components/VisualizationOptions/__tests__/SeriesTable.spec.jsx` with:

```jsx
import {
    colorSets,
    COLOR_SET_BRIGHT,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STYLE_FILL,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../../reducers/index.js'
import { DEFAULT_UI } from '../../../reducers/ui.js'
import SeriesTable from '../Options/SeriesTable.jsx'

const BRIGHT = colorSets[COLOR_SET_BRIGHT].colors

const getStore = (options = {}, layout, itemsByDimension) =>
    createStore(rootReducer, {
        ui: {
            ...DEFAULT_UI,
            type: VIS_TYPE_COLUMN,
            layout: layout || { columns: ['dx'], rows: ['pe'], filters: [] },
            itemsByDimension: itemsByDimension || { dx: ['a', 'b'] },
            options: {
                ...DEFAULT_UI.options,
                colorMode: 'PALETTE',
                colorPalette: COLOR_SET_BRIGHT,
                useItemColors: false,
                ...options,
            },
        },
    })

const renderTable = (store, props = { showColours: true }) =>
    render(
        <Provider store={store}>
            <SeriesTable {...props} />
        </Provider>
    )

describe('SeriesTable overrides', () => {
    it('shows each series with its inherited palette colour', () => {
        renderTable(getStore())

        expect(screen.getAllByText('Palette')).toHaveLength(2)
        const swatches = screen
            .getAllByTestId('series-colour-button')
            .map((button) => button.firstChild.style.backgroundColor)
        expect(swatches).toHaveLength(2)
        expect(swatches[0]).not.toBe('')
        expect(
            screen.queryByLabelText(/^Reset colour for/)
        ).not.toBeInTheDocument()
        void BRIGHT
    })

    it('shows the single colour as the source in Single colour mode', () => {
        renderTable(getStore({ colorMode: 'SINGLE', singleColor: '#00ff00' }))

        expect(screen.getAllByText('Single colour')).toHaveLength(2)
    })

    it('removes an override with the reset button', () => {
        const store = getStore({
            series: [
                { dimensionItem: 'a', color: '#ff0000' },
                { dimensionItem: 'b' },
            ],
        })
        renderTable(store)

        expect(screen.getByText('#ff0000')).toBeInTheDocument()
        fireEvent.click(screen.getAllByLabelText(/^Reset colour for/)[0])

        const items = store.getState().ui.options.series
        expect(items.find((item) => item.dimensionItem === 'a').color).toBe(
            undefined
        )
        expect(screen.getAllByText('Palette')).toHaveLength(2)
    })

    it('shows "Set by legend" and no colour buttons in legend mode', () => {
        renderTable(
            getStore({
                legend: {
                    strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
                    style: LEGEND_DISPLAY_STYLE_FILL,
                },
            })
        )

        expect(screen.getAllByText('Set by legend')).toHaveLength(2)
        expect(
            screen.queryAllByTestId('series-colour-button')
        ).toHaveLength(0)
    })

    it('hides per-item columns for relative series and explains why', () => {
        renderTable(
            getStore(
                {},
                { columns: ['pe'], rows: ['dx'], filters: [] },
                { pe: ['LAST_12_MONTHS'] }
            ),
            { showColours: true, showTypeOptions: true, showAxisOptions: true }
        )

        expect(
            screen.getByText(/colours follow the chart setting in order/)
        ).toBeInTheDocument()
        expect(
            screen.queryAllByTestId('series-colour-button')
        ).toHaveLength(0)
    })

    it('keeps "No Series options" for types without colours (gauge, pivot table)', () => {
        renderTable(getStore(), {})

        expect(screen.getByText('No Series options')).toBeInTheDocument()
    })

    it('no longer shows the mode switch, Apply colours or Fill', () => {
        renderTable(getStore())

        expect(screen.queryByText('Colour by')).not.toBeInTheDocument()
        expect(screen.queryByText(/Apply colours/)).not.toBeInTheDocument()
        expect(screen.queryByText('Fill')).not.toBeInTheDocument()
    })
})
```

Remove the `void BRIGHT` line and the `BRIGHT` constant if lint complains about them. They are only there to keep the import used; dropping both, along with the `colorSets` import, is fine.

- [ ] **Step 2: Run the tests and check they fail**

Run: `yarn test src/components/VisualizationOptions/__tests__/SeriesTable.spec.jsx`
Expected: FAIL (the source labels, "Set by legend" and the relative note text are missing; the mode switch is still present).

- [ ] **Step 3: Rewrite `SeriesTable.jsx`**

Full contents:

```jsx
import {
    isLegendSetType,
    VIS_TYPE_COLUMN,
    VIS_TYPE_LINE,
    visTypeIcons,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Radio,
    Tooltip,
    colors,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions, acUpdateUiSeriesItem } from '../../../actions/ui.js'
import {
    AxisOne,
    AxisTwo,
    AxisThree,
    AxisFour,
} from '../../../assets/AxisIcons.jsx'
import { EmptyBox, EmptySeries } from '../../../assets/ErrorIcons.jsx'
import { getMetadataColor } from '../../../modules/mockMetadataColors.js'
import {
    OPTION_COLOR_MODE,
    OPTION_COLOR_PALETTE,
    OPTION_LEGEND,
    OPTION_SERIES,
    OPTION_SINGLE_COLOR,
    OPTION_USE_ITEM_COLORS,
} from '../../../modules/options.js'
import {
    COLOR_SOURCE_AUTO,
    COLOR_SOURCE_PALETTE,
    COLOR_SOURCE_SINGLE,
    isLegendMode,
    isPositionalSeries,
    mergeSeriesItems,
    resolveSeriesColors,
} from '../../../modules/seriesColors.js'
import {
    SERIES_ITEM_TYPE_PROP,
    SERIES_ITEM_AXIS_PROP,
} from '../../../modules/ui.js'
import { sGetSeriesSetupItems } from '../../../reducers/index.js'
import {
    sGetUiItems,
    sGetUiLayout,
    sGetUiOptions,
    sGetUiType,
} from '../../../reducers/ui.js'
import coloursStyles from '../styles/Colours.module.css'
import styles from '../styles/SeriesTable.module.css'
import { useColourOptionsInit } from './Colours/useColourOptionsInit.js'
import SeriesColorButton from './Colours/SeriesColorButton.jsx'

const availableAxes = [0, 1, 2, 3]
const allTypes = [VIS_TYPE_COLUMN, VIS_TYPE_LINE]

const LAYOUT_ITEMS_PROP_DEFAULT = []

const getSourceLabels = () => ({
    [COLOR_SOURCE_PALETTE]: i18n.t('Palette'),
    [COLOR_SOURCE_SINGLE]: i18n.t('Single colour'),
    [COLOR_SOURCE_AUTO]: i18n.t('Auto'),
})

const renderAxisIcon = (axis) => {
    switch (axis) {
        case 1:
            return <AxisOne />
        case 2:
            return <AxisTwo />
        case 3:
            return <AxisThree />
        case 4:
            return <AxisFour />
    }
}

const SeriesTable = ({
    layoutItems = LAYOUT_ITEMS_PROP_DEFAULT,
    options,
    visType,
    seriesDimensionId,
    seriesItemIds,
    onItemChange,
    setOptions,
    showAxisOptions = false,
    showTypeOptions = false,
    showColours = false,
}) => {
    useColourOptionsInit({ enabled: showColours })

    const relative = isPositionalSeries({
        type: visType,
        dimensionId: seriesDimensionId,
        itemIds: seriesItemIds,
    })
    const legendMode =
        isLegendSetType(visType) && isLegendMode(options[OPTION_LEGEND])
    const items = mergeSeriesItems(layoutItems, options[OPTION_SERIES])
    const resolved = resolveSeriesColors({
        items,
        colorMode: options[OPTION_COLOR_MODE],
        colorPalette: options[OPTION_COLOR_PALETTE],
        singleColor: options[OPTION_SINGLE_COLOR],
        useItemColors: options[OPTION_USE_ITEM_COLORS],
        getMetadataColor,
    })
    const sourceLabels = getSourceLabels()
    const availableTypes = [
        visType,
        ...allTypes.filter((type) => type !== visType),
    ]

    const writeItems = (newItems) => setOptions({ [OPTION_SERIES]: newItems })

    // Keep options.series in sync with the layout when the tab opens
    useEffect(() => {
        writeItems(items)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onColorChange = (dimensionItem, color) =>
        writeItems(
            items.map((item) =>
                item.dimensionItem === dimensionItem ? { ...item, color } : item
            )
        )

    const onColorReset = (dimensionItem) =>
        writeItems(
            items.map((item) => {
                if (item.dimensionItem !== dimensionItem) {
                    return item
                }
                // eslint-disable-next-line no-unused-vars
                const { color, ...rest } = item
                return rest
            })
        )

    const showColorColumn = showColours && !relative
    const showTypeColumn = showTypeOptions && !relative
    const showAxisColumns = showAxisOptions && !relative
    const showTable = showColorColumn || showTypeColumn || showAxisColumns

    const renderColourCell = (item, index) => {
        if (legendMode) {
            return (
                <Tooltip
                    content={i18n.t(
                        'Colours are set by the legend in Legend & Colours'
                    )}
                >
                    <span className={coloursStyles.legendCell}>
                        {i18n.t('Set by legend')}
                    </span>
                </Tooltip>
            )
        }

        const { color, source } = resolved[index]

        return (
            <SeriesColorButton
                name={item.name || item.dimensionItem}
                value={item.color}
                color={color}
                sourceLabel={sourceLabels[source]}
                metadataColor={getMetadataColor(item.dimensionItem)}
                onChange={(newColor) =>
                    onColorChange(item.dimensionItem, newColor)
                }
                onReset={() => onColorReset(item.dimensionItem)}
            />
        )
    }

    const renderTable = () => (
        <Table suppressZebraStriping className={styles.table}>
            <TableHead className={styles.tableHead}>
                <TableRow className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                        {i18n.t('Data item')}
                    </TableCell>
                    {showColorColumn && (
                        <TableCell className={styles.tableCell}>
                            {i18n.t('Colour')}
                        </TableCell>
                    )}
                    {showTypeColumn && (
                        <TableCell className={styles.tableCell}>
                            {i18n.t('Visualization type')}
                        </TableCell>
                    )}
                    {showAxisColumns &&
                        availableAxes.map((axis) => (
                            <TableCell key={axis} className={styles.tableCell}>
                                {i18n.t('Axis {{axisId}}', {
                                    axisId: axis + 1,
                                })}
                                <div className={styles.axisIcon}>
                                    {renderAxisIcon(axis + 1)}
                                </div>
                            </TableCell>
                        ))}
                </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
                {items.map((item, index) => (
                    <TableRow
                        key={`multiaxis-table-row-${item.dimensionItem}`}
                        dataTest={'series-table-item'}
                    >
                        <TableCell className={styles.itemName}>
                            {item.name}
                        </TableCell>
                        {showColorColumn && (
                            <TableCell className={styles.itemColor}>
                                {renderColourCell(item, index)}
                            </TableCell>
                        )}
                        {showTypeColumn && (
                            <TableCell className={styles.itemType}>
                                {availableTypes.map((type) => {
                                    const VisualizationTypeIcon =
                                        visTypeIcons[type]

                                    return (
                                        <div
                                            className={styles.typeContainer}
                                            key={type}
                                        >
                                            <Radio
                                                className={styles.radioInput}
                                                onChange={() =>
                                                    onItemChange({
                                                        changedItem: item,
                                                        value: type,
                                                        prop: SERIES_ITEM_TYPE_PROP,
                                                    })
                                                }
                                                checked={
                                                    item.type
                                                        ? item.type === type
                                                        : visType === type
                                                }
                                                label={
                                                    <span
                                                        className={
                                                            styles.visIcon
                                                        }
                                                    >
                                                        <VisualizationTypeIcon
                                                            color={
                                                                colors.grey600
                                                            }
                                                        />
                                                    </span>
                                                }
                                                dense
                                                dataTest={`item-type-${type}`}
                                            />
                                        </div>
                                    )
                                })}
                            </TableCell>
                        )}
                        {showAxisColumns &&
                            availableAxes.map((axis) => (
                                <TableCell
                                    key={axis}
                                    className={styles.itemAxis}
                                >
                                    <Radio
                                        onChange={() =>
                                            onItemChange({
                                                changedItem: item,
                                                value: axis,
                                                prop: SERIES_ITEM_AXIS_PROP,
                                            })
                                        }
                                        checked={item.axis === axis}
                                        dense
                                        dataTest={`item-axis-${axis + 1}`}
                                    />
                                </TableCell>
                            ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    const renderError = (title, description, icon) => (
        <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>{icon}</div>
            <p className={styles.errorTitle}>{title}</p>
            <p className={styles.errorDescription}>{description}</p>
        </div>
    )

    if (!showColours && !showTypeOptions && !showAxisOptions) {
        return renderError(
            i18n.t('No Series options'),
            i18n.t(
                "There aren't any Series options for this visualization type"
            ),
            EmptyBox()
        )
    }

    if (!items.length) {
        return renderError(
            i18n.t('Series is empty'),
            i18n.t('Options for selected items will be available here'),
            EmptySeries()
        )
    }

    return (
        <div>
            {relative && (
                <p className={coloursStyles.positionalNote}>
                    {i18n.t(
                        'Series with relative selections change over time, so colours follow the chart setting in order. Colour, type and axis can only be set per item for fixed selections.'
                    )}
                </p>
            )}
            {showTable && renderTable()}
        </div>
    )
}

SeriesTable.propTypes = {
    options: PropTypes.object.isRequired,
    setOptions: PropTypes.func.isRequired,
    visType: PropTypes.string.isRequired,
    onItemChange: PropTypes.func.isRequired,
    layoutItems: PropTypes.array,
    seriesDimensionId: PropTypes.string,
    seriesItemIds: PropTypes.array,
    showAxisOptions: PropTypes.bool,
    showColours: PropTypes.bool,
    showTypeOptions: PropTypes.bool,
}

const mapStateToProps = (state) => {
    const seriesDimensionId = sGetUiLayout(state).columns[0]

    return {
        layoutItems: sGetSeriesSetupItems(state),
        options: sGetUiOptions(state),
        visType: sGetUiType(state),
        seriesDimensionId,
        seriesItemIds: sGetUiItems(state)[seriesDimensionId] || [],
    }
}

const mapDispatchToProps = {
    setOptions: acSetUiOptions,
    onItemChange: ({ changedItem, value, prop }) =>
        acUpdateUiSeriesItem({ changedItem, value, prop }),
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
```

Behaviour change to note: previously, a relative series with `showColours` false showed the note "Series options are not available when using relative selections…". The single note above now covers both cases. For gauge and pivot table the earlier "No Series options" return still applies.

`Colours.module.css`, add:

```css
.legendCell {
    font-size: 13px;
    font-style: italic;
    color: var(--colors-grey600);
}
```

and delete `.header`, `.modeSwitch`, `.menuPalettePreview`, `.menuPalettePreview span` and `.relative`.

- [ ] **Step 4: Simplify the Series tab and configs**

`src/modules/options/tabs/series.jsx`: remove the `showModeSwitch` and `showFill` params and props, so it takes `{ showAxisOptions, showTypeOptions, showColours }`.

`defaultConfig.js`: the `getSeriesTab` call becomes

```js
    getSeriesTab({
        showAxisOptions: supportsMultiAxes,
        showTypeOptions: supportsMultiType,
        showColours: true,
    }),
```

Remove `OPTION_COLOR_SEED` from the imports and from `defaultOptionNames` in `defaultConfig.js` and `pieConfig.jsx`.

- [ ] **Step 5: Delete the Apply model**

- `git rm src/components/VisualizationOptions/Options/Colours/ApplyColorsMenu.jsx`
- `src/modules/options.js`: delete `OPTION_COLOR_SEED` and its `options` entry.
- `src/modules/seriesColors.js`: delete `getNextSeedColor`, `resolveItemColor`, `seedSeriesColors`, `applyPalette`, `applyAxisPalette`, `resetToAuto` and `seedLegacyColors`. Remove imports that are now unused (`FILL_TYPE_*` are still used by `getInitialColourOptions`; keep `normalize` only if something still uses it, otherwise delete it).
- `src/modules/__tests__/seriesColors.spec.js`: delete the `describe` blocks for `getNextSeedColor`, `resolveItemColor`, `seedSeriesColors`, `applyPalette`, `applyAxisPalette`, `resetToAuto` and `seedLegacyColors`, and clean up their imports.
- Run `grep -rn "colorSeed\|OPTION_COLOR_SEED\|ApplyColorsMenu\|seedSeriesColors\|applyPalette\|resetToAuto\|seedLegacyColors\|getNextSeedColor\|resolveItemColor\|showModeSwitch" src`. Expected: no matches.

- [ ] **Step 6: Regenerate translations**

Run: `yarn d2-app-scripts i18n extract`
Expected: `i18n/en.pot` gains the new strings and drops "Apply colours", "Colours applied", "Reset to Auto", "Static" and the old relative note.

- [ ] **Step 7: Run the full suite and lint**

Run: `yarn test`
Expected: PASS.
Run: `yarn lint`
Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add -A src i18n/en.pot
git status --short
```
Check that the staged list only includes the files named in this task, then hand the user: `git commit -S -m "feat: series tab shows colour overrides; remove apply colours" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 6: Check in the running app

**Files:** none (verification only; fix in the owning task's files if something is wrong).

- [ ] **Step 1: Start the app**

Use the `run` skill, or run `yarn start` against the usual play/dev instance, and log in.

- [ ] **Step 2: Walk the scenarios and note each result**

1. **New column chart** with data elements ANC 1st visit (mock metadata colour) plus one without. Legend & Colours shows Palette = Default with the checkbox on. The Series tab shows ANC 1st visit with greyed *Auto* in blue and the other with greyed *Palette*. The chart matches.
2. **Override** the second series to red in the Series tab: the hex and ↺ appear and the chart updates. Change Palette to Bright: the overridden series stays red and the others change. Press ↺: the series goes back to the Bright colour at its position.
3. **Single colour**: all non-overridden series use it; *Auto* inherited labels disappear (checkbox hidden); overrides remain.
4. **Legend**: the Series tab shows "Set by legend" with a tooltip; Type and Axis still work; switch back to Palette and the overrides are still there.
5. **Multi-axis**: move one series to axis 2. "By axis" appears in Palette; selecting it gives blue and red families. Move it back to axis 1: "By axis" stays selected and the colours become the blue gradient.
6. **Relative periods as series**: the Series tab shows the note only, and the chart follows the palette in order.
7. **Open an existing saved column chart** (e.g. one with the Bright set, and one with Patterns): before opening options, the colours are unchanged. After opening Legend & Colours, the palette shows Bright (or Default + Pattern) and the chart still looks the same.
8. **Pie chart**: the Legend & Colours tab has no Legend option; the Series tab has a Colour column only.
9. **Line chart**: no Fill option.

- [ ] **Step 3: Report**

Summarise pass/fail per scenario to the user with screenshots of scenarios 2 and 5. Fix any failures in the owning task's files, re-run `yarn test`, then stage and hand over a commit command.
