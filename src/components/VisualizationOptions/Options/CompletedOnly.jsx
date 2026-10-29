import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_COMPLETED_ONLY } from '../../../modules/options.js'
import styles from '../styles/VisualizationOptions.module.css'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'
import { OptionLabel } from './OptionLabel.jsx'

const CompletedOnly = () => (
    <div className={styles.tabSectionOption}>
        <OptionLabel>{i18n.t('Event data')}</OptionLabel>
        <CheckboxBaseOption
            label={i18n.t('Only include completed events')}
            option={{
                name: OPTION_COMPLETED_ONLY,
            }}
        />
    </div>
)

export default CompletedOnly
