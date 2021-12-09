import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ColTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Columns totals')}
        option={{
            name: 'colTotals',
        }}
    />
)

export default ColTotals
