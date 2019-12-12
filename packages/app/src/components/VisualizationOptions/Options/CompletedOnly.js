import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const CompletedOnly = () => (
    <CheckboxBaseOption
        label={i18n.t('Include only completed events')}
        option={{
            name: 'completedOnly',
        }}
    />
)

export default CompletedOnly
