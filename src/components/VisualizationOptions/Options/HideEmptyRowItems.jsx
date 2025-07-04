import {
    HIDE_EMPTY_ROW_ITEMS_BEFORE_FIRST,
    HIDE_EMPTY_ROW_ITEMS_AFTER_LAST,
    HIDE_EMPTY_ROW_ITEMS_BEFORE_FIRST_AFTER_LAST,
    HIDE_EMPTY_ROW_ITEMS_ALL,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import {
    options,
    OPTION_HIDE_EMPTY_ROW_ITEMS,
} from '../../../modules/options.js'
import { SelectBaseOption } from './SelectBaseOption.jsx'

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
                {
                    value: HIDE_EMPTY_ROW_ITEMS_BEFORE_FIRST,
                    label: i18n.t('Before first'),
                },
                {
                    value: HIDE_EMPTY_ROW_ITEMS_AFTER_LAST,
                    label: i18n.t('After last'),
                },
                {
                    value: HIDE_EMPTY_ROW_ITEMS_BEFORE_FIRST_AFTER_LAST,
                    label: i18n.t('Before first and after last'),
                },
                { value: HIDE_EMPTY_ROW_ITEMS_ALL, label: i18n.t('All') },
            ],
        }}
    />
)

export default HideEmptyRowItems
