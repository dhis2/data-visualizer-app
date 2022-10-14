import i18n from '@dhis2/d2-i18n'
import { MenuItem, MenuSectionHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DOWNLOAD_TYPE_PLAIN,
    FILE_FORMAT_JSON,
    FILE_FORMAT_XML,
    FILE_FORMAT_JRXML,
    FILE_FORMAT_SQL,
} from './constants.js'

export const AdvancedSubMenu = ({ onDownload, label, ...menuItemProps }) => (
    <MenuItem label={label} {...menuItemProps}>
        <MenuSectionHeader label={i18n.t('Data value set')} />
        <MenuItem
            label={i18n.t('JSON')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format: FILE_FORMAT_JSON,
                    path: 'dataValueSet',
                })
            }
        />
        <MenuItem
            label={i18n.t('XML')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format: FILE_FORMAT_XML,
                    path: 'dataValueSet',
                })
            }
        />
        <MenuSectionHeader label={i18n.t('Other formats')} />
        <MenuItem
            label={i18n.t('JRXML')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format: FILE_FORMAT_JRXML,
                })
            }
        />
        <MenuItem
            label={i18n.t('Raw data SQL')}
            onClick={() =>
                onDownload({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format: FILE_FORMAT_SQL,
                    path: 'debug/sql',
                })
            }
        />
    </MenuItem>
)

AdvancedSubMenu.propTypes = {
    label: PropTypes.string.isRequired,
    onDownload: PropTypes.func.isRequired,
}
