import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_SHOW_LEGEND_KEY } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ShowLegendKey = ({ disabled }) => (
    <CheckboxBaseOption
        label={i18n.t('Show legend key')}
        option={{
            id: OPTION_SHOW_LEGEND_KEY,
        }}
        dataTest={'option-legend-key'}
        disabled={disabled}
    />
)

ShowLegendKey.propTypes = {
    disabled: PropTypes.bool,
}

export default ShowLegendKey
