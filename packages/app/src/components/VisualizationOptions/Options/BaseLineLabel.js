import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_BASE_LINE_LABEL } from '@dhis2/analytics'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'
import { OPTION_BASE_LINE_TITLE } from '../../../modules/options'

const BaseLineLabel = ({ dataTest, axisId }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Title')}
        placeholder={i18n.t('Base line title')}
        option={{
            id: OPTION_BASE_LINE_TITLE,
            axisId,
        }}
        inline
        fontStyleKey={FONT_STYLE_BASE_LINE_LABEL}
        dataTest={dataTest}
    />
)

BaseLineLabel.propTypes = {
    axisId: PropTypes.string,
    dataTest: PropTypes.string,
}

export default BaseLineLabel
