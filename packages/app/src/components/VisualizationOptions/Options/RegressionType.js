import React from 'react'

import i18n from '@dhis2/d2-i18n'

import SelectBaseOption from './SelectBaseOption'
import { options } from '../../../modules/options'

const optionName = 'regressionType'
const defaultValue = options[optionName].defaultValue

const RegressionType = () => (
    <SelectBaseOption
        toggleable={true}
        label={i18n.t('Trend line')}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { value: 'LINEAR', label: i18n.t('Linear') },
                { value: 'POLYNOMIAL', label: i18n.t('Polynomial') },
                { value: 'LOESS', label: i18n.t('Loess') },
            ],
        }}
    />
)

export default RegressionType
