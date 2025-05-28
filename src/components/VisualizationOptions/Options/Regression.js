import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_REGRESSION } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const Regression = () => (
    <CheckboxBaseOption
        label={i18n.t('Include regression')}
        option={{
            name: OPTION_REGRESSION,
        }}
    />
)

export default Regression
