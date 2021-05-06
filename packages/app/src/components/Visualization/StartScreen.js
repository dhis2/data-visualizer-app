import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import styles from './styles/StartScreen.style'
import { sGetLoadError } from '../../reducers/loader'
import PropTypes from 'prop-types'
import { apiFetchMostViewedVisualizations } from '../../api/mostViewedVisualizations'
import history from '../../modules/history'
import { withStyles } from '@material-ui/core/styles'
import { useDataEngine } from '@dhis2/app-runtime'
import { VisualizationError, genericErrorTitle } from '../../modules/error'
import { GenericError } from '../../assets/ErrorIcons'
import { apiFetchVisualizations } from '../../api/visualization'
import { visTypeIcons } from '@dhis2/analytics'
import { matchVisualizationWithType } from './utils'
import { sGetUsername } from '../../reducers/user'

const StartScreen = ({ error, classes, username }) => {
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
            <div>
                <div style={styles.section}>
                    <h3 style={styles.title}>{i18n.t('Getting started')}</h3>
                    <ul style={styles.guide}>
                        <li style={styles.guideItem}>
                            {i18n.t(
                                'All dimensions that you can use to build visualizations are shown in the left sidebar'
                            )}
                        </li>
                        <li style={styles.guideItem}>
                            {i18n.t('Add dimensions to the layout above')}
                        </li>
                        <li style={styles.guideItem}>
                            {i18n.t('Click a dimension to add or remove items')}
                        </li>
                    </ul>
                </div>
                {mostViewedVisualizations.length > 0 && (
                    <div style={styles.section}>
                        <h3 style={styles.title}>
                            {i18n.t('Your most viewed charts and tables')}
                        </h3>
                        {mostViewedVisualizations.map(
                            (visualization, index) => (
                                <p
                                    key={index}
                                    className={classes.visualization}
                                    onClick={() =>
                                        history.push(`/${visualization.id}`)
                                    }
                                >
                                    <span className={classes.visIcon}>
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

    const getErrorContent = () =>
        error instanceof VisualizationError ? (
            <div style={styles.errorContainer}>
                <div style={styles.errorIcon}>{error.icon()}</div>
                <p style={styles.errorTitle}>{error.title}</p>
                <p style={styles.errorDescription}>{error.description}</p>
            </div>
        ) : (
            <div style={styles.errorContainer}>
                <div style={styles.errorIcon}>{GenericError()}</div>
                <p style={styles.errorTitle}>{genericErrorTitle}</p>
                <p style={styles.errorDescription}>{error.message || error}</p>
            </div>
        )

    return (
        <div style={styles.outer}>
            <div style={styles.inner}>{getContent()}</div>
        </div>
    )
}

StartScreen.propTypes = {
    classes: PropTypes.object,
    error: PropTypes.object,
    username: PropTypes.string,
}

const mapStateToProps = state => ({
    error: sGetLoadError(state),
    username: sGetUsername(state),
})

export default connect(mapStateToProps)(withStyles(styles)(StartScreen))
