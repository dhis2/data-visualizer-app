import { CircularLoader } from '@dhis2/ui'
import React from 'react'
import styles from './styles/LoadingMask.module.css'

function LoadingMask() {
    return (
        <div className={styles.outer} data-test="loading-mask">
            <CircularLoader className={styles.progress} />
        </div>
    )
}

export default LoadingMask
