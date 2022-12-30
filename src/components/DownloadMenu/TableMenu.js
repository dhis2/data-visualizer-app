import i18n from '@dhis2/d2-i18n'
import { MenuItem, MenuSectionHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DOWNLOAD_TYPE_TABLE,
    FILE_FORMAT_XLS,
    FILE_FORMAT_CSV,
    FILE_FORMAT_HTML_CSS,
} from './constants.js'

export const TableMenu = ({ onDownload }) =>
    React.Children.toArray([
        <MenuSectionHeader
            key="table-header"
            label={i18n.t('Table layout')}
            hideDivider
        />,
        <MenuItem
            key="xls"
            label={i18n.t('Excel (.xls)')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_TABLE,
                    format: FILE_FORMAT_XLS,
                })
            }
        />,
        <MenuItem
            key="csv"
            label={i18n.t('CSV (.csv)')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_TABLE,
                    format: FILE_FORMAT_CSV,
                })
            }
        />,
        <MenuItem
            key="html"
            label={i18n.t('HTML (.html)')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_TABLE,
                    format: FILE_FORMAT_HTML_CSS,
                })
            }
        />,
    ])

TableMenu.propTypes = {
    onDownload: PropTypes.func.isRequired,
}
