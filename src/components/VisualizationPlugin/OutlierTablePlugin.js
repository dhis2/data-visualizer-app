import { getFixedDimensions } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableColumnHeader,
    DataTableHead,
    DataTableRow,
} from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { getOutlierTableHeadersMap } from '../../modules/analytics.js'
import {
    DISPLAY_DENSITY_COMFORTABLE,
    DISPLAY_DENSITY_COMPACT,
    FONT_SIZE_LARGE,
    FONT_SIZE_NORMAL,
    FONT_SIZE_SMALL,
} from '../../modules/options.js'
import {
    getDefaultSorting,
    getSortingFromVisualization,
} from '../../modules/ui.js'
import styles from './styles/OutlierTablePlugin.module.css'

const getFontSizeClass = (fontSize) => {
    switch (fontSize) {
        case FONT_SIZE_LARGE:
            return styles.fontSizeLarge
        case FONT_SIZE_SMALL:
            return styles.fontSizeSmall
        case FONT_SIZE_NORMAL:
        default:
            return styles.fontSizeNormal
    }
}

const getSizeClass = (displayDensity) => {
    switch (displayDensity) {
        case DISPLAY_DENSITY_COMFORTABLE:
            return styles.sizeComfortable
        case DISPLAY_DENSITY_COMPACT:
            return styles.sizeCompact
        default:
            return styles.sizeNormal
    }
}

const OutlierTablePlugin = ({
    responses,
    visualization,
    //style,
    //id: renderCounter,
    onDataSorted,
}) => {
    const data = responses[0]
    const headersMap = getOutlierTableHeadersMap({
        showHierarchy: visualization.showHierarchy,
    })
    const fixedDimensions = getFixedDimensions()

    //    const isInModal = false // TODO !!filters?.relativePeriodDate

    const defaultSorting = useMemo(() => getDefaultSorting(), [])

    const getSorting = useCallback(
        (visualization) => {
            const sorting =
                getSortingFromVisualization(visualization) || defaultSorting

            return {
                sortField: sorting.dimension,
                sortDirection: sorting.direction,
            }
        },
        [defaultSorting]
    )

    const { sortField, sortDirection } = getSorting(visualization)

    const sizeClass = getSizeClass(visualization.displayDensity)
    const fontSizeClass = getFontSizeClass(visualization.fontSize)

    const lookupColumnName = (name) => {
        const dimensionId = Object.entries(headersMap).find(
            (entry) => entry[1] === name
        )?.[0]

        if (dimensionId) {
            return fixedDimensions[dimensionId]?.name
        }

        return undefined
    }

    const renderHeaderCell = ({ name, column, valueType }) => {
        const columnName = lookupColumnName(name) || column

        return (
            <DataTableColumnHeader
                fixed
                top="0"
                key={name}
                name={name}
                onSortIconClick={valueType !== 'NUMBER' ? undefined : sortData}
                sortDirection={
                    valueType !== 'NUMBER'
                        ? undefined
                        : name === sortField
                        ? sortDirection
                        : 'default'
                }
                sortIconTitle={
                    name === sortField && sortDirection === 'desc'
                        ? i18n.t(
                              'Sort ascending by {{columnName}} and update',
                              { columnName }
                          )
                        : i18n.t(
                              'Sort descending by {{columnName}} and update',
                              { columnName }
                          )
                }
                className={cx(
                    styles.headerCell,
                    fontSizeClass,
                    sizeClass,
                    'bordered'
                )}
                dataTest="table-header"
            >
                {columnName}
            </DataTableColumnHeader>
        )
    }

    const renderValueCell = ({ columnIndex, value }) => (
        <DataTableCell
            key={columnIndex}
            className={cx(styles.cell, fontSizeClass, sizeClass, 'bordered')}
            dataTest={'table-cell'}
        >
            {value}
        </DataTableCell>
    )

    const sortData = ({ name }) => {
        const direction =
            sortField === name
                ? sortDirection === 'desc'
                    ? 'asc'
                    : 'desc'
                : 'desc'

        onDataSorted({ dimension: name, direction })
    }

    return (
        <div className={styles.pluginContainer}>
            <DataTable
                scrollWidth="100%"
                width="auto"
                className={styles.dataTable}
                dataTest="outlier-table"
            >
                <DataTableHead>
                    <DataTableRow>
                        {data.headers.map((header) => renderHeaderCell(header))}
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody dataTest={'table-body'}>
                    {data.rows.map((row, rowIndex) => (
                        <DataTableRow key={rowIndex} dataTest={'table-row'}>
                            {row.map((value, columnIndex) =>
                                renderValueCell({
                                    columnIndex,
                                    value,
                                })
                            )}
                        </DataTableRow>
                    ))}
                </DataTableBody>
            </DataTable>
        </div>
    )
}

OutlierTablePlugin.defaultProps = {
    style: {},
    onDataSorted: Function.prototype,
}

OutlierTablePlugin.propTypes = {
    responses: PropTypes.arrayOf(PropTypes.object).isRequired,
    //style: PropTypes.object,
    visualization: PropTypes.object.isRequired,
    //    id: PropTypes.number,
    onDataSorted: PropTypes.func,
}

export default OutlierTablePlugin
