import { FONT_STYLE_LEGEND } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_SHOW_SERIES_KEY } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const ShowSeriesKey = () => (
    <CheckboxBaseOption
        label={i18n.t('Show series key')}
        option={{
            id: OPTION_SHOW_SERIES_KEY,
        }}
        inverted={true}
        fontStyleKey={FONT_STYLE_LEGEND}
        dataTest={'option-series-key'}
    />
)

export default ShowSeriesKey
