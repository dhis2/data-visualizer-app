import React from 'react'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import styles from './styles/BlankCanvas.style'
import { sGetLoadError } from '../../reducers/loader'
import PropTypes from 'prop-types'
import chartErrorImg from '../../assets/chart-error-graphic.png'

export const defaultCanvasMessage = i18n.t(
    'Create a new visualization by adding dimensions to the layout'
)

const getMessage = text => <p style={styles.title}>{text}</p>

export const BlankCanvas = ({ error }) => {
    const canvasContent = error ? (
        <div>
            <img src={chartErrorImg} alt={i18n.t('Chart error')} />
            {getMessage(error)}
        </div>
    ) : (
        getMessage(defaultCanvasMessage)
    )

    return (
        <div style={styles.outer}>
            <div style={styles.inner}>{canvasContent}</div>
        </div>
    )
}

BlankCanvas.propTypes = {
    error: PropTypes.object,
}

const mapStateToProps = state => ({
    error: sGetLoadError(state),
})

export default connect(mapStateToProps)(BlankCanvas)
