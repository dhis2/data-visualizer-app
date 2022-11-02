import i18n from '@dhis2/d2-i18n'
import { Layer, Popper } from '@dhis2/ui'
import React, { useRef } from 'react'
import MenuButton from '../MenuButton/MenuButton.js'
import { DownloadMenu } from './DownloadMenu.js'
import { useDownloadMenu } from './useDownloadMenu.js'

const ToolbarDownloadDropdown = () => {
    const buttonRef = useRef()
    const {
        isOpen,
        toggleOpen,
        disabled,
        doDownloadData,
        doDownloadImage,
        visType,
    } = useDownloadMenu()

    return (
        <>
            <MenuButton
                ref={buttonRef}
                onClick={toggleOpen}
                disabled={disabled}
            >
                {i18n.t('Download')}
            </MenuButton>
            {isOpen && (
                <Layer onClick={toggleOpen}>
                    <Popper reference={buttonRef} placement="bottom-start">
                        <DownloadMenu
                            onDownloadData={doDownloadData}
                            onDownloadImage={doDownloadImage}
                            visType={visType}
                        />
                    </Popper>
                </Layer>
            )}
        </>
    )
}

export { ToolbarDownloadDropdown }
