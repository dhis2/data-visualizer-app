import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const CumulativeValues = ({ forPT }) => (
    <CheckboxBaseOption
        label={i18n.t('Cumulative values')}
        helperText={
            forPT ? i18n.t('Accumulate values horizontally TODO') : null
        }
        option={{
            name: 'cumulativeValues',
        }}
        dataTest="option-cumulative-values"
    />
)

CumulativeValues.propTypes = {
    forPT: PropTypes.bool,
}

export default CumulativeValues
