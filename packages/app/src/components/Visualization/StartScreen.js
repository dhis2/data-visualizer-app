import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import { visTypeIcons } from '@dhis2/analytics'

import styles from './styles/StartScreen.module.css'
import { sGetLoadError } from '../../reducers/loader'
import { apiFetchMostViewedVisualizations } from '../../api/mostViewedVisualizations'
import history from '../../modules/history'
import { VisualizationError, genericErrorTitle } from '../../modules/error'
import { GenericError } from '../../assets/ErrorIcons'
import { apiFetchVisualizations } from '../../api/visualization'
import { matchVisualizationWithType } from './utils'
import { sGetUsername } from '../../reducers/user'

const StartScreen = ({ error, username }) => {
    const [mostViewedVisualizations, setMostViewedVisualizations] = useState([])
    const engine = useDataEngine()

    useEffect(() => {
        async function populateMostViewedVisualizations(engine) {
            const mostViewedVisualizationsResult = await apiFetchMostViewedVisualizations(
                engine,
                6,
                username
            )
            const visualizations = mostViewedVisualizationsResult.visualization // {position: int, views: int, id: string, created: string}
            if (visualizations && visualizations.length) {
                const visualizationsResult = await apiFetchVisualizations(
                    engine,
                    visualizations.map(visualization => visualization.id)
                )
                const visualizationsWithType =
                    visualizationsResult.visualization.visualizations // {id: string, type: string}
                const result = matchVisualizationWithType(
                    visualizations,
                    visualizationsWithType
                )

                setMostViewedVisualizations(result)
            }
        }
        populateMostViewedVisualizations(engine)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getContent = () =>
        error ? (
            getErrorContent()
        ) : (
            <div data-test="start-screen">
                <div className={styles.section}>
                    <h3
                        className={styles.title}
                        data-test="start-screen-primary-section-title"
                    >
                        {i18n.t('Getting started')}
                    </h3>
                    <ul className={styles.guide}>
                        <li className={styles.guideItem}>
                            {i18n.t(
                                'All dimensions that you can use to build visualizations are shown in the left sidebar'
                            )}
                        </li>
                        <li className={styles.guideItem}>
                            {i18n.t('Add dimensions to the layout above')}
                        </li>
                        <li className={styles.guideItem}>
                            {i18n.t('Click a dimension to add or remove items')}
                        </li>
                    </ul>
                </div>
                {mostViewedVisualizations.length > 0 && (
                    <div className={styles.section}>
                        <h3
                            className={styles.title}
                            data-test="start-screen-secondary-section-title"
                        >
                            {i18n.t('Your most viewed charts and tables')}
                        </h3>
                        {mostViewedVisualizations.map(
                            (visualization, index) => (
                                <p
                                    key={index}
                                    className={styles.visualization}
                                    onClick={() =>
                                        history.push(`/${visualization.id}`)
                                    }
                                    data-test="start-screen-most-viewed-list-item"
                                >
                                    <span className={styles.visIcon}>
                                        {visTypeIcons[visualization.type]}
                                    </span>
                                    <span>{visualization.name}</span>
                                </p>
                            )
                        )}
                    </div>
                )}
            </div>
        )

    const getErrorContent = () => (
        <div
            className={styles.errorContainer}
            data-test="start-screen-error-container"
        >
            {error instanceof VisualizationError ? (
                <>
                    <div className={styles.errorIcon}>{error.icon()}</div>
                    <p className={styles.errorTitle}>{error.title}</p>
                    <p className={styles.errorDescription}>
                        {error.description}
                    </p>
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

    return (
        <div className={styles.outer}>
            <div className={styles.inner}>{getContent()}</div>
        </div>
    )
}

StartScreen.propTypes = {
    error: PropTypes.object,
    username: PropTypes.string,
}

const mapStateToProps = state => ({
    error: sGetLoadError(state),
    username: sGetUsername(state),
})

export default connect(mapStateToProps)(StartScreen)
