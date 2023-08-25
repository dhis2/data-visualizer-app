import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const RowSubTotals = ({ disabled }) => (
    <CheckboxBaseOption
        label={i18n.t('Row sub-totals')}
        disabled={disabled}
        option={{
            name: 'rowSubTotals',
        }}
        dataTest="option-row-subtotals"
    />
)

RowSubTotals.propTypes = {
    disabled: PropTypes.bool,
}

export default RowSubTotals
