import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ColSubTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Column sub-totals')}
        option={{
            name: 'colSubTotals',
        }}
        dataTest="option-col-subtotals"
    />
)

export default ColSubTotals
