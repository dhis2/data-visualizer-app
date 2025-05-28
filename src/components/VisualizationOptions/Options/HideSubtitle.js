import {
    VIS_TYPE_PIVOT_TABLE,
    FONT_STYLE_VISUALIZATION_SUBTITLE,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Label, Radio, Field } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { acSetUiOptions } from '../../../actions/ui.js'
import {
    OPTION_HIDE_SUBTITLE,
    OPTION_SUBTITLE,
} from '../../../modules/options.js'
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui.js'
import styles from '../styles/VisualizationOptions.module.css'
import Subtitle from './Subtitle.js'
import TextStyle from './TextStyle.js'

const HIDE_SUBTITLE_AUTO = 'AUTO'
const HIDE_SUBTITLE_NONE = 'NONE'
const HIDE_SUBTITLE_CUSTOM = 'CUSTOM'

class HideSubtitle extends Component {
    constructor(props) {
        super(props)

        this.defaultState = { value: HIDE_SUBTITLE_AUTO }

        this.state = props.value ? { value: props.value } : this.defaultState
    }

    onGroupChange = ({ value }) => {
        this.setState({ value })
        this.props.onChange(
            value === HIDE_SUBTITLE_NONE,
            value === HIDE_SUBTITLE_AUTO
                ? undefined
                : this.props.subtitle || undefined
        )
    }

    render() {
        const { value } = this.state
        const { visualizationType } = this.props

        return (
            <div className={styles.tabSectionOption}>
                <Label>
                    {visualizationType === VIS_TYPE_PIVOT_TABLE
                        ? i18n.t('Table subtitle')
                        : i18n.t('Chart subtitle')}
                </Label>
                <Field
                    name="hideSubtitle-selector"
                    dense
                    dataTest={'option-chart-subtitle-type-radios'}
                >
                    {[
                        {
                            id: HIDE_SUBTITLE_AUTO,
                            label: i18n.t('Auto generated'),
                        },
                        { id: HIDE_SUBTITLE_NONE, label: i18n.t('None') },
                        { id: HIDE_SUBTITLE_CUSTOM, label: i18n.t('Custom') },
                    ].map(({ id, label }) => (
                        <Radio
                            key={id}
                            label={label}
                            value={id}
                            dense
                            onChange={this.onGroupChange}
                            checked={value === id}
                        />
                    ))}
                </Field>
                {value === HIDE_SUBTITLE_CUSTOM ? (
                    <div className={styles.tabSectionOptionToggleable}>
                        <Subtitle
                            inline
                            dataTest={'option-chart-subtitle-text'}
                        />
                    </div>
                ) : null}
                {value === HIDE_SUBTITLE_AUTO ||
                value === HIDE_SUBTITLE_CUSTOM ? (
                    <div className={styles.tabSectionOptionToggleable}>
                        <TextStyle
                            fontStyleKey={FONT_STYLE_VISUALIZATION_SUBTITLE}
                            dataTest={'option-chart-subtitle-text-style'}
                        />
                    </div>
                ) : null}
            </div>
        )
    }
}

HideSubtitle.propTypes = {
    subtitle: PropTypes.string,
    value: PropTypes.string,
    visualizationType: PropTypes.string,
    onChange: PropTypes.func,
}

const hideSubtitleSelector = createSelector([sGetUiOptions], (uiOptions) => {
    if (uiOptions[OPTION_HIDE_SUBTITLE]) {
        return HIDE_SUBTITLE_NONE
    }

    return uiOptions[OPTION_SUBTITLE] === undefined
        ? HIDE_SUBTITLE_AUTO
        : HIDE_SUBTITLE_CUSTOM
})

const mapStateToProps = (state) => ({
    visualizationType: sGetUiType(state),
    value: hideSubtitleSelector(state),
    subtitle: sGetUiOptions(state)[OPTION_SUBTITLE],
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (hideSubtitle, subtitle) =>
        dispatch(
            acSetUiOptions({
                [OPTION_HIDE_SUBTITLE]: hideSubtitle,
                [OPTION_SUBTITLE]: subtitle,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(HideSubtitle)
