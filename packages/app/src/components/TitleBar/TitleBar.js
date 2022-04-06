import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import InterpretationIcon from '../../assets/InterpretationIcon'
import formatDate from '../../modules/formatDate'
import {
    STATE_UNSAVED,
    STATE_SAVED,
    STATE_DIRTY,
    getVisualizationState,
} from '../../modules/visualization'
import { sGetCurrent } from '../../reducers/current'
import { sGetUiLocale } from '../../reducers/settings'
import { sGetUiInterpretation } from '../../reducers/ui'
import { sGetVisualization } from '../../reducers/visualization'
import styles from './styles/TitleBar.style'

export const getTitleUnsaved = () => i18n.t('Unsaved visualization')
export const getTitleDirty = () => i18n.t('Edited')

const defaultTitleStyle = {
    ...styles.cell,
    ...styles.title,
}

const defaultInterpretationStyle = {
    ...styles.cell,
    ...styles.interpretation,
}

const getTitleText = (titleState, visualization) => {
    switch (titleState) {
        case STATE_UNSAVED:
            return getTitleUnsaved()
        case STATE_SAVED:
        case STATE_DIRTY:
            return visualization.displayName
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

export const TitleBar = ({ titleState, titleText, interpretationDate }) => {
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
            {interpretationDate && (
                <div style={defaultInterpretationStyle}>
                    <div style={styles.interpretationIcon}>
                        <InterpretationIcon />
                    </div>
                    <div>
                        {i18n.t(
                            'Viewing interpretation from {{interpretationDate}}',
                            {
                                interpretationDate,
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    ) : null
}

TitleBar.propTypes = {
    interpretationDate: PropTypes.string,
    titleState: PropTypes.string,
    titleText: PropTypes.string,
}

const mapStateToProps = (state) => ({
    visualization: sGetVisualization(state),
    current: sGetCurrent(state),
    interpretation: sGetUiInterpretation(state),
    uiLocale: sGetUiLocale(state),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { visualization, current, interpretation, uiLocale } = stateProps
    const titleState = getVisualizationState(visualization, current)
    return {
        ...dispatchProps,
        ...ownProps,
        titleState: titleState,
        titleText: getTitleText(titleState, visualization),
        interpretationDate:
            interpretation && interpretation.created
                ? formatDate(interpretation.created, uiLocale)
                : null,
    }
}

export default connect(mapStateToProps, null, mergeProps)(TitleBar)
