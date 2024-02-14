import {
    formatValue,
    VALUE_TYPE_NUMBER,
    VALUE_TYPE_INTEGER,
    VALUE_TYPE_INTEGER_POSITIVE,
    VALUE_TYPE_INTEGER_NEGATIVE,
    VALUE_TYPE_INTEGER_ZERO_OR_POSITIVE,
    VALUE_TYPE_PERCENTAGE,
    VALUE_TYPE_UNIT_INTERVAL,
    VALUE_TYPE_TIME,
    VALUE_TYPE_DATE,
    VALUE_TYPE_DATETIME,
    VALUE_TYPE_TEXT,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableColumnHeader,
    DataTableHead,
    DataTableRow,
    Tooltip,
} from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { getOutlierTableHeadersDetails } from '../../modules/analytics.js'
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
    filters,
    responses,
    visualization,
    //style,
    //id: renderCounter,
    onDataSorted,
}) => {
    const data = responses[0]
    const headersDetails = getOutlierTableHeadersDetails({
        showHierarchy: visualization.showHierarchy,
    })
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

    const isInModal = !!filters?.relativePeriodDate

    const getDataTableScrollHeight = (isInModal) =>
        isInModal ? 'calc(100vh - 285px)' : '100%'

    const cellValueShouldNotWrap = (header) =>
        [
            VALUE_TYPE_NUMBER,
            VALUE_TYPE_INTEGER,
            VALUE_TYPE_INTEGER_POSITIVE,
            VALUE_TYPE_INTEGER_NEGATIVE,
            VALUE_TYPE_INTEGER_ZERO_OR_POSITIVE,
            VALUE_TYPE_PERCENTAGE,
            VALUE_TYPE_UNIT_INTERVAL,
            VALUE_TYPE_TIME,
            VALUE_TYPE_DATE,
            VALUE_TYPE_DATETIME,
        ].includes(header.valueType)

    const renderHeaderCell = ({ name, valueType }) => {
        const columnName = headersDetails[name]?.label
        const tooltipContent = headersDetails[name]?.tooltip

        return (
            <DataTableColumnHeader
                fixed
                top="0"
                key={name}
                name={name}
                onSortIconClick={
                    valueType !== VALUE_TYPE_NUMBER ? undefined : sortData
                }
                sortDirection={
                    valueType !== VALUE_TYPE_NUMBER
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
                {tooltipContent ? (
                    <Tooltip content={tooltipContent}>{columnName}</Tooltip>
                ) : (
                    columnName
                )}
            </DataTableColumnHeader>
        )
    }

    const formatValueCell = (value, header) =>
        formatValue(
            value,
            header.valueType || VALUE_TYPE_TEXT,
            header.optionSet
                ? {}
                : {
                      digitGroupSeparator: visualization.digitGroupSeparator,
                      skipRounding: false,
                  }
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
                scrollHeight={getDataTableScrollHeight(isInModal)}
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
                            {row.map((value, columnIndex) => (
                                <DataTableCell
                                    key={columnIndex}
                                    className={cx(
                                        styles.cell,
                                        fontSizeClass,
                                        sizeClass,
                                        {
                                            [styles.nowrap]:
                                                cellValueShouldNotWrap(
                                                    data.headers[columnIndex]
                                                ),
                                        },
                                        'bordered'
                                    )}
                                    dataTest={'table-cell'}
                                >
                                    {formatValueCell(
                                        value,
                                        data.headers[columnIndex]
                                    )}
                                </DataTableCell>
                            ))}
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
    filters: PropTypes.object,
    //    id: PropTypes.number,
    onDataSorted: PropTypes.func,
}

export default OutlierTablePlugin
