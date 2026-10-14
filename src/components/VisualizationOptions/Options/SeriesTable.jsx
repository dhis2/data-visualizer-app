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
import SeriesColorButton from './Colours/SeriesColorButton.jsx'
import { useColourOptionsInit } from './Colours/useColourOptionsInit.js'

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
