import i18n from '@dhis2/d2-i18n'
import React from 'react'
import SelectBaseOption from './SelectBaseOption'

const DisplayDensity = () => (
    <SelectBaseOption
        label={i18n.t('Display density')}
        option={{
            name: 'displayDensity',
            items: [
                { value: 'COMFORTABLE', label: i18n.t('Comfortable') },
                { value: 'NORMAL', label: i18n.t('Normal') },
                { value: 'COMPACT', label: i18n.t('Compact') },
            ],
        }}
    />
)

export default DisplayDensity
