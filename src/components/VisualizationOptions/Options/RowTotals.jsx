import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_ROW_TOTALS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const RowTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Row totals')}
        option={{
            name: OPTION_ROW_TOTALS,
        }}
        dataTest="option-row-totals"
    />
)

export default RowTotals
