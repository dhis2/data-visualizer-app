import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_SHOW_HIERARCHY } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ShowHierarchy = () => (
    <CheckboxBaseOption
        label={i18n.t('Display organisation unit hierarchy')}
        option={{
            name: OPTION_SHOW_HIERARCHY,
        }}
    />
)

export default ShowHierarchy
