import i18n from '@dhis2/d2-i18n'
import { DropdownButton } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { DownloadMenu } from './DownloadMenu.js'
import styles from './ModalDownloadDropdown.module.css'
import { useDownloadMenu } from './useDownloadMenu.js'

const ModalDownloadDropdown = ({ relativePeriodDate }) => {
    const {
        isOpen,
        toggleOpen,
        disabled,
        downloadData,
        downloadImage,
        visType,
    } = useDownloadMenu(relativePeriodDate)

    return (
        <div className={styles.container}>
            <DropdownButton
                component={
                    <DownloadMenu
                        downloadData={downloadData}
                        downloadImage={downloadImage}
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
