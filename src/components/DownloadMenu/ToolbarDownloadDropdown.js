import { HoverMenuDropdown } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { DownloadMenu } from './DownloadMenu.js'
import { useDownload } from './useDownload.js'

const ToolbarDownloadDropdown = () => {
    const { disabled, doDownloadData, doDownloadImage, visType } = useDownload()

    return (
        <HoverMenuDropdown label={i18n.t('Download')} disabled={disabled}>
            <DownloadMenu
                hoverable
                onDownloadData={doDownloadData}
                onDownloadImage={doDownloadImage}
                visType={visType}
            />
        </HoverMenuDropdown>
    )
}

export { ToolbarDownloadDropdown }
