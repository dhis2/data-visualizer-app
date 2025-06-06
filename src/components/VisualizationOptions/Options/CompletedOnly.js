import i18n from '@dhis2/d2-i18n'
import { Label } from '@dhis2/ui'
import React from 'react'
import { OPTION_COMPLETED_ONLY } from '../../../modules/options.js'
import styles from '../styles/VisualizationOptions.module.css'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const CompletedOnly = () => (
    <div className={styles.tabSectionOption}>
        <Label>{i18n.t('Event data')}</Label>
        <CheckboxBaseOption
            label={i18n.t('Only include completed events')}
            option={{
                name: OPTION_COMPLETED_ONLY,
            }}
        />
    </div>
)

export default CompletedOnly
