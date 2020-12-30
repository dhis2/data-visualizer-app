import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, Label } from '@dhis2/ui'

import { sGetUiOption } from '../../../reducers/ui'
import { acSetUiOption } from '../../../actions/ui'
import BaseLineValue from './BaseLineValue'
import BaseLineLabel from './BaseLineLabel'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'
import { OPTION_BASE_LINE_TITLE } from '../../../modules/options'

const axisId = 'RANGE_0'

export const BaseLine = ({ checked, onToggle, disabled }) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={checked}
            label={i18n.t('Base line')}
            name="baseLine-toggle"
            onChange={({ checked }) => onToggle(checked)}
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
                    <BaseLineValue
                        dataTest={'option-base-line-value'}
                        axisId={axisId}
                    />
                </div>
                <div>
                    <Label>{i18n.t('Title')}</Label>
                    <BaseLineLabel
                        dataTest={'option-base-line-label'}
                        axisId={axisId}
                    />
                </div>
            </div>
        ) : null}
    </div>
)

BaseLine.propTypes = {
    checked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = state => ({
    checked:
        sGetUiOption(state, { axisId, id: OPTION_BASE_LINE_TITLE }) !==
        undefined,
})

const mapDispatchToProps = dispatch => ({
    onToggle: checked =>
        dispatch(
            acSetUiOption({
                optionId: OPTION_BASE_LINE_TITLE,
                axisId,
                value: checked ? '' : undefined,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLine)
