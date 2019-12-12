import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'
import { Label, Radio, RadioGroup } from '@dhis2/ui-core'

import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import Subtitle from './Subtitle'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'

class HideSubtitle extends Component {
    constructor(props) {
        super(props)

        this.defaultState = { value: 'NONE' }

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
                        ? i18n.t('Table subtitle')
                        : i18n.t('Chart subtitle')}
                </Label>
                <RadioGroup
                    name="hideSubtitle-selector"
                    onChange={this.onChange}
                    value={value}
                    dense
                >
                    {[
                        { id: 'NONE', label: i18n.t('None') },
                        { id: 'CUSTOM', label: i18n.t('Custom') },
                    ].map(({ id, label }) => (
                        <Radio key={id} label={label} value={id} dense />
                    ))}
                </RadioGroup>
                {value === 'CUSTOM' ? (
                    <div className={tabSectionOptionToggleable.className}>
                        <Subtitle inline />
                    </div>
                ) : null}
            </div>
        )
    }
}

HideSubtitle.propTypes = {
    value: PropTypes.string,
    visualizationType: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    value: sGetUiOptions(state).hideSubtitle ? 'NONE' : 'CUSTOM',
})

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ hideSubtitle: enabled })),
})

export default connect(mapStateToProps, mapDispatchToProps)(HideSubtitle)
