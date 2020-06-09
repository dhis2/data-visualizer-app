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

export const BaseLine = ({ enabled, onChange }) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={enabled}
            label={i18n.t('Base line')}
            name="baseLine-toggle"
            onChange={({ checked }) => onChange(checked)}
            dense
        />
        {enabled ? (
            <div
                className={`${tabSectionOptionToggleable.className} ${tabSectionOptionComplexInline.className}`}
            >
                <div>
                    <Label>{i18n.t('Value')}</Label>
                    <BaseLineValue />
                </div>
                <div>
                    <Label>{i18n.t('Title')}</Label>
                    <BaseLineLabel />
                </div>
            </div>
        ) : null}
    </div>
)

BaseLine.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    enabled: sGetUiOptions(state).baseLine,
})

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ baseLine: enabled })),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLine)
