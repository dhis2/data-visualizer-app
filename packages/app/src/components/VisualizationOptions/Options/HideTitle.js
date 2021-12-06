import { FONT_STYLE_VISUALIZATION_TITLE } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Label, Field, Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions } from '../../../reducers/ui'
import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle'
import Title from './Title'

const HIDE_TITLE_AUTO = 'AUTO'
const HIDE_TITLE_NONE = 'NONE'
const HIDE_TITLE_CUSTOM = 'CUSTOM'

class HideTitle extends Component {
    constructor(props) {
        super(props)

        this.defaultState = { value: HIDE_TITLE_AUTO }

        this.state = props.value ? { value: props.value } : this.defaultState
    }

    onGroupChange = ({ value }) => {
        this.setState({ value })
        this.props.onChange(
            value === HIDE_TITLE_NONE,
            value === HIDE_TITLE_AUTO
                ? undefined
                : this.props.title || undefined
        )
    }

    render() {
        const { value } = this.state

        return (
            <div
                className={tabSectionOption.className}
                data-test={'option-chart-title'}
            >
                <Label>{i18n.t('Chart title')}</Label>
                <Field name="hideTitle-selector" dense>
                    {[
                        {
                            id: HIDE_TITLE_AUTO,
                            label: i18n.t('Auto generated'),
                        },
                        { id: HIDE_TITLE_NONE, label: i18n.t('None') },
                        { id: HIDE_TITLE_CUSTOM, label: i18n.t('Custom') },
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
                {value === HIDE_TITLE_CUSTOM ? (
                    <div className={tabSectionOptionToggleable.className}>
                        <Title inline />
                    </div>
                ) : null}
                {value === HIDE_TITLE_AUTO || value === HIDE_TITLE_CUSTOM ? (
                    <div className={tabSectionOptionToggleable.className}>
                        <TextStyle
                            fontStyleKey={FONT_STYLE_VISUALIZATION_TITLE}
                            dataTest={'option-chart-title-text-style'}
                        />
                    </div>
                ) : null}
            </div>
        )
    }
}

HideTitle.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

const hideTitleSelector = createSelector([sGetUiOptions], (uiOptions) =>
    uiOptions.hideTitle
        ? HIDE_TITLE_NONE
        : uiOptions.title === undefined
        ? HIDE_TITLE_AUTO
        : HIDE_TITLE_CUSTOM
)

const mapStateToProps = (state) => ({
    value: hideTitleSelector(state),
    title: sGetUiOptions(state).title,
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (hideTitle, title) =>
        dispatch(acSetUiOptions({ hideTitle, title })),
})

export default connect(mapStateToProps, mapDispatchToProps)(HideTitle)
