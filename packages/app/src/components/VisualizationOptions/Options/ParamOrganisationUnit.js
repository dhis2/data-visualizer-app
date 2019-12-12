import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const ParamOrganisationUnit = () => (
    <CheckboxBaseOption
        label={i18n.t('Organisation unit')}
        option={{
            name: 'paramOrganisationUnit',
        }}
    />
)

export default ParamOrganisationUnit
