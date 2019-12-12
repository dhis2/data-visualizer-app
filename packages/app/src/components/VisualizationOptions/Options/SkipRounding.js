import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const SkipRounding = () => (
    <CheckboxBaseOption
        label={i18n.t('Skip rounding')}
        option={{
            name: 'skipRounding',
        }}
    />
)

export default SkipRounding
