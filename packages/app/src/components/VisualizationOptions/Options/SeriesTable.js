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

import styles from '../styles/SeriesTable.module.css'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui'
import { sGetSeriesSetupItems } from '../../../reducers'
import { VIS_TYPE_COLUMN, VIS_TYPE_LINE } from '@dhis2/analytics'

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

    const renderTable = () => (
        <Table className={styles.table}>
            <colgroup>
                <col className={styles.nameColumn} />
                <col className={styles.coloredColumn} />
                <col className={styles.axisColumn} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell>{i18n.t('Data item')}</TableCell>
                    {showTypeOptions && (
                        <TableCell>{i18n.t('Chart type')}</TableCell>
                    )}
                    {showAxisOptions &&
                        availableAxes.map((axis, index) => (
                            <TableCell key={index} className={styles.centered}>
                                {i18n.t('Axis {{axisId}}', {
                                    axisId: index + 1,
                                })}
                            </TableCell>
                        ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {optionItems.map(item => (
                    <TableRow key={`multiaxis-table-row-${item.dimensionItem}`}>
                        <TableCell>{item.name}</TableCell>
                        {showTypeOptions && (
                            <TableCell>
                                {availableTypes.map(type => (
                                    <div key={type}>
                                        <span>{type}</span>
                                        <Radio
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
                                        />
                                    </div>
                                ))}
                            </TableCell>
                        )}
                        {showAxisOptions &&
                            availableAxes.map(axis => (
                                <TableCell key={axis}>
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
    if (!showAxisOptions && !showTypeOptions) {
        return i18n.t('No Series options') // TODO: Add the proper design here
    } else {
        return (
            <>
                {layoutItems &&
                Object.keys(layoutItems).length &&
                optionItems &&
                optionItems.length
                    ? renderTable()
                    : i18n.t('Series is empty') // TODO: Add the proper design here
                }
            </>
        )
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
