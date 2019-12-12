import React from 'react'

import i18n from '@dhis2/d2-i18n'

import SelectBaseOption from './SelectBaseOption'
import { options } from '../../../modules/options'

const optionName = 'hideEmptyRowItems'
const defaultValue = options[optionName].defaultValue

const HideEmptyRowItems = () => (
    <SelectBaseOption
        label={i18n.t('Hide empty categories')}
        toggleable={true}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { id: 'NONE', label: i18n.t('None') },
                { id: 'BEFORE_FIRST', label: i18n.t('Before first') },
                { id: 'AFTER_LAST', label: i18n.t('After last') },
                {
                    id: 'BEFORE_FIRST_AFTER_LAST',
                    label: i18n.t('Before first and after last'),
                },
                { id: 'ALL', label: i18n.t('All') },
            ],
        }}
    />
)

export default HideEmptyRowItems
