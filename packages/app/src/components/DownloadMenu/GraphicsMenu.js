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

export const GraphicsMenu = ({ download }) =>
    React.Children.toArray([
        <MenuSectionHeader label={i18n.t('Graphics')} hideDivider={true} />,
        <MenuItem
            key="png"
            icon={<IconImage24 color={colors.grey600} />}
            label={i18n.t('Image (.png)')}
            onClick={() => download({ format: FILE_FORMAT_PNG })}
        />,
        <MenuItem
            key="pdf"
            icon={<IconFileDocument24 color={colors.grey600} />}
            label={i18n.t('PDF (.pdf)')}
            onClick={() => download({ format: FILE_FORMAT_PDF })}
        />,
    ])

GraphicsMenu.propTypes = {
    download: PropTypes.func.isRequired,
}
