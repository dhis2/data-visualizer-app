import React from 'react'

import i18n from '@dhis2/d2-i18n'

import TextBaseOption from './TextBaseOption'

const RangeAxisDecimals = () => (
    <TextBaseOption
        type="number"
        width="72px"
        label={i18n.t('Decimals')}
        placeholder={i18n.t('Auto')}
        option={{
            name: 'rangeAxisDecimals',
        }}
    />
)

export default RangeAxisDecimals
