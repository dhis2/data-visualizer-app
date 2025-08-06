import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_SKIP_ROUNDING } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const SkipRounding = () => (
    <CheckboxBaseOption
        label={i18n.t('Skip rounding')}
        option={{
            name: OPTION_SKIP_ROUNDING,
        }}
    />
)

export default SkipRounding
