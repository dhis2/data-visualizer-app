import i18n from '@dhis2/d2-i18n'
import { Label } from '@dhis2/ui'
import React from 'react'
import styles from '../styles/VisualizationOptions.module.css'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const CompletedOnly = () => (
    <div className={styles.tabSectionOption}>
        <Label>{i18n.t('Event data')}</Label>
        <CheckboxBaseOption
            label={i18n.t('Only include completed events')}
            option={{
                name: 'completedOnly',
            }}
        />
    </div>
)

export default CompletedOnly
