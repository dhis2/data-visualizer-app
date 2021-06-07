import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const HideEmptyRows = () => (
    <CheckboxBaseOption
        label={i18n.t('Hide empty rows')}
        option={{
            name: 'hideEmptyRows',
        }}
    />
)

export default HideEmptyRows
