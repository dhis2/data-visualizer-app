import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const DataIcon = () => (
    <CheckboxBaseOption
        label={i18n.t('Show data item icon')}
        helpText={i18n.t(
            'If the data item has an icon, display it next to the value'
        )}
        option={{
            name: 'icons',
        }}
        dataTest={'option-show-data-item-icon'}
    />
)

export default DataIcon
