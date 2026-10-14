# Series colours — design (prototype)

Status: agreed in product grilling session, 2026-10-13; revised 2026-10-14 (merged into the Series tab; relative series use a palette). Prototype is for UI/conceptual-model exploration, not a technical spike.

## Problem

Users want to set the colour of each series ("first bar red, second green, third black"), and want to reuse the colour already defined on the metadata item (e.g. a data element's `style.color`). Today colour comes from three disconnected places: the Legend tab (value-based), the Style → Color set radio list (chart-wide palette), and hidden multi-axis colour families. Adding a fourth would make this worse; the proposal consolidates instead.

## Model

1. **One place for colour.** A new options tab **"Legend & Colours"** replaces the Legend tab for chart types that support Static colours. Style → "Color set" is removed from the UI. Gauge, single value and pivot table keep a tab called **"Legend"** (unchanged).
2. **Chart-level mode: Legend | Static.** The switch appears only where both are possible:

    | Vis type | Mode switch | Tab content |
    |---|---|---|
    | Column, bar, stacked column, stacked bar | Legend / Static | Full model |
    | Line, area, stacked area, radar, pie, year-over-year | none | Static only |
    | Gauge, single value, pivot table | none | Legend only (tab named "Legend", unchanged) |
    | Scatter, outlier table | n/a | no tab (unchanged) |

3. **Static rows are item-bound.** A colour belongs to the data item ("ANC 1st visit is red"), surviving reorder. Where items cannot be resolved at design time (relative periods/org units, "All items", year-over-year), rows are **positional slots** "Item 1, Item 2…" applied at draw time; series beyond the defined slots continue the seed palette.
4. **A row is either Auto or a frozen hex.** Auto = live link to the metadata colour; it is shown as the text "Auto" in the row. Auto is only offered when a metadata colour exists.
5. **Seeding new items.** A new item gets Auto if a metadata colour exists, otherwise the next colour of the chart's *seed palette* not already used in the chart, frozen as hex. Removing an item never shifts others.
6. **Seed palette** = the last palette applied to this chart, or Default if none. No visible hint line.
7. **Apply colours ▸** menu (one-shot actions): *By axis* (listed first when the chart uses >1 axis), Default, Basic, Extended, Bright, Dark, Gray, Color blind; then *Reset to Auto*. Applying overwrites **every** row including Auto; an Undo snackbar follows.
8. **Fill: Solid / Pattern** under Static (hidden for line-type charts). Pattern shapes are assigned by position and drawn in each row's colour.
9. **Multi-axis:** the old axis colour families become the *By axis* action. Axis labels are neutral.
10. **Picker popover**: Auto (only if a metadata colour exists) → palette grid (one row per palette) → custom hue/saturation picker + hex input.
11. **Old charts unchanged.** A saved chart with no stored per-item colours renders exactly as today (legacy `colorSet` drives it). When its Colours tab is opened, rows are seeded as frozen hex from *its* colour set (or axis families if it uses custom axes), not Auto. A Patterns chart opens with Fill: Pattern. Auto-by-default applies only to new charts and newly added items.

## Riskiest assumptions (what the prototype should test)

- Users read *Apply* as one-shot, not as a selection.
- Users can tell Auto from a hex value at a glance.
- "Legend & Colours" may lead users to look for the series-key toggle there (it lives in Style).

## Prototype boundaries

- Metadata colours are **mocked** (a fixed id → hex map); the real `style.color` is not fetched.
- Colours are **not persisted** on save (stripped before saving); per-item colours live in UI state only.
- Rendering is done by recolouring the Highcharts chart after `createVisualization` — no `@dhis2/analytics` changes.
- Trend lines keep their analytics-assigned colour; two-category charts are not specially handled.

## Revision 2026-10-14

- **Merged into the Series tab.** The separate "Legend & Colours" tab is gone; colour lives in the Series tab next to type and axis. Top of the tab: *Colour by: Legend | Static* (legend-capable types only) and *Apply colours ▾*. The table gets a Colour column in Static mode. Legend settings appear above the table in Legend mode. Fill sits below the table. Gauge, single value and pivot table keep their "Legend" tab and the "No Series options" Series tab.
- **Relative series use a palette, not per-item colours (replaces positional slots).** If the series has any relative item, "All items", or is year-over-year, the Colour/Type/Axis columns are hidden and Static offers a persistent *Palette* select (the chart's seed palette) applied in order. Per-item colours stored for fixed items are kept but unused while the series is relative.
- **No "use auto colours" toggle for relative series in the MVP** — periods and org units have no metadata colours, so it would rarely do anything.
