import i18n from '@dhis2/d2-i18n'
import React from 'react'
import SelectBaseOption from './SelectBaseOption'

const FontSize = () => (
    <SelectBaseOption
        label={i18n.t('Font size')}
        option={{
            name: 'fontSize',
            items: [
                { value: 'LARGE', label: i18n.t('Large') },
                { value: 'NORMAL', label: i18n.t('Normal') },
                { value: 'SMALL', label: i18n.t('Small') },
            ],
        }}
    />
)

export default FontSize
