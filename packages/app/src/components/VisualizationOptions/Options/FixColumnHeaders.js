import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const FixColumnHeaders = () => (
    <CheckboxBaseOption
        label={i18n.t('Fix column headers to top of table')}
        option={{
            name: 'fixColumnHeaders',
        }}
    />
)

export default FixColumnHeaders
