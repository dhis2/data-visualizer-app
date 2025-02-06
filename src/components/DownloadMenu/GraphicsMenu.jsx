import { HoverMenuListItem } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    MenuItem,
    MenuSectionHeader,
    IconImage24,
    IconFileDocument24,
    colors,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FILE_FORMAT_PDF, FILE_FORMAT_PNG } from './constants.js'

export const GraphicsMenu = ({ hoverable, onDownload }) => {
    const MenuItemComponent = hoverable ? HoverMenuListItem : MenuItem

    return (
        <>
            <MenuSectionHeader
                key="graphics-header"
                label={i18n.t('Graphics')}
                hideDivider
                dense={hoverable}
            />
            <MenuItemComponent
                key="png"
                icon={<IconImage24 color={colors.grey600} />}
                label={i18n.t('Image (.png)')}
                onClick={() => onDownload({ format: FILE_FORMAT_PNG })}
                className="push-analytics-download-menu-item"
            />
            <MenuItemComponent
                key="pdf"
                icon={<IconFileDocument24 color={colors.grey600} />}
                label={i18n.t('PDF (.pdf)')}
                onClick={() => onDownload({ format: FILE_FORMAT_PDF })}
            />
        </>
    )
}

GraphicsMenu.propTypes = {
    onDownload: PropTypes.func.isRequired,
    hoverable: PropTypes.bool,
}
