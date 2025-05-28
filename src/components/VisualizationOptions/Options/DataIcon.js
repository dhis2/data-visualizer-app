import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_ICONS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const DataIcon = () => (
    <CheckboxBaseOption
        label={i18n.t('Show data item icon')}
        helpText={i18n.t(
            'If the data item has an icon, display it next to the value'
        )}
        option={{
            name: OPTION_ICONS,
        }}
        dataTest="option-show-data-item-icon"
    />
)

export default DataIcon
