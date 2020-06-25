import React, { useState, useEffect } from 'react'
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
import { DEFAULT_UI } from '../../../reducers/ui'
import { sGetAxisSetupItems } from '../../../reducers'
import { acSetAxes } from '../../../actions/ui'

const availableAxes = [0, 1, 2, 3]

const SeriesTable = ({ initItems, saveAxes }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(
            initItems.reduce((itemsMap, item) => {
                itemsMap[item.id] = item
                return itemsMap
            }, {})
        )
    }, [initItems])

    const onAxisChange = (item, axis) => {
        const updatedItems = {
            ...items,
            [item.id]: {
                ...item,
                axis,
            },
        }
        setItems(updatedItems)

        const axes = Object.values(updatedItems).reduce((map, item) => {
            map[item.id] = item.axis
            return map
        }, {})

        saveAxes(Object.keys(axes).length > 0 ? axes : DEFAULT_UI.axes)
    }

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
                    {Object.keys(items).map(id => {
                        const item = items[id]

                        return (
                            <TableRow key={`multiaxis-table-row-${id}`}>
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
                        )
                    })}
                </TableBody>
            </Table>
        )
    }
    return (
        <>
            {items && Object.keys(items).length
                ? renderTable()
                : i18n.t('Series is empty')}
        </>
    )
}

SeriesTable.propTypes = {
    saveAxes: PropTypes.func.isRequired,
    initItems: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.number.isRequired,
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
}

SeriesTable.defaultProps = {
    initItems: [],
}

const mapStateToProps = state => ({
    initItems: sGetAxisSetupItems(state),
})

const mapDispatchToProps = {
    saveAxes: axes => dispatch => {
        dispatch(acSetAxes(axes))
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesTable)
