# Series colours — design (prototype)

Status: agreed in product grilling session, 2026-10-13; revised 2026-10-14 (merged into the Series tab; relative series use a palette). Prototype is for UI/conceptual-model exploration, not a technical spike.

## Problem

Users want to set the colour of each series ("first bar red, second green, third black"), and want to reuse the colour already defined on the metadata item (e.g. a data element's `style.color`). Today colour comes from three disconnected places: the Legend tab (value-based), the Style → Color set radio list (chart-wide palette), and hidden multi-axis colour families. Adding a fourth would make this worse; the proposal consolidates instead.

## Model

1. **One place for colour.** A new options tab **"Legend & Colours"** replaces the Legend tab for chart types that support Static colours. Style → "Color set" is removed from the UI. Gauge, single value and pivot table keep a tab called **"Legend"** (unchanged).
2. **Chart-level mode: Legend | Static.** The switch appears only where both are possible:

    | Vis type                                             | Mode switch     | Tab content                                 |
    | ---------------------------------------------------- | --------------- | ------------------------------------------- |
    | Column, bar, stacked column, stacked bar             | Legend / Static | Full model                                  |
    | Line, area, stacked area, radar, pie, year-over-year | none            | Static only                                 |
    | Gauge, single value, pivot table                     | none            | Legend only (tab named "Legend", unchanged) |
    | Scatter, outlier table                               | n/a             | no tab (unchanged)                          |

3. **Static rows are item-bound.** A colour belongs to the data item ("ANC 1st visit is red"), surviving reorder. Where items cannot be resolved at design time (relative periods/org units, "All items", year-over-year), rows are **positional slots** "Item 1, Item 2…" applied at draw time; series beyond the defined slots continue the seed palette.
4. **A row is either Auto or a frozen hex.** Auto = live link to the metadata colour; it is shown as the text "Auto" in the row. Auto is only offered when a metadata colour exists.
5. **Seeding new items.** A new item gets Auto if a metadata colour exists, otherwise the next colour of the chart's _seed palette_ not already used in the chart, frozen as hex. Removing an item never shifts others.
6. **Seed palette** = the last palette applied to this chart, or Default if none. No visible hint line.
7. **Apply colours ▸** menu (one-shot actions): _By axis_ (listed first when the chart uses >1 axis), Default, Basic, Extended, Bright, Dark, Gray, Color blind; then _Reset to Auto_. Applying overwrites **every** row including Auto; an Undo snackbar follows.
8. **Fill: Solid / Pattern** under Static (hidden for line-type charts). Pattern shapes are assigned by position and drawn in each row's colour.
9. **Multi-axis:** the old axis colour families become the _By axis_ action. Axis labels are neutral.
10. **Picker popover**: Auto (only if a metadata colour exists) → palette grid (one row per palette) → custom hue/saturation picker + hex input.
11. **Old charts unchanged.** A saved chart with no stored per-item colours renders exactly as today (legacy `colorSet` drives it). When its Colours tab is opened, rows are seeded as frozen hex from _its_ colour set (or axis families if it uses custom axes), not Auto. A Patterns chart opens with Fill: Pattern. Auto-by-default applies only to new charts and newly added items.

## Riskiest assumptions (what the prototype should test)

-   Users read _Apply_ as one-shot, not as a selection.
-   Users can tell Auto from a hex value at a glance.
-   "Legend & Colours" may lead users to look for the series-key toggle there (it lives in Style).

## Prototype boundaries

-   Metadata colours are **mocked** (a fixed id → hex map); the real `style.color` is not fetched.
-   Colours are **not persisted** on save (stripped before saving); per-item colours live in UI state only.
-   Rendering is done by recolouring the Highcharts chart after `createVisualization` — no `@dhis2/analytics` changes.
-   Trend lines keep their analytics-assigned colour; two-category charts are not specially handled.

## Revision 2026-10-14

-   **Merged into the Series tab.** The separate "Legend & Colours" tab is gone; colour lives in the Series tab next to type and axis. Top of the tab: _Colour by: Legend | Static_ (legend-capable types only) and _Apply colours ▾_. The table gets a Colour column in Static mode. Legend settings appear above the table in Legend mode. Fill sits below the table. Gauge, single value and pivot table keep their "Legend" tab and the "No Series options" Series tab.
-   **Relative series use a palette, not per-item colours (replaces positional slots).** If the series has any relative item, "All items", or is year-over-year, the Colour/Type/Axis columns are hidden and Static offers a persistent _Palette_ select (the chart's seed palette) applied in order. Per-item colours stored for fixed items are kept but unused while the series is relative.
-   **No "use auto colours" toggle for relative series in the MVP** — periods and org units have no metadata colours, so it would rarely do anything.

## Revision 2026-10-14 (b): chart-level "Colour by", Series tab as overrides

Supersedes points 1, 2, 5, 6, 7, 9, 11 and the first bullet of the previous revision. Points 3, 4, 8, 10 and "relative series use a palette" still hold, as amended below.

### Legend & Colours tab (chart-level, series-agnostic)

-   The tab returns for every type that had colour options in the prototype. Gauge, single value and pivot table keep their unchanged "Legend" tab.
-   **Colour by: Legend | Palette | Single colour**, as a segmented control at the top of the tab.
    -   _Legend_: the existing legend settings. Offered only for column, bar, stacked column and stacked bar.
    -   _Palette_: a select with Default, Basic, Extended, Bright, Dark, Gray, Color blind, and **By axis** (shown only when the chart uses more than one axis). Below it, a checkbox: **"Use automatic data item colours where available"**.
    -   _Single colour_: one colour picker. Every series uses it.
-   **Fill: Solid | Pattern** sits below, for Palette and Single colour. It is hidden for line, year-over-year line and radar. Pattern shapes are assigned by position and drawn in each series' resolved colour.
-   **Apply colours is removed.** The palette is now a live setting, not a one-time action.
-   Style → Color set stays removed.

### Colour precedence (per series)

1. **Legend mode**: the legend decides, and nothing below applies.
2. **Override** set in the Series tab: a hex value, or _Auto_ (the item's metadata colour).
3. **Metadata colour**: applies only in Palette mode with the checkbox on, and only if the item has one.
4. **Chart default**: in Palette mode, the palette colour **at the series' position**, whatever the series before it use (overriding one series never changes another); _By axis_ takes the axis colour family at the series' position within its axis. In Single colour mode, the single colour.

Overrides are kept when switching between Palette and Single colour. In Legend mode they are kept but not used.

### Series tab ("series overrides")

-   Columns: Series | Colour | Type | Axis. Type and Axis appear only where they do today. Line, area, radar and pie have Series and Colour only.
-   What the Colour cell shows:

    | State             | Cell                                                                        | Interaction                              |
    | ----------------- | --------------------------------------------------------------------------- | ---------------------------------------- |
    | Inherited         | swatch + greyed text naming the source (_Palette_, _Auto_, _Single colour_) | opens the picker                         |
    | Overridden (hex)  | swatch + hex in normal text + ↺                                             | opens the picker; ↺ removes the override |
    | Overridden (Auto) | swatch + **Auto** in normal text + ↺                                        | as above                                 |
    | Legend mode       | greyed "Set by legend", no swatch                                           | disabled, with a tooltip                 |

-   The swatch always shows the colour that will be drawn.
-   Picker: Auto (only if the item has a metadata colour), then the palette grid, then a custom picker. Choosing any of these creates an override.
-   Relative series (relative periods or org units, "All items", year-over-year): the Colour, Type and Axis columns are hidden, with the note "Colours follow the chart setting in order for relative items."
-   The mode switch, Apply menu, legend settings and Fill are removed from this tab.

### Defaults

-   New chart: Palette = Default, checkbox on, Fill = Solid.
-   Old saved chart (no colour state in the UI): rendered by analytics exactly as today. When the options are opened, Palette = its `colorSet`, or _By axis_ if it uses custom axes; checkbox off; no overrides. A `colorSet` of Patterns becomes Palette = Default with Fill = Pattern.

### Implementation notes (prototype)

-   UI-only options (not saved): `colorMode` (`PALETTE` | `SINGLE`; Legend is still derived from the legend settings), `palette` (a colour set ID or `BY_AXIS`; replaces `colorSeed`), `useItemColors`, `singleColor`, `fillType`. Per-series overrides go in `series[].color` (a hex or `AUTO`). The palette is not stored in `colorSet`, because analytics does not recognise `BY_AXIS`.
-   A single pure resolver, `resolveSeriesColors(...)`, returns `[{ color, source }]`. Both the Series tab and the renderer use it. The seeding, apply and reset helpers are deleted; the by-axis interpolation becomes the colour source for `BY_AXIS`.
-   `ApplyColorsMenu.jsx` is deleted. `ColorPickerPopover` and `SeriesColorButton` are reused.

### Riskiest assumptions (updated)

-   Users can tell an inherited colour from an override (greyed source label versus hex/Auto with ↺).
-   Users find chart-level colour in Legend & Colours and per-series exceptions in Series.
-   Palette assigned by position (which can occasionally duplicate an auto colour) is acceptable.
