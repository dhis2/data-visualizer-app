import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import i18n from '@dhis2/d2-i18n'
import { Label, Radio, RadioGroup } from '@dhis2/ui-core'

import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import Title from './Title'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'

class HideTitle extends Component {
    constructor(props) {
        super(props)

        this.defaultState = { value: 'AUTO' }

        this.state = props.value ? { value: props.value } : this.defaultState
    }

    onChange = ({ value }) => {
        this.setState({ value })
        this.props.onChange(value === 'NONE')
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
                <RadioGroup
                    name="hideTitle-selector"
                    onChange={this.onChange}
                    value={value}
                    dense
                >
                    {[
                        { id: 'AUTO', label: i18n.t('Auto generated') },
                        { id: 'NONE', label: i18n.t('None') },
                        { id: 'CUSTOM', label: i18n.t('Custom') },
                    ].map(({ id, label }) => (
                        <Radio key={id} label={label} value={id} dense />
                    ))}
                </RadioGroup>
                {value === 'CUSTOM' ? (
                    <div className={tabSectionOptionToggleable.className}>
                        <Title inline />
                    </div>
                ) : null}
            </div>
        )
    }
}

HideTitle.propTypes = {
    value: PropTypes.string,
    visualizationType: PropTypes.string,
    onChange: PropTypes.func,
}

const hideTitleSelector = createSelector([sGetUiOptions], uiOptions =>
    uiOptions.hideTitle
        ? 'NONE'
        : uiOptions.title === undefined
        ? 'AUTO'
        : 'CUSTOM'
)

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    value: hideTitleSelector(state),
})

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ hideTitle: enabled })),
})

export default connect(mapStateToProps, mapDispatchToProps)(HideTitle)
