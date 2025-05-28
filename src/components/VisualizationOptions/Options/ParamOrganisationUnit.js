import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_ORGANISATION_UNIT } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ParamOrganisationUnit = () => (
    <CheckboxBaseOption
        label={i18n.t('Organisation unit')}
        option={{
            name: OPTION_ORGANISATION_UNIT,
        }}
    />
)

export default ParamOrganisationUnit
