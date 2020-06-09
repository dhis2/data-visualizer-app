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

export const TargetLine = ({ enabled, onChange }) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={enabled}
            label={i18n.t('Target line')}
            onChange={({ checked }) => onChange(checked)}
            dense
        />
        {enabled ? (
            <div
                className={`${tabSectionOptionToggleable.className} ${tabSectionOptionComplexInline.className}`}
            >
                <div>
                    <Label>{i18n.t('Value')}</Label>
                    <TargetLineValue />
                </div>
                <div>
                    <Label>{i18n.t('Title')}</Label>
                    <TargetLineLabel />
                </div>
            </div>
        ) : null}
    </div>
)

TargetLine.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    enabled: sGetUiOptions(state).targetLine,
})

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ targetLine: enabled })),
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetLine)
