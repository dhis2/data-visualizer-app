import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { SelectBaseOption } from './SelectBaseOption.js'

const DigitGroupSeparator = () => (
    <SelectBaseOption
        label={i18n.t('Digit group separator')}
        option={{
            name: 'digitGroupSeparator',
            items: [
                { value: 'NONE', label: i18n.t('None') },
                { value: 'SPACE', label: i18n.t('Space') },
                { value: 'COMMA', label: i18n.t('Comma') },
            ],
        }}
    />
)

export default DigitGroupSeparator
