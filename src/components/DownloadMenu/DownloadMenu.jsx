import {
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_OUTLIER_TABLE,
    HoverMenuList,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { FlyoutMenu, MenuSectionHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { AdvancedSubMenu } from './AdvancedSubMenu.jsx'
import {
    FILE_FORMAT_CSV,
    FILE_FORMAT_XLS,
    FILE_FORMAT_JSON,
    FILE_FORMAT_XML,
} from './constants.js'
import { GraphicsMenu } from './GraphicsMenu.jsx'
import { PlainDataSourceSubMenu } from './PlainDataSourceSubMenu.jsx'
import { TableMenu } from './TableMenu.jsx'

const DownloadMenu = ({
    visType,
    onDownloadData,
    onDownloadImage,
    hoverable,
}) => {
    const MenuComponent = hoverable ? HoverMenuList : FlyoutMenu

    return (
        <MenuComponent>
            {visType === VIS_TYPE_PIVOT_TABLE ? (
                <TableMenu hoverable={hoverable} onDownload={onDownloadData} />
            ) : visType !== VIS_TYPE_OUTLIER_TABLE ? (
                <GraphicsMenu
                    hoverable={hoverable}
                    onDownload={onDownloadImage}
                />
            ) : null}
            <MenuSectionHeader
                label={i18n.t('Plain data source')}
                dense={hoverable}
                hideDivider={visType === VIS_TYPE_OUTLIER_TABLE}
            />
            <PlainDataSourceSubMenu
                hoverable={hoverable}
                onDownload={onDownloadData}
                label={i18n.t('JSON')}
                format={FILE_FORMAT_JSON}
            />
            {visType !== VIS_TYPE_OUTLIER_TABLE && (
                <PlainDataSourceSubMenu
                    hoverable={hoverable}
                    onDownload={onDownloadData}
                    label={i18n.t('XML')}
                    format={FILE_FORMAT_XML}
                />
            )}
            <PlainDataSourceSubMenu
                hoverable={hoverable}
                onDownload={onDownloadData}
                label={i18n.t('Microsoft Excel')}
                format={FILE_FORMAT_XLS}
            />
            <PlainDataSourceSubMenu
                hoverable={hoverable}
                onDownload={onDownloadData}
                label={i18n.t('CSV')}
                format={FILE_FORMAT_CSV}
            />
            {visType !== VIS_TYPE_OUTLIER_TABLE && (
                <AdvancedSubMenu
                    hoverable={hoverable}
                    onDownload={onDownloadData}
                    label={i18n.t('Advanced')}
                />
            )}
        </MenuComponent>
    )
}

DownloadMenu.propTypes = {
    visType: PropTypes.string.isRequired,
    onDownloadData: PropTypes.func.isRequired,
    onDownloadImage: PropTypes.func.isRequired,
    hoverable: PropTypes.bool,
}

export { DownloadMenu }
