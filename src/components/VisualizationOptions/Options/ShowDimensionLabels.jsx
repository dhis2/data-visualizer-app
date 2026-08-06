import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_SHOW_DIMENSION_LABELS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ShowDimensionLabels = () => (
    <CheckboxBaseOption
        label={i18n.t('Dimension labels')}
        option={{
            name: OPTION_SHOW_DIMENSION_LABELS,
        }}
    />
)

export default ShowDimensionLabels
