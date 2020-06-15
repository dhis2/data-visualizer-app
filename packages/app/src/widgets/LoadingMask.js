import React from 'react'
import styles from './styles/LoadingMask.module.css'
import { CircularLoader } from '@dhis2/ui'

function LoadingMask() {
    return (
        <div className={styles.outer}>
            <CircularLoader className={styles.progress} />
        </div>
    )
}

export default LoadingMask
