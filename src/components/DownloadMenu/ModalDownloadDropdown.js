import i18n from '@dhis2/d2-i18n'
import { DropdownButton } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { DownloadMenu } from './DownloadMenu.js'
import styles from './ModalDownloadDropdown.module.css'
import { useDownload } from './useDownload.js'

const ModalDownloadDropdown = ({ relativePeriodDate }) => {
    const { disabled, doDownloadData, doDownloadImage, visType } =
        useDownload(relativePeriodDate)
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((currentIsOpen) => !currentIsOpen)
    }, [])
    const onDownloadData = useCallback(
        (payload) => {
            doDownloadData(payload)
            setIsOpen(false)
        },
        [doDownloadData]
    )
    const onDownloadImage = useCallback(
        (payload) => {
            doDownloadImage(payload)
            setIsOpen(false)
        },
        [doDownloadImage]
    )

    return (
        <div className={styles.container}>
            <DropdownButton
                component={
                    <DownloadMenu
                        onDownloadData={onDownloadData}
                        onDownloadImage={onDownloadImage}
                        visType={visType}
                    />
                }
                disabled={disabled}
                onClick={toggleOpen}
                open={isOpen}
                secondary
                small
            >
                {i18n.t('Download data from this date')}
            </DropdownButton>
        </div>
    )
}

ModalDownloadDropdown.propTypes = {
    relativePeriodDate: PropTypes.string,
}

export { ModalDownloadDropdown }
