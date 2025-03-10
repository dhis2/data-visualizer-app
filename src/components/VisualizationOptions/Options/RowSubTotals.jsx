import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const RowSubTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Row sub-totals')}
        option={{
            name: 'rowSubTotals',
        }}
        dataTest="option-row-subtotals"
    />
)

export default RowSubTotals
