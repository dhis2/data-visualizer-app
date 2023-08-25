import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ColTotals = ({ disabled }) => (
    <CheckboxBaseOption
        label={i18n.t('Columns totals')}
        disabled={disabled}
        option={{
            name: 'colTotals',
        }}
        dataTest="option-col-totals"
    />
)

ColTotals.propTypes = {
    disabled: PropTypes.bool,
}

export default ColTotals
