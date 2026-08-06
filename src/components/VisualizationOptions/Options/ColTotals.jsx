import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_COL_TOTALS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ColTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Columns totals')}
        option={{
            name: OPTION_COL_TOTALS,
        }}
        dataTest="option-col-totals"
    />
)

export default ColTotals
