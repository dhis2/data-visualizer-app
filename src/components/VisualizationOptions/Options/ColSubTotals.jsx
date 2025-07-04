import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_COL_SUB_TOTALS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ColSubTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Column sub-totals')}
        option={{
            name: OPTION_COL_SUB_TOTALS,
        }}
        dataTest="option-col-subtotals"
    />
)

export default ColSubTotals
