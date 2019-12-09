import React from 'react'
import i18n from '@dhis2/d2-i18n'
import CheckboxBaseOption from './CheckboxBaseOption'

const NoSpaceBetweenColumns = () => (
    <CheckboxBaseOption
        option={{
            name: 'noSpaceBetweenColumns',
            label: i18n.t('No space between columns/bars'),
        }}
    />
)

export default NoSpaceBetweenColumns
