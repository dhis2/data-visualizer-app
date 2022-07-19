import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { FlyoutMenu, MenuSectionHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { AdvancedSubMenu } from './AdvancedSubMenu.js'
import {
    FILE_FORMAT_CSV,
    FILE_FORMAT_XLS,
    FILE_FORMAT_JSON,
    FILE_FORMAT_XML,
} from './constants.js'
import { GraphicsMenu } from './GraphicsMenu.js'
import { PlainDataSourceSubMenu } from './PlainDataSourceSubMenu.js'
import { TableMenu } from './TableMenu.js'

const DownloadMenu = ({ visType, onDownloadData, onDownloadImage }) => (
    <FlyoutMenu>
        {visType === VIS_TYPE_PIVOT_TABLE ? (
            <TableMenu onDownload={onDownloadData} />
        ) : (
            <GraphicsMenu onDownload={onDownloadImage} />
        )}
        <MenuSectionHeader label={i18n.t('Plain data source')} />
        <PlainDataSourceSubMenu
            onDownload={onDownloadData}
            label={i18n.t('JSON')}
            format={FILE_FORMAT_JSON}
        />
        <PlainDataSourceSubMenu
            onDownload={onDownloadData}
            label={i18n.t('XML')}
            format={FILE_FORMAT_XML}
        />
        <PlainDataSourceSubMenu
            onDownload={onDownloadData}
            label={i18n.t('Microsoft Excel')}
            format={FILE_FORMAT_XLS}
        />
        <PlainDataSourceSubMenu
            onDownload={onDownloadData}
            label={i18n.t('CSV')}
            format={FILE_FORMAT_CSV}
        />
        <AdvancedSubMenu
            onDownload={onDownloadData}
            label={i18n.t('Advanced')}
        />
    </FlyoutMenu>
)

DownloadMenu.propTypes = {
    visType: PropTypes.string.isRequired,
    onDownloadData: PropTypes.func.isRequired,
    onDownloadImage: PropTypes.func.isRequired,
}

export { DownloadMenu }
