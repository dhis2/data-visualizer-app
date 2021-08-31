import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const FixRowHeaders = () => (
    <CheckboxBaseOption
        label={i18n.t('Fix row headers to left of table')}
        option={{
            name: 'fixRowHeaders',
        }}
    />
)

export default FixRowHeaders
