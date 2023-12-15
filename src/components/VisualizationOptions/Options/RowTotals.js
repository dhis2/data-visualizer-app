import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const RowTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Row totals')}
        option={{
            name: 'rowTotals',
        }}
        dataTest="option-row-totals"
    />
)

export default RowTotals
