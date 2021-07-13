import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const FixedRowHeaders = () => (
    <CheckboxBaseOption
        label={i18n.t('Fixed row headers to left of table')}
        option={{
            name: 'fixedRowHeaders',
        }}
    />
)

export default FixedRowHeaders
