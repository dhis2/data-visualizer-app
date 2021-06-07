import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const RowSubTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Row sub-totals')}
        option={{
            name: 'rowSubTotals',
        }}
    />
)

export default RowSubTotals
