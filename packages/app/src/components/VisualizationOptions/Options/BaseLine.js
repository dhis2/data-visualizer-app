import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'
import { Checkbox, Label } from '@dhis2/ui'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'
import BaseLineValue from './BaseLineValue'
import BaseLineLabel from './BaseLineLabel'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

export const BaseLine = ({ checked, onChange, disabled }) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={checked}
            label={i18n.t('Base line')}
            name="baseLine-toggle"
            onChange={({ checked }) => onChange(checked)}
            dense
            disabled={disabled}
            dataTest={'option-base-line-checkbox'}
        />
        {checked && !disabled ? (
            <div
                className={`${tabSectionOptionToggleable.className} ${tabSectionOptionComplexInline.className}`}
            >
                <div>
                    <Label>{i18n.t('Value')}</Label>
                    <BaseLineValue dataTest={'option-base-line-value'} />
                </div>
                <div>
                    <Label>{i18n.t('Title')}</Label>
                    <BaseLineLabel dataTest={'option-base-line-label'} />
                </div>
            </div>
        ) : null}
    </div>
)

BaseLine.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = state => ({
    checked: sGetUiOptions(state).baseLine,
})

const mapDispatchToProps = dispatch => ({
    onChange: checked => dispatch(acSetUiOptions({ baseLine: checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLine)
