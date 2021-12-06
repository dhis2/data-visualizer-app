import i18n from '@dhis2/d2-i18n'
import React from 'react'
import SelectBaseOption from './SelectBaseOption.js'

const TopLimit = () => (
    <SelectBaseOption
        label={i18n.t('Top limit')}
        option={{
            name: 'topLimit',
            items: [
                { value: '0', label: i18n.t('None') },
                { value: '5', label: '5' },
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
            ],
        }}
    />
)

export default TopLimit
