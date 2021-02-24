import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, Help, InputField } from '@dhis2/ui'

import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

const ExtremeLines = ({
    isEnabled,
    onEnabledChange,
    currentValue,
    onValueChange,
}) => (
    <>
        <div className={tabSectionOption.className}>
            <div className={tabSectionOption.className}>
                <Checkbox
                    checked={isEnabled}
                    label={i18n.t('Extreme lines')}
                    onChange={({ checked }) => onEnabledChange(checked)}
                    dense
                />
                <Help>
                    {i18n.t(
                        'Calculated as a percent, usually 1%, of the total values along an axis'
                    )}
                </Help>
            </div>
            <div className={tabSectionOption.className}>
                <InputField
                    type="number"
                    label={i18n.t('Extreme line % detection')}
                    onChange={input => {
                        // FIXME: Replace with steps and min once ui supports it
                        const parsedValue = Number(input.value)
                        parsedValue >= 0.1
                            ? onValueChange(parsedValue)
                            : onValueChange(parsedValue ? 0 : null)
                    }}
                    value={currentValue?.toString() || ''}
                    placeholder={i18n.t('Value')}
                    inputWidth="96px"
                    dense
                />
            </div>
        </div>
    </>
)

ExtremeLines.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    onEnabledChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    currentValue: PropTypes.number,
}

export default ExtremeLines
