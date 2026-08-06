import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_SHOW_DATA } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ShowData = () => (
    <CheckboxBaseOption
        label={i18n.t('Value labels')}
        option={{
            name: OPTION_SHOW_DATA,
        }}
    />
)

export default ShowData
