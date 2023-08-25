import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const RowTotals = ({ disabled }) => (
    <CheckboxBaseOption
        label={i18n.t('Row totals')}
        disabled={disabled}
        option={{
            name: 'rowTotals',
        }}
        dataTest="option-row-totals"
    />
)

RowTotals.propTypes = {
    disabled: PropTypes.bool,
}

export default RowTotals
