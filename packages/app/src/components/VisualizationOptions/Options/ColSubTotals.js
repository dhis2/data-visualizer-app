import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ColSubTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Column sub-totals')}
        option={{
            name: 'colSubTotals',
        }}
    />
)

export default ColSubTotals
