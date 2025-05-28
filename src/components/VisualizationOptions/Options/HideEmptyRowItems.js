import i18n from '@dhis2/d2-i18n'
import React from 'react'
import {
    options,
    OPTION_HIDE_EMPTY_ROW_ITEMS,
} from '../../../modules/options.js'
import { SelectBaseOption } from './SelectBaseOption.js'

const optionName = OPTION_HIDE_EMPTY_ROW_ITEMS
const defaultValue = options[optionName].defaultValue

const HideEmptyRowItems = () => (
    <SelectBaseOption
        label={i18n.t('Hide empty categories')}
        toggleable={true}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { value: 'BEFORE_FIRST', label: i18n.t('Before first') },
                { value: 'AFTER_LAST', label: i18n.t('After last') },
                {
                    value: 'BEFORE_FIRST_AFTER_LAST',
                    label: i18n.t('Before first and after last'),
                },
                { value: 'ALL', label: i18n.t('All') },
            ],
        }}
    />
)

export default HideEmptyRowItems
