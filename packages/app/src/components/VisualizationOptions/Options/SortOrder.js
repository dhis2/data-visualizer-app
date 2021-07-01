import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { options } from '../../../modules/options'
import SelectBaseOption from './SelectBaseOption'

const optionName = 'sortOrder'
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
