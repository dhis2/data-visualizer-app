import { FONT_STYLE_LEGEND } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_HIDE_LEGEND } from '../../../modules/options'
import CheckboxBaseOption from './CheckboxBaseOption'

const HideLegend = () => (
    <CheckboxBaseOption
        label={i18n.t('Show legend key')}
        option={{
            id: OPTION_HIDE_LEGEND,
        }}
        inverted={true}
        fontStyleKey={FONT_STYLE_LEGEND}
        dataTest={'option-legend-key'}
    />
)

export default HideLegend
