import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_HORIZONTAL_AXIS_TITLE } from '@dhis2/analytics'

import TextBaseOption from './TextBaseOption'
import { OPTION_AXIS_TITLE } from '../../../modules/options'

const DomainAxisLabel = () => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Axis title')}
        placeholder={i18n.t('Add a title')}
        option={{
            id: OPTION_AXIS_TITLE,
            axisId: 'DOMAIN_0',
        }}
        toggleable={true}
        fontStyleKey={FONT_STYLE_HORIZONTAL_AXIS_TITLE}
    />
)

export default DomainAxisLabel
