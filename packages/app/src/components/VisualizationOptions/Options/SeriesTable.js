import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Radio,
} from '@dhis2/ui'
import { VIS_TYPE_COLUMN, VIS_TYPE_LINE, visTypeIcons } from '@dhis2/analytics'

import styles from '../styles/SeriesTable.module.css'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui'
import { sGetSeriesSetupItems } from '../../../reducers'
import { EmptySeries, EmptyBox } from '../../../assets/ErrorIcons'
import {
    AxisOne,
    AxisTwo,
    AxisThree,
    AxisFour,
} from '../../../assets/AxisIcons'

const allTypes = [VIS_TYPE_COLUMN, VIS_TYPE_LINE]
const TYPE_PROP = 'type'
const AXIS_PROP = 'axis'

const SeriesTable = ({
    layoutItems,
    optionItems,
    onChange,
    visType,
    showAxisOptions,
    showTypeOptions,
}) => {
    const availableAxes = [0, 1, 2, 3]
    const availableTypes = [
        visType,
        ...allTypes.filter(type => type !== visType),
    ]

    useEffect(() => {
        if (!optionItems || !optionItems.length) {
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
    }, [])

    const onItemChange = (changedItem, value, prop) => {
        const series = [...optionItems]
        const item = series.find(
            item => item.dimensionItem == changedItem.dimensionItem
        )
        item[prop] = value
        onChange(series)
    }

    // TODO: Remove zebra striping from table
    const renderTable = () => (
        <Table className={styles.table}>
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
                    {showTypeOptions && (
                        <TableCell className={styles.tableCell}>
                            {i18n.t('Chart type')}
                        </TableCell>
                    )}
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
                    <TableRow key={`multiaxis-table-row-${item.dimensionItem}`}>
                        <TableCell className={styles.itemName}>
                            {item.name}
                        </TableCell>
                        {showTypeOptions && (
                            <TableCell className={styles.itemType}>
                                {availableTypes.map(type => (
                                    <div
                                        className={styles.typeContainer}
                                        key={type}
                                    >
                                        <Radio
                                            className={styles.radioInput}
                                            key={type}
                                            onChange={() =>
                                                onItemChange(
                                                    item,
                                                    type,
                                                    TYPE_PROP
                                                )
                                            }
                                            checked={
                                                item.type
                                                    ? item.type === type
                                                    : visType === type
                                            }
                                            label={
                                                <span
                                                    className={styles.visIcon}
                                                >
                                                    {visTypeIcons[type]}
                                                </span>
                                            }
                                        />
                                    </div>
                                ))}
                            </TableCell>
                        )}
                        {showAxisOptions &&
                            availableAxes.map(axis => (
                                <TableCell
                                    key={axis}
                                    className={styles.itemAxis}
                                >
                                    <Radio
                                        onChange={() =>
                                            onItemChange(item, axis, AXIS_PROP)
                                        }
                                        checked={item.axis === axis}
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
            i18n.t("There aren't any Series options for this chart type"),
            EmptyBox()
        )

    if (!showAxisOptions && !showTypeOptions) {
        return renderNoSeriesOptionsError()
    } else {
        return layoutItems &&
            Object.keys(layoutItems).length &&
            optionItems &&
            optionItems.length
            ? renderTable()
            : renderEmptySeriesError()
    }
}

SeriesTable.propTypes = {
    visType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    layoutItems: PropTypes.array,
    optionItems: PropTypes.array,
    showAxisOptions: PropTypes.bool,
    showTypeOptions: PropTypes.bool,
}

SeriesTable.defaultProps = {
    showAxisOptions: false,
    showTypeOptions: false,
}

const mapStateToProps = state => ({
    layoutItems: sGetSeriesSetupItems(state),
    optionItems: sGetUiOptions(state).series,
    visType: sGetUiType(state),
})

const mapDispatchToProps = {
    onChange: value => dispatch => {
        dispatch(acSetUiOptions({ series: value }))
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
