import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_ROW_SUB_TOTALS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const RowSubTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Row sub-totals')}
        option={{
            name: OPTION_ROW_SUB_TOTALS,
        }}
        dataTest="option-row-subtotals"
    />
)

export default RowSubTotals
