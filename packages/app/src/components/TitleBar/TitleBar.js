import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
    STATE_UNSAVED,
    STATE_SAVED,
    STATE_DIRTY,
    getVisualizationState,
} from '../../modules/visualization.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetVisualization } from '../../reducers/visualization.js'
import styles from './styles/TitleBar.style.js'

export const getTitleUnsaved = () => i18n.t('Unsaved visualization')
export const getTitleDirty = () => i18n.t('Edited')

const defaultTitleStyle = {
    ...styles.cell,
    ...styles.title,
}

const getTitleText = (titleState, visualization) => {
    switch (titleState) {
        case STATE_UNSAVED:
            return getTitleUnsaved()
        case STATE_SAVED:
        case STATE_DIRTY:
            return visualization.displayName || visualization.name
        default:
            return ''
    }
}

const getCustomTitleStyle = (titleState) => {
    switch (titleState) {
        case STATE_UNSAVED:
            return styles.titleUnsaved
        default:
            return null
    }
}

const getSuffix = (titleState) => {
    switch (titleState) {
        case STATE_DIRTY:
            return (
                <div
                    style={{
                        ...styles.suffix,
                        ...styles.titleDirty,
                    }}
                    data-test="AO-title-dirty"
                >{`- ${getTitleDirty()}`}</div>
            )
        default:
            return ''
    }
}

export const UnconnectedTitleBar = ({ titleState, titleText }) => {
    const titleStyle = {
        ...defaultTitleStyle,
        ...getCustomTitleStyle(titleState),
    }

    return titleText ? (
        <div data-test="AO-title" style={styles.titleBar}>
            <div style={titleStyle}>
                {titleText}
                {getSuffix(titleState)}
            </div>
        </div>
    ) : null
}

UnconnectedTitleBar.propTypes = {
    titleState: PropTypes.string,
    titleText: PropTypes.string,
}

const mapStateToProps = (state) => ({
    visualization: sGetVisualization(state),
    current: sGetCurrent(state),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { visualization, current } = stateProps
    const titleState = getVisualizationState(visualization, current)
    return {
        ...dispatchProps,
        ...ownProps,
        titleState: titleState,
        titleText: getTitleText(titleState, visualization),
    }
}

export const TitleBar = connect(
    mapStateToProps,
    null,
    mergeProps
)(UnconnectedTitleBar)
