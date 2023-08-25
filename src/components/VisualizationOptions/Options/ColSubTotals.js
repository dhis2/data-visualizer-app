import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ColSubTotals = ({ disabled }) => (
    <CheckboxBaseOption
        label={i18n.t('Column sub-totals')}
        disabled={disabled}
        option={{
            name: 'colSubTotals',
        }}
        dataTest="option-col-subtotals"
    />
)

ColSubTotals.propTypes = {
    disabled: PropTypes.bool,
}

export default ColSubTotals
