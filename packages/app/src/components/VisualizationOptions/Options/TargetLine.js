import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'
import { Checkbox, Label } from '@dhis2/ui'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'
import TargetLineValue from './TargetLineValue'
import TargetLineLabel from './TargetLineLabel'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

export const TargetLine = ({ checked, onChange, disabled }) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={checked}
            label={i18n.t('Target line')}
            onChange={({ checked }) => onChange(checked)}
            dense
            disabled={disabled}
            dataTest={'option-target-line-checkbox'}
        />
        {checked && !disabled ? (
            <div
                className={`${tabSectionOptionToggleable.className} ${tabSectionOptionComplexInline.className}`}
            >
                <div>
                    <Label>{i18n.t('Value')}</Label>
                    <TargetLineValue dataTest={'option-target-line-value'} />
                </div>
                <div>
                    <Label>{i18n.t('Title')}</Label>
                    <TargetLineLabel dataTest={'option-target-line-label'} />
                </div>
            </div>
        ) : null}
    </div>
)

TargetLine.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = state => ({
    checked: sGetUiOptions(state).targetLine,
})

const mapDispatchToProps = dispatch => ({
    onChange: checked => dispatch(acSetUiOptions({ targetLine: checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetLine)
