import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption.js'

const SkipRounding = () => (
    <CheckboxBaseOption
        label={i18n.t('Skip rounding')}
        option={{
            name: 'skipRounding',
        }}
    />
)

export default SkipRounding
