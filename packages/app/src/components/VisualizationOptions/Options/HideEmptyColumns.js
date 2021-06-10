import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const HideEmptyColumns = () => (
    <CheckboxBaseOption
        label={i18n.t('Hide empty columns')}
        option={{
            name: 'hideEmptyColumns',
        }}
    />
)

export default HideEmptyColumns
