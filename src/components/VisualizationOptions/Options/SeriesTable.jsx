import {
    COLOR_SET_DEFAULT,
    COLOR_SET_PATTERNS,
    VIS_TYPE_COLUMN,
    VIS_TYPE_LINE,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
    visTypeIcons,
    hasCustomAxes,
} from '@dhis2/analytics'
import { useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Field,
    Radio,
    SegmentedControl,
    SingleSelectField,
    SingleSelectOption,
    colors,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    acSetUiOption,
    acSetUiOptions,
    acUpdateUiSeriesItem,
} from '../../../actions/ui.js'
import {
    AxisOne,
    AxisTwo,
    AxisThree,
    AxisFour,
} from '../../../assets/AxisIcons.jsx'
import { EmptyBox, EmptySeries } from '../../../assets/ErrorIcons.jsx'
import { getMetadataColor } from '../../../modules/mockMetadataColors.js'
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
    OPTION_SERIES,
} from '../../../modules/options.js'
import {
    applyAxisPalette,
    applyPalette,
    getPaletteLabels,
    isLegendMode,
    isPositionalSeries,
    mergeSeriesItems,
    PALETTE_BY_AXIS,
    PALETTE_IDS,
    resetToAuto,
    seedLegacyColors,
    seedSeriesColors,
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
import { sGetVisualization } from '../../../reducers/visualization.js'
import coloursStyles from '../styles/Colours.module.css'
import styles from '../styles/SeriesTable.module.css'
import tabStyles from '../styles/VisualizationOptions.module.css'
import ApplyColorsMenu from './Colours/ApplyColorsMenu.jsx'
import SeriesColorButton from './Colours/SeriesColorButton.jsx'
import LegendDisplayStrategy from './LegendDisplayStrategy.jsx'
import ShowLegendKey from './ShowLegendKey.jsx'

const availableAxes = [0, 1, 2, 3]
const allTypes = [VIS_TYPE_COLUMN, VIS_TYPE_LINE]

const MODE_LEGEND = 'LEGEND'
const MODE_STATIC = 'STATIC'

const LAYOUT_ITEMS_PROP_DEFAULT = []

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

// Relative charts can't own per-item colours: pick the palette they use, in order
const getRelativeSeed = (colorSet) =>
    !colorSet || colorSet === COLOR_SET_PATTERNS ? COLOR_SET_DEFAULT : colorSet

const SeriesTable = ({
    layoutItems = LAYOUT_ITEMS_PROP_DEFAULT,
    options,
    visType,
    seriesDimensionId,
    seriesItemIds,
    isSaved,
    onItemChange,
    setOptions,
    setOption,
    showAxisOptions = false,
    showTypeOptions = false,
    showColours = false,
    showModeSwitch = false,
    showFill = true,
}) => {
    const [mode, setMode] = useState(() =>
        showModeSwitch && isLegendMode(options[OPTION_LEGEND])
            ? MODE_LEGEND
            : MODE_STATIC
    )
    const legendMode = showModeSwitch && mode === MODE_LEGEND
    const relative = isPositionalSeries({
        type: visType,
        dimensionId: seriesDimensionId,
        itemIds: seriesItemIds,
    })
    const paletteId = options[OPTION_COLOR_SEED] || COLOR_SET_DEFAULT
    const items = mergeSeriesItems(layoutItems, options[OPTION_SERIES])
    const availableTypes = [
        visType,
        ...allTypes.filter((type) => type !== visType),
    ]

    const writeItems = (newItems, extraOptions = {}) =>
        setOptions({ [OPTION_SERIES]: newItems, ...extraOptions })

    const { show: showUndo } = useAlert(
        ({ message }) => message,
        ({ onUndo }) => ({
            success: true,
            duration: 6000,
            actions: [{ label: i18n.t('Undo'), onClick: onUndo }],
        })
    )

    // Sync with the layout and seed once when the tab opens.
    // Saved charts without stored colours freeze what they rendered with before.
    useEffect(() => {
        if (!showColours) {
            writeItems(items)
        } else if (relative) {
            writeItems(items, {
                [OPTION_COLOR_SEED]:
                    options[OPTION_COLOR_SEED] ||
                    getRelativeSeed(options[OPTION_COLOR_SET]),
                ...(!options[OPTION_COLOR_SEED] &&
                options[OPTION_COLOR_SET] === COLOR_SET_PATTERNS
                    ? { [OPTION_FILL_TYPE]: FILL_TYPE_PATTERN }
                    : {}),
            })
        } else if (isSaved && !items.some((item) => item.color)) {
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
        if (value === mode) {
            return
        }

        setMode(value)

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
        const previous = { items, seed: options[OPTION_COLOR_SEED] }

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

    const onColorChange = (dimensionItem, color) =>
        writeItems(
            items.map((item) =>
                item.dimensionItem === dimensionItem ? { ...item, color } : item
            )
        )

    const showColorColumn = showColours && !legendMode && !relative
    const showTypeColumn = showTypeOptions && !relative
    const showAxisColumns = showAxisOptions && !relative
    const showTable =
        items.length > 0 &&
        (showColorColumn || showTypeColumn || showAxisColumns)

    const renderColourControls = () => (
        <div className={coloursStyles.header}>
            {showModeSwitch ? (
                <div className={coloursStyles.modeSwitch}>
                    <span className={coloursStyles.modeLabel}>
                        {i18n.t('Colour by')}
                    </span>
                    <SegmentedControl
                        options={[
                            { label: i18n.t('Legend'), value: MODE_LEGEND },
                            { label: i18n.t('Static'), value: MODE_STATIC },
                        ]}
                        selected={legendMode ? MODE_LEGEND : MODE_STATIC}
                        onChange={onModeChange}
                    />
                </div>
            ) : (
                <span />
            )}
            {!legendMode && !relative && items.length > 0 && (
                <ApplyColorsMenu
                    showByAxis={showAxisOptions && hasCustomAxes(items)}
                    showResetToAuto
                    onApply={onApply}
                    onReset={onReset}
                />
            )}
        </div>
    )

    const renderLegendSettings = () => (
        <div className={coloursStyles.legendSettings}>
            <div className={tabStyles.tabSectionOption}>
                <LegendDisplayStrategy />
            </div>
            <ShowLegendKey />
        </div>
    )

    const renderRelativeColours = () => (
        <div className={coloursStyles.relative}>
            <p className={coloursStyles.positionalNote}>
                {i18n.t(
                    'Series with relative selections change over time, so colours are assigned in order from a palette. Colour, type and axis can only be set per item for fixed selections.'
                )}
            </p>
            <div className={coloursStyles.paletteSelect}>
                <SingleSelectField
                    dense
                    label={i18n.t('Palette')}
                    selected={paletteId}
                    onChange={({ selected }) =>
                        setOptions({ [OPTION_COLOR_SEED]: selected })
                    }
                    dataTest="series-palette-select"
                >
                    {PALETTE_IDS.map((id) => (
                        <SingleSelectOption
                            key={id}
                            value={id}
                            label={getPaletteLabels()[id]}
                        />
                    ))}
                </SingleSelectField>
            </div>
        </div>
    )

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
                {items.map((item) => (
                    <TableRow
                        key={`multiaxis-table-row-${item.dimensionItem}`}
                        dataTest={'series-table-item'}
                    >
                        <TableCell className={styles.itemName}>
                            {item.name}
                        </TableCell>
                        {showColorColumn && (
                            <TableCell className={styles.itemColor}>
                                <SeriesColorButton
                                    name={item.name || item.dimensionItem}
                                    value={item.color}
                                    metadataColor={getMetadataColor(
                                        item.dimensionItem
                                    )}
                                    onChange={(color) =>
                                        onColorChange(item.dimensionItem, color)
                                    }
                                />
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
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>{EmptySeries()}</div>
                <p className={styles.errorTitle}>{i18n.t('Series is empty')}</p>
                <p className={styles.errorDescription}>
                    {i18n.t(
                        'Options for selected items will be available here'
                    )}
                </p>
            </div>
        )
    }

    return (
        <div>
            {showColours && renderColourControls()}
            {showColours && legendMode && renderLegendSettings()}
            {showColours && !legendMode && relative && renderRelativeColours()}
            {showTable && renderTable()}
            {!showColours && relative && (
                <p className={coloursStyles.positionalNote}>
                    {i18n.t(
                        'Series options are not available when using relative selections for periods, org units or categories'
                    )}
                </p>
            )}
            {showColours && !legendMode && showFill && (
                <div className={coloursStyles.fill}>
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

SeriesTable.propTypes = {
    options: PropTypes.object.isRequired,
    setOption: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    visType: PropTypes.string.isRequired,
    onItemChange: PropTypes.func.isRequired,
    isSaved: PropTypes.bool,
    layoutItems: PropTypes.array,
    seriesDimensionId: PropTypes.string,
    seriesItemIds: PropTypes.array,
    showAxisOptions: PropTypes.bool,
    showColours: PropTypes.bool,
    showFill: PropTypes.bool,
    showModeSwitch: PropTypes.bool,
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
        isSaved: Boolean(sGetVisualization(state)?.id),
    }
}

const mapDispatchToProps = {
    setOptions: acSetUiOptions,
    setOption: acSetUiOption,
    onItemChange: ({ changedItem, value, prop }) =>
        acUpdateUiSeriesItem({ changedItem, value, prop }),
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
