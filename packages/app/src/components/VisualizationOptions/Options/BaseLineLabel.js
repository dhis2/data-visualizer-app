import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_BASE_LINE_LABEL } from '@dhis2/analytics'

import TextBaseOption from './TextBaseOption'

const BaseLineLabel = () => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Title')}
        placeholder={i18n.t('Base line title')}
        option={{
            name: 'baseLineLabel',
        }}
        inline
        fontStyleKey={FONT_STYLE_BASE_LINE_LABEL}
    />
)

export default BaseLineLabel
