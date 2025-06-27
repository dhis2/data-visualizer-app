import i18n from '@dhis2/d2-i18n'
import { Checkbox, Help, InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/VisualizationOptions.module.css'

const ExtremeLines = ({
    isEnabled,
    onEnabledChange,
    currentValue,
    onValueChange,
}) => (
    <div className={styles.tabSectionOption}>
        <div className={styles.tabSectionOption}>
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
        {isEnabled && (
            <div className={styles.tabSectionToggleableSubsection}>
                <div className={styles.tabSectionOption}>
                    <InputField
                        type="number"
                        label={i18n.t('Extreme line % detection')}
                        min="0.1"
                        step="0.1"
                        onChange={(input) => onValueChange(Number(input.value))}
                        value={currentValue?.toString() || ''}
                        placeholder={i18n.t('Number')}
                        inputWidth="96px"
                        dense
                    />
                </div>
            </div>
        )}
    </div>
)

ExtremeLines.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    onEnabledChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    currentValue: PropTypes.number,
}

export default ExtremeLines
