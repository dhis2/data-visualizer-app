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

const availableAxes = [0, 1, 2, 3]
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

    const onItemChange = (changedItem, value, prop) => {
        const series = [...optionItems]
        const item = series.find(
            item => item.dimensionItem == changedItem.dimensionItem
        )
        item[prop] = value
        onChange(series)
    }

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
                    <TableRow key={`multiaxis-table-row-${item.dimensionItem}`}>
                        <TableCell className={styles.itemName}>
                            {item.name}
                        </TableCell>
                        <TableCell className={styles.itemType}>
                            {showTypeOptions &&
                                availableTypes.map(type => (
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
                                            dense
                                        />
                                    </div>
                                ))}
                        </TableCell>
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
                                        dense
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

    if (!showAxisOptions && !showTypeOptions) {
        return renderNoSeriesOptionsError()
    } else {
        return Object.keys(layoutItems).length && optionItems.length
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
    layoutItems: [],
    optionItems: [],
    showAxisOptions: false,
    showTypeOptions: false,
}

const mapStateToProps = state => ({
    layoutItems: sGetSeriesSetupItems(state),
    optionItems: sGetUiOptions(state).series,
    visType: sGetUiType(state),
})

const mapDispatchToProps = {
    onChange: series => dispatch => {
        dispatch(acSetUiOptions({ series }))
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
