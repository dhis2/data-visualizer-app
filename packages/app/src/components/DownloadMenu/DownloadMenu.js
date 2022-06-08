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

const DownloadMenu = ({ visType, downloadData, downloadImage }) => (
    <FlyoutMenu>
        {visType === VIS_TYPE_PIVOT_TABLE ? (
            <TableMenu download={downloadData} />
        ) : (
            <GraphicsMenu download={downloadImage} />
        )}
        <MenuSectionHeader label={i18n.t('Plain data source')} />
        <PlainDataSourceSubMenu
            download={downloadData}
            label={i18n.t('JSON')}
            format={FILE_FORMAT_JSON}
        />
        <PlainDataSourceSubMenu
            download={downloadData}
            label={i18n.t('XML')}
            format={FILE_FORMAT_XML}
        />
        <PlainDataSourceSubMenu
            download={downloadData}
            label={i18n.t('Microsoft Excel')}
            format={FILE_FORMAT_XLS}
        />
        <PlainDataSourceSubMenu
            download={downloadData}
            label={i18n.t('CSV')}
            format={FILE_FORMAT_CSV}
        />
        <AdvancedSubMenu download={downloadData} label={i18n.t('Advanced')} />
    </FlyoutMenu>
)

DownloadMenu.propTypes = {
    downloadData: PropTypes.func.isRequired,
    downloadImage: PropTypes.func.isRequired,
    visType: PropTypes.string.isRequired,
}

export { DownloadMenu }
