import { HoverMenuListItem } from '@dhis2/analytics'
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

export const AdvancedSubMenu = ({
    hoverable,
    onDownload,
    label,
    ...menuItemProps
}) => {
    const MenuItemComponent = hoverable ? HoverMenuListItem : MenuItem

    return (
        <MenuItemComponent label={label} {...menuItemProps}>
            <MenuSectionHeader
                label={i18n.t('Data value set')}
                dense={hoverable}
                hideDivider
            />
            <MenuItemComponent
                label={i18n.t('JSON')}
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_PLAIN,
                        format: FILE_FORMAT_JSON,
                        path: 'dataValueSet',
                    })
                }
            />
            <MenuItemComponent
                label={i18n.t('XML')}
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_PLAIN,
                        format: FILE_FORMAT_XML,
                        path: 'dataValueSet',
                    })
                }
            />
            <MenuSectionHeader
                label={i18n.t('Other formats')}
                dense={hoverable}
            />
            <MenuItemComponent
                label={i18n.t('JRXML')}
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_PLAIN,
                        format: FILE_FORMAT_JRXML,
                    })
                }
            />
            <MenuItemComponent
                label={i18n.t('Raw data SQL')}
                onClick={() =>
                    onDownload({
                        type: DOWNLOAD_TYPE_PLAIN,
                        format: FILE_FORMAT_SQL,
                        path: 'debug/sql',
                    })
                }
            />
        </MenuItemComponent>
    )
}

AdvancedSubMenu.propTypes = {
    label: PropTypes.string.isRequired,
    onDownload: PropTypes.func.isRequired,
    hoverable: PropTypes.bool,
}
