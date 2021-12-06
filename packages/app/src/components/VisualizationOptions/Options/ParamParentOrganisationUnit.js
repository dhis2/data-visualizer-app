import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption.js'

const ParamParentOrganisationUnit = () => (
    <CheckboxBaseOption
        label={i18n.t('Parent organisation unit')}
        option={{
            name: 'parentOrganisationUnit',
        }}
    />
)

export default ParamParentOrganisationUnit
