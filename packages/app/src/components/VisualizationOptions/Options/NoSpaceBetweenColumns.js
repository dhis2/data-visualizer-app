import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption.js'

const NoSpaceBetweenColumns = () => (
    <CheckboxBaseOption
        label={i18n.t('No space between bars/columns')}
        option={{
            name: 'noSpaceBetweenColumns',
        }}
    />
)

export default NoSpaceBetweenColumns
