import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { options, OPTION_SORT_ORDER } from '../../../modules/options.js'
import { SelectBaseOption } from './SelectBaseOption.jsx'

const optionName = OPTION_SORT_ORDER
const defaultValue = options[optionName].defaultValue

const SortOrder = () => (
    <SelectBaseOption
        label={i18n.t('Custom sort order')}
        toggleable={true}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { value: '-1', label: i18n.t('Low to high') },
                { value: '1', label: i18n.t('High to low') },
            ],
        }}
    />
)
export default SortOrder
