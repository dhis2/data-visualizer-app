import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ParamOrganisationUnit = () => (
    <CheckboxBaseOption
        label={i18n.t('Organisation unit')}
        option={{
            name: 'organisationUnit',
        }}
    />
)

export default ParamOrganisationUnit
