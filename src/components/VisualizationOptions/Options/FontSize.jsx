import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_FONT_SIZE } from '../../../modules/options.js'
import { SelectBaseOption } from './SelectBaseOption.jsx'

const FontSize = () => (
    <SelectBaseOption
        label={i18n.t('Font size')}
        option={{
            name: OPTION_FONT_SIZE,
            items: [
                { value: 'LARGE', label: i18n.t('Large') },
                { value: 'NORMAL', label: i18n.t('Normal') },
                { value: 'SMALL', label: i18n.t('Small') },
            ],
        }}
    />
)

export default FontSize
