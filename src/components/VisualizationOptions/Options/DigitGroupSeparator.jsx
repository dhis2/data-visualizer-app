import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_DIGIT_GROUP_SEPARATOR } from '../../../modules/options.js'
import { SelectBaseOption } from './SelectBaseOption.jsx'

const DigitGroupSeparator = () => (
    <SelectBaseOption
        label={i18n.t('Digit group separator')}
        option={{
            name: OPTION_DIGIT_GROUP_SEPARATOR,
            items: [
                { value: 'NONE', label: i18n.t('None') },
                { value: 'SPACE', label: i18n.t('Space') },
                { value: 'COMMA', label: i18n.t('Comma') },
            ],
        }}
    />
)

export default DigitGroupSeparator
