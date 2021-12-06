/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
import {
    VIS_TYPE_COLUMN,
    VIS_TYPE_LINE,
    visTypeIcons,
    hasRelativeItems,
    ALL_DYNAMIC_DIMENSION_ITEMS,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Radio,
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
} from '../../../assets/AxisIcons.js'
import {
    EmptySeries,
    EmptyBox,
    GenericError,
} from '../../../assets/ErrorIcons.js'
import {
    SERIES_ITEM_TYPE_PROP,
    SERIES_ITEM_AXIS_PROP,
} from '../../../modules/ui.js'
import { sGetSeriesSetupItems } from '../../../reducers/index.js'
import {
    sGetUiLayout,
    sGetUiOptions,
    sGetUiType,
} from '../../../reducers/ui.js'
import styles from '../styles/SeriesTable.module.css'

const availableAxes = [0, 1, 2, 3]
const allTypes = [VIS_TYPE_COLUMN, VIS_TYPE_LINE]

const SeriesTable = ({
    columns,
    layoutItems,
    optionItems,
    onChange,
    onItemChange,
    visType,
    showAxisOptions,
    showTypeOptions,
}) => {
    const availableTypes = [
        visType,
        ...allTypes.filter(type => type !== visType),
    ]

    useEffect(() => {
        if (!optionItems.length) {
            onChange(layoutItems)
        } else {
            const matchedItems = layoutItems.map(item => {
                const matchedItem = optionItems.find(
                    option => option.dimensionItem === item.dimensionItem
                )
                if (matchedItem) {
                    matchedItem.name = item.name
                }

                return matchedItem || item
            })
            onChange(matchedItems)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderTable = () => (
        <Table suppressZebraStriping className={styles.table}>
            <colgroup>
                <col className={styles.nameColumn} />
                <col className={styles.typeColumn} />
                <col className={styles.axisColumn} />
            </colgroup>
            <TableHead className={styles.tableHead}>
                <TableRow className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                        {i18n.t('Data item')}
                    </TableCell>

                    <TableCell className={styles.tableCell}>
                        {showTypeOptions && i18n.t('Visualization type')}
                    </TableCell>

                    {showAxisOptions &&
                        availableAxes.map((axis, index) => (
                            <TableCell key={index} className={styles.tableCell}>
                                {i18n.t('Axis {{axisId}}', {
                                    axisId: index + 1,
                                })}
                                <div className={styles.axisIcon}>
                                    {renderAxisIcon(index + 1)}
                                </div>
                            </TableCell>
                        ))}
                </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
                {optionItems.map(item => (
                    <TableRow
                        key={`multiaxis-table-row-${item.dimensionItem}`}
                        dataTest={'series-table-item'}
                    >
                        <TableCell className={styles.itemName}>
                            {item.name}
                        </TableCell>
                        <TableCell className={styles.itemType}>
                            {showTypeOptions &&
                                availableTypes.map(type => {
                                    const VisualizationTypeIcon =
                                        visTypeIcons[type]

                                    return (
                                        <div
                                            className={styles.typeContainer}
                                            key={type}
                                        >
                                            <Radio
                                                className={styles.radioInput}
                                                key={type}
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
                        {showAxisOptions &&
                            availableAxes.map(axis => (
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

    const renderAxisIcon = axis => {
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

    const renderError = (title, description, icon) => (
        <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>{icon}</div>
            <p className={styles.errorTitle}>{title}</p>
            <p className={styles.errorDescription}>{description}</p>
        </div>
    )

    const renderEmptySeriesError = () =>
        renderError(
            i18n.t('Series is empty'),
            i18n.t('Options for selected items will be available here'),
            EmptySeries()
        )

    const renderNoSeriesOptionsError = () =>
        renderError(
            i18n.t('No Series options'),
            i18n.t(
                "There aren't any Series options for this visualization type"
            ),
            EmptyBox()
        )

    const renderRelativeItemsError = () =>
        renderError(
            i18n.t('Series options unavailable'),
            i18n.t(
                'Series options are not available when using relative selections for periods, org units or categories'
            ),
            GenericError()
        )

    const renderAllItemsError = () =>
        renderError(
            i18n.t('Series options unavailable'),
            i18n.t(
                'Series options are not available when a series item has an "All items" selection'
            ),
            GenericError()
        )

    if (!showAxisOptions && !showTypeOptions) {
        return renderNoSeriesOptionsError()
    } else if (
        hasRelativeItems(
            columns[0],
            layoutItems.map(item => item.dimensionItem)
        )
    ) {
        return renderRelativeItemsError()
    } else if (
        layoutItems.some(
            item => item.dimensionItem === ALL_DYNAMIC_DIMENSION_ITEMS
        )
    ) {
        return renderAllItemsError()
    } else {
        return Object.keys(layoutItems).length && optionItems.length
            ? renderTable()
            : renderEmptySeriesError()
    }
}

SeriesTable.propTypes = {
    columns: PropTypes.array.isRequired,
    visType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onItemChange: PropTypes.func.isRequired,
    layoutItems: PropTypes.array,
    optionItems: PropTypes.array,
    showAxisOptions: PropTypes.bool,
    showTypeOptions: PropTypes.bool,
}

SeriesTable.defaultProps = {
    layoutItems: [],
    optionItems: [],
    showAxisOptions: false,
    showTypeOptions: false,
}

const mapStateToProps = state => ({
    layoutItems: sGetSeriesSetupItems(state),
    columns: sGetUiLayout(state).columns,
    optionItems: sGetUiOptions(state).series,
    visType: sGetUiType(state),
})

const mapDispatchToProps = {
    onChange: series => dispatch => {
        dispatch(acSetUiOptions({ series }))
    },
    onItemChange:
        ({ changedItem, value, prop }) =>
        dispatch => {
            dispatch(acUpdateUiSeriesItem({ changedItem, value, prop }))
        },
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
