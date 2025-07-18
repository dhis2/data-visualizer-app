import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { options, OPTION_REGRESSION_TYPE } from '../../../modules/options.js'
import { SelectBaseOption } from './SelectBaseOption.jsx'

const optionName = OPTION_REGRESSION_TYPE
const defaultValue = options[optionName].defaultValue

const RegressionType = ({ disabled }) => (
    <SelectBaseOption
        toggleable={true}
        label={i18n.t('Trend line')}
        disabled={disabled}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { value: 'LINEAR', label: i18n.t('Linear') },
                { value: 'POLYNOMIAL', label: i18n.t('Polynomial') },
                { value: 'LOESS', label: i18n.t('Loess') },
            ],
        }}
        dataTest={'option-trend-line'}
    />
)

RegressionType.propTypes = {
    disabled: PropTypes.bool,
}

export default RegressionType
