import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_HIDE_EMPTY_ROWS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const HideEmptyRows = () => (
    <CheckboxBaseOption
        label={i18n.t('Hide empty rows')}
        option={{
            name: OPTION_HIDE_EMPTY_ROWS,
        }}
    />
)

export default HideEmptyRows
