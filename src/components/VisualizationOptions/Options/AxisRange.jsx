import i18n from '@dhis2/d2-i18n'
import { Label, Help } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/AxisRange.module.css'
import optionsStyles from '../styles/VisualizationOptions.module.css'
import AxisMaxValue from './AxisMaxValue.jsx'
import AxisMinValue from './AxisMinValue.jsx'

const AxisRange = ({ disabled, axisId }) => (
    <div className={optionsStyles.tabSectionOption}>
        <Label className={styles.label}>{i18n.t('Axis range')}</Label>
        <div className={optionsStyles.tabSectionOptionComplexInline}>
            <AxisMinValue disabled={disabled} axisId={axisId} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {'\u00A0\u2013\u00A0'}
            </div>
            <AxisMaxValue disabled={disabled} axisId={axisId} />
        </div>
        {!disabled ? (
            <Help>
                {i18n.t('Values outside of the range will not be displayed')}
            </Help>
        ) : null}
    </div>
)

AxisRange.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisRange
