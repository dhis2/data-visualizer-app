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
import { sGetUiOptions } from '../../../reducers/ui'
import { sGetSeriesSetupItems } from '../../../reducers'

const availableAxes = [0, 1, 2, 3]

const SeriesTable = ({ layoutItems, optionItems, onChange }) => {
    useEffect(() => {
        if (!optionItems || !optionItems.length) {
            onChange(layoutItems)
        } else {
            const tempItems = []
            layoutItems.forEach(item => {
                const matchedItem = optionItems.find(
                    option => option.dimensionItem === item.dimensionItem
                )
                tempItems.push(matchedItem || item)
            })
            onChange(tempItems)
        }
    }, [])

    const onAxisChange = (changedItem, newAxis) => {
        const series = [...optionItems]
        series.find(
            item => item.dimensionItem == changedItem.dimensionItem
        ).axis = newAxis
        onChange(series)
    }

    // TODO: Add type dropdown
    const renderTable = () => {
        return (
            <Table className={styles.table}>
                <colgroup>
                    <col className={styles.nameColumn} />
                    <col className={styles.coloredColumn} />
                    <col className={styles.axisColumn} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {availableAxes.map((axis, index) => (
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
                        <TableRow
                            key={`multiaxis-table-row-${item.dimensionItem}`}
                        >
                            <TableCell>{item.name}</TableCell>
                            {availableAxes.map(axis => (
                                <TableCell key={axis}>
                                    <Radio
                                        onChange={() =>
                                            onAxisChange(item, axis)
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
    }
    return (
        <>
            {layoutItems &&
            Object.keys(layoutItems).length &&
            optionItems &&
            optionItems.length
                ? renderTable()
                : i18n.t('Series is empty')}
        </>
    )
}

SeriesTable.propTypes = {
    onChange: PropTypes.func.isRequired,
    layoutItems: PropTypes.array,
    optionItems: PropTypes.array,
}

const mapStateToProps = state => ({
    layoutItems: sGetSeriesSetupItems(state),
    optionItems: sGetUiOptions(state).series,
})

const mapDispatchToProps = {
    onChange: value => dispatch => {
        dispatch(acSetUiOptions({ series: value }))
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
