import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_PERCENT_STACKED_VALUES } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const PercentStackedValues = () => (
    <CheckboxBaseOption
        label={i18n.t('Stacked values add up to 100%')}
        option={{
            name: OPTION_PERCENT_STACKED_VALUES,
        }}
    />
)

export default PercentStackedValues
