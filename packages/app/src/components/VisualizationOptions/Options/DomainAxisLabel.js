import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_HORIZONTAL_AXIS_TITLE } from '@dhis2/analytics'

import TextBaseOption from './TextBaseOption'
import { options } from '../../../modules/options'

const optionName = 'domainAxisLabel'
const defaultValue = options[optionName].defaultValue

const DomainAxisLabel = () => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Axis title')}
        placeholder={i18n.t('Add a title')}
        option={{
            name: optionName,
            defaultValue: defaultValue,
        }}
        toggleable={true}
        fontStyleKey={FONT_STYLE_HORIZONTAL_AXIS_TITLE}
    />
)

export default DomainAxisLabel
