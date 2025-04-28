import { IconInfo16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles/VisualizationOptions.module.css'

export const InfoText = ({ text }) => (
    <div className={styles.tabSectionOption}>
        <p className={styles.tabSectionOptionText}>
            <span className={styles.tabSectionOptionIcon}>
                <IconInfo16 />
            </span>
            {text}
        </p>
    </div>
)

InfoText.propTypes = {
    text: PropTypes.string,
}
