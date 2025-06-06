import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_HIDE_EMPTY_COLUMNS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const HideEmptyColumns = () => (
    <CheckboxBaseOption
        label={i18n.t('Hide empty columns')}
        option={{
            name: OPTION_HIDE_EMPTY_COLUMNS,
        }}
    />
)

export default HideEmptyColumns
