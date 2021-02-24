import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field, Radio, InputField, Help } from '@dhis2/ui'

import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

const OutlierDetectionMethod = ({
    methods,
    currentMethodId,
    onMethodChange,
    currentThreshold,
    onThresholdChange,
}) => (
    <>
        <div className={tabSectionOption.className}>
            <Field dense>
                {methods.map(({ id, label }) => (
                    <Radio
                        key={id}
                        label={label}
                        value={id}
                        checked={currentMethodId === id}
                        onChange={({ value }) => {
                            onMethodChange(value)
                        }}
                        dense
                    />
                ))}
            </Field>
            <Help>{i18n.t('TODO: Help text goes here')}</Help>
        </div>
        <InputField
            type="number"
            label={i18n.t('Threshold factor')}
            onChange={({ value }) =>
                // FIXME: Replace with steps and min once ui supports it
                onThresholdChange(Number(value) >= 0.5 ? Number(value) : null)
            }
            value={currentThreshold?.toString() || ''}
            helpText={i18n.t(
                'A high value is more sensitive so fewer data items will be identified as outliers'
            )}
            placeholder={i18n.t('Value')}
            inputWidth="96px"
            dense
        />
    </>
)

OutlierDetectionMethod.propTypes = {
    methods: PropTypes.array.isRequired,
    onMethodChange: PropTypes.func.isRequired,
    onThresholdChange: PropTypes.func.isRequired,
    currentMethodId: PropTypes.string,
    currentThreshold: PropTypes.number,
}

export default OutlierDetectionMethod
