import React from 'react'

import i18n from '@dhis2/d2-i18n'

import SelectBaseOption from './SelectBaseOption'

const NumberType = () => (
    <SelectBaseOption
        label={i18n.t('Number type')}
        helpText={i18n.t('Display the value of percentages of the total')}
        option={{
            name: 'numberType',
            items: [
                { id: 'VALUE', label: i18n.t('Value') },
                {
                    id: 'ROW_PERCENTAGE',
                    label: i18n.t('Percentage of row'),
                },
                {
                    id: 'COLUMN_PERCENTAGE',
                    label: i18n.t('Percentage of column'),
                },
            ],
        }}
    />
)

export default NumberType
