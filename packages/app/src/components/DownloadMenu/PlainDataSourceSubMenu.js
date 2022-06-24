import i18n from '@dhis2/d2-i18n'
import { MenuItem, MenuSectionHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DOWNLOAD_TYPE_PLAIN,
    ID_SCHEME_UID,
    ID_SCHEME_CODE,
    ID_SCHEME_NAME,
} from './constants.js'

export const PlainDataSourceSubMenu = ({
    download,
    format,
    label,
    ...menuItemProps
}) => (
    <MenuItem label={label} {...menuItemProps}>
        <MenuSectionHeader label={i18n.t('Metadata ID scheme')} />
        <MenuItem
            label={i18n.t('ID')}
            onClick={() =>
                download({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format,
                    idScheme: ID_SCHEME_UID,
                })
            }
        />
        <MenuItem
            label={i18n.t('Code')}
            onClick={() =>
                download({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format,
                    idScheme: ID_SCHEME_CODE,
                })
            }
        />
        <MenuItem
            label={i18n.t('Name')}
            onClick={() =>
                download({
                    type: DOWNLOAD_TYPE_PLAIN,
                    format,
                    idScheme: ID_SCHEME_NAME,
                })
            }
        />
    </MenuItem>
)

PlainDataSourceSubMenu.propTypes = {
    download: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
