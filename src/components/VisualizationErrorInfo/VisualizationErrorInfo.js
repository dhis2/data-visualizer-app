import PropTypes from 'prop-types'
import React from 'react'
import { GenericError } from '../../assets/ErrorIcons.js'
import { VisualizationError, genericErrorTitle } from '../../modules/error.js'
import styles from './styles/VisualizationErrorInfo.module.css'

export const VisualizationErrorInfo = ({ error }) => (
    <div
        className={styles.errorContainer}
        data-test="visualization-error-container"
    >
        {error instanceof VisualizationError ? (
            <>
                <div className={styles.errorIcon}>{error.icon()}</div>
                <p className={styles.errorTitle}>{error.title}</p>
                <p className={styles.errorDescription}>{error.description}</p>
            </>
        ) : (
            <>
                <div className={styles.errorIcon}>{GenericError()}</div>
                <p className={styles.errorTitle}>{genericErrorTitle}</p>
                <p className={styles.errorDescription}>
                    {error.message || error}
                </p>
            </>
        )}
    </div>
)

VisualizationErrorInfo.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.instanceOf(Error),
        PropTypes.instanceOf(VisualizationError),
    ]),
}
