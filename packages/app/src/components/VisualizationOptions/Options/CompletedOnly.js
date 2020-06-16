import React from 'react'

import i18n from '@dhis2/d2-i18n'
import { Label } from '@dhis2/ui'

import CheckboxBaseOption from './CheckboxBaseOption'

import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

const CompletedOnly = () => (
    <div className={tabSectionOption.className}>
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
