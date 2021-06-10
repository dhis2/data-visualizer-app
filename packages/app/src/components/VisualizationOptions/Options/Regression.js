import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const Regression = () => (
    <CheckboxBaseOption
        label={i18n.t('Include regression')}
        option={{
            name: 'regression',
        }}
    />
)

export default Regression
