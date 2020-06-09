import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import i18n from '@dhis2/d2-i18n'
import { Label, Field, Radio } from '@dhis2/ui'

import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import Title from './Title'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'

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
        const { visualizationType } = this.props

        return (
            <div className={tabSectionOption.className}>
                <Label>
                    {visualizationType === VIS_TYPE_PIVOT_TABLE
                        ? i18n.t('Table title')
                        : i18n.t('Chart title')}
                </Label>
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
            </div>
        )
    }
}

HideTitle.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    visualizationType: PropTypes.string,
    onChange: PropTypes.func,
}

const hideTitleSelector = createSelector([sGetUiOptions], uiOptions =>
    uiOptions.hideTitle
        ? HIDE_TITLE_NONE
        : uiOptions.title === undefined
        ? HIDE_TITLE_AUTO
        : HIDE_TITLE_CUSTOM
)

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    value: hideTitleSelector(state),
    title: sGetUiOptions(state).title,
})

const mapDispatchToProps = dispatch => ({
    onChange: (hideTitle, title) =>
        dispatch(acSetUiOptions({ hideTitle, title })),
})

export default connect(mapStateToProps, mapDispatchToProps)(HideTitle)
