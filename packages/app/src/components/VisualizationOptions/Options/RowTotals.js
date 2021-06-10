import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const RowTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Row totals')}
        option={{
            name: 'rowTotals',
        }}
    />
)

export default RowTotals
