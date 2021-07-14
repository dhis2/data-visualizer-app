import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const FixedColumnHeaders = () => (
    <CheckboxBaseOption
        label={i18n.t('Fix column headers to top of table')}
        option={{
            name: 'fixedColumnHeaders',
        }}
    />
)

export default FixedColumnHeaders
