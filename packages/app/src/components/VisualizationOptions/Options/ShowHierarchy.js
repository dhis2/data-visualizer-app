import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const ShowHierarchy = () => (
    <CheckboxBaseOption
        label={i18n.t('Display organisation unit hierarchy')}
        option={{
            name: 'showHierarchy',
        }}
    />
)

export default ShowHierarchy
