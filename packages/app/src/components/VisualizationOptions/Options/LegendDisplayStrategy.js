import React from 'react'

import i18n from '@dhis2/d2-i18n'

import RadioBaseOption from './RadioBaseOption'

const LegendDisplayStrategy = () => (
    <RadioBaseOption
        option={{
            name: 'legendDisplayStrategy',
            items: [
                {
                    id: 'FIXED',
                    label: i18n.t('Apply a legend to entire table'),
                },
                {
                    id: 'BY_DATA_ITEM',
                    label: i18n.t('Assign a unique legend to data elements'),
                },
            ],
        }}
    />
)

export default LegendDisplayStrategy
