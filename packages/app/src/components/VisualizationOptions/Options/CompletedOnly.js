import React from 'react'

import i18n from '@dhis2/d2-i18n'
import { Label } from '@dhis2/ui-core'

import CheckboxBaseOption from './CheckboxBaseOption'

const CompletedOnly = () => (
    <div>
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
