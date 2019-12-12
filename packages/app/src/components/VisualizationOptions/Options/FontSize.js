import React from 'react'

import i18n from '@dhis2/d2-i18n'

import SelectBaseOption from './SelectBaseOption'

const FontSize = () => (
    <SelectBaseOption
        label={i18n.t('Font size')}
        option={{
            name: 'fontSize',
            items: [
                { id: 'LARGE', label: i18n.t('Large') },
                { id: 'NORMAL', label: i18n.t('Normal') },
                { id: 'SMALL', label: i18n.t('Small') },
            ],
        }}
    />
)

export default FontSize
