import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const Cumulative = () => (
    <CheckboxBaseOption
        label={i18n.t('Include cumulative')}
        option={{
            name: 'cumulative',
        }}
    />
)

export default Cumulative
