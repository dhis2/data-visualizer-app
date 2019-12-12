import React from 'react'
import i18n from '@dhis2/d2-i18n'

import TextBaseOption from './TextBaseOption'

const BaseLineValue = () => (
    <TextBaseOption
        type="number"
        width="72px"
        label={i18n.t('Value')}
        placeholder={i18n.t('Number')}
        option={{
            name: 'baseLineValue',
        }}
        inline
    />
)

export default BaseLineValue
