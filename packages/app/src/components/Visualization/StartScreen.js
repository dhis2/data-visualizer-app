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
import { VisualizationError } from '../../modules/error'
import { GenericError } from '../../assets/ErrorIcons'

const StartScreen = ({ error, classes }) => {
    const [mostViewedVisualizations, setMostViewedVisualizations] = useState([])

    const engine = useDataEngine()

    useEffect(() => {
        async function fetchData(engine) {
            const result = await apiFetchMostViewedVisualizations(engine, 6)
            setMostViewedVisualizations(result.visualization)
        }
        fetchData(engine)
    }, [])

    const getContent = () =>
        error ? (
            getErrorContent()
        ) : (
            <div>
                <div style={styles.section}>
                    <h3 style={styles.title}>Getting started</h3>
                    <ul style={styles.guide}>
                        <li style={styles.guideItem}>
                            All dimensions that you can use to build
                            visualizations are shown in the left sidebar
                        </li>
                        <li style={styles.guideItem}>
                            Add dimensions to the layout above
                        </li>
                        <li style={styles.guideItem}>
                            Double click a dimension to add or remove items
                        </li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.title}>Most viewed charts and tables</h3>
                    {mostViewedVisualizations.map((visualization, index) => (
                        <p
                            key={index}
                            className={classes.visualization}
                            onClick={() => history.push(`/${visualization.id}`)}
                        >
                            {visualization.name}
                        </p>
                    ))}
                </div>
            </div>
        )

    const getErrorContent = () => {
        return error instanceof VisualizationError ? (
            <div style={styles.errorContainer}>
                <div style={styles.errorIcon}>{error.icon()}</div>
                <p style={styles.errorTitle}>{error.title}</p>
                <p style={styles.errorDescription}>{error.description}</p>
            </div>
        ) : (
            <div style={styles.errorContainer}>
                <div style={styles.errorIcon}>{GenericError()}</div>
                <p style={styles.errorTitle}>
                    {i18n.t('Something went wrong')}
                </p>
                <p style={styles.errorDescription}>{error.message || error}</p>
            </div>
        )
    }

    return (
        <div style={styles.outer}>
            <div style={styles.inner}>{getContent()}</div>
        </div>
    )
}

StartScreen.propTypes = {
    classes: PropTypes.object,
    error: PropTypes.object,
}

const mapStateToProps = state => ({
    error: sGetLoadError(state),
})

export default connect(mapStateToProps)(withStyles(styles)(StartScreen))
