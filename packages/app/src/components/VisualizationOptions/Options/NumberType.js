import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { SelectBaseOption } from './SelectBaseOption.js'

const NumberType = () => (
    <SelectBaseOption
        label={i18n.t('Number type')}
        helpText={i18n.t('Display the value of percentages of the total')}
        option={{
            name: 'numberType',
            items: [
                { value: 'VALUE', label: i18n.t('Value') },
                {
                    value: 'ROW_PERCENTAGE',
                    label: i18n.t('Percentage of row'),
                },
                {
                    value: 'COLUMN_PERCENTAGE',
                    label: i18n.t('Percentage of column'),
                },
            ],
        }}
    />
)

export default NumberType
