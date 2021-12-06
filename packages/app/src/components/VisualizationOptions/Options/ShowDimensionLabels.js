import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption.js'

const ShowDimensionLabels = () => (
    <CheckboxBaseOption
        label={i18n.t('Dimension labels')}
        option={{
            name: 'showDimensionLabels',
        }}
    />
)

export default ShowDimensionLabels
