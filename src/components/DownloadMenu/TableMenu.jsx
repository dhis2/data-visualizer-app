import { HoverMenuListItem } from '@dhis2/analytics'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { MenuItem, MenuSectionHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DOWNLOAD_TYPE_TABLE,
    FILE_FORMAT_XLS,
    FILE_FORMAT_XLSX,
    FILE_FORMAT_CSV,
    FILE_FORMAT_HTML_CSS,
} from './constants.js'

export const TableMenu = ({ hoverable, onDownload }) => {
    const config = useConfig()
    const MenuItemComponent = hoverable ? HoverMenuListItem : MenuItem

    return (
        <>
            <MenuSectionHeader
                key="table-header"
                label={i18n.t('Table layout')}
                hideDivider
                dense={hoverable}
            />
            <MenuItemComponent
                key="xls"
                label={
                    config.serverVersion.minor >= 42
                        ? i18n.t('Excel (.xlsx)')
                        : i18n.t('Excel (.xls)')
                }
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_TABLE,
                        format:
                            config.serverVersion.minor >= 42
                                ? FILE_FORMAT_XLSX
                                : FILE_FORMAT_XLS,
                    })
                }
            />
            <MenuItemComponent
                key="csv"
                label={i18n.t('CSV (.csv)')}
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_TABLE,
                        format: FILE_FORMAT_CSV,
                    })
                }
            />
            <MenuItemComponent
                key="html"
                label={i18n.t('HTML (.html)')}
                className="push-analytics-download-menu-item"
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_TABLE,
                        format: FILE_FORMAT_HTML_CSS,
                    })
                }
            />
        </>
    )
}

TableMenu.propTypes = {
    onDownload: PropTypes.func.isRequired,
    hoverable: PropTypes.bool,
}
