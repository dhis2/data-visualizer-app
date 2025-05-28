import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_NO_SPACE_BETWEEN_COLUMNS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const NoSpaceBetweenColumns = () => (
    <CheckboxBaseOption
        label={i18n.t('No space between bars/columns')}
        option={{
            name: OPTION_NO_SPACE_BETWEEN_COLUMNS,
        }}
    />
)

export default NoSpaceBetweenColumns
