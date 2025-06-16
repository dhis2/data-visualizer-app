import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_PARENT_ORGANISATION_UNIT } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ParamParentOrganisationUnit = () => (
    <CheckboxBaseOption
        label={i18n.t('Parent organisation unit')}
        option={{
            name: OPTION_PARENT_ORGANISATION_UNIT,
        }}
    />
)

export default ParamParentOrganisationUnit
