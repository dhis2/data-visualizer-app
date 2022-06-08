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

/* eslint-disable react/jsx-key */
export const TableMenu = ({ download }) =>
    React.Children.toArray([
        <MenuSectionHeader label={i18n.t('Table layout')} hideDivider={true} />,
        <MenuItem
            label={i18n.t('Excel (.xls)')}
            onClick={() =>
                download({ type: DOWNLOAD_TYPE_TABLE, format: FILE_FORMAT_XLS })
            }
        />,
        <MenuItem
            label={i18n.t('CSV (.csv)')}
            onClick={() =>
                download({ type: DOWNLOAD_TYPE_TABLE, format: FILE_FORMAT_CSV })
            }
        />,
        <MenuItem
            label={i18n.t('HTML (.html)')}
            onClick={() =>
                download({
                    type: DOWNLOAD_TYPE_TABLE,
                    format: FILE_FORMAT_HTML_CSS,
                })
            }
        />,
    ])

TableMenu.propTypes = {
    download: PropTypes.func.isRequired,
}
