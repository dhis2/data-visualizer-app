import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const CumulativeValues = () => (
    <CheckboxBaseOption
        label={i18n.t('Cumulative values')}
        option={{
            name: 'cumulativeValues',
        }}
    />
)

export default CumulativeValues
