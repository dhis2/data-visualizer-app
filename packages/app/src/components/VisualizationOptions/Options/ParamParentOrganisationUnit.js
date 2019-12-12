import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const ParamParentOrganisationUnit = () => (
    <CheckboxBaseOption
        label={i18n.t('Parent organisation unit')}
        option={{
            name: 'paramParentOrganisationUnit',
        }}
    />
)

export default ParamParentOrganisationUnit
