import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_TARGET_LINE_LABEL } from '@dhis2/analytics'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

const TargetLineLabel = ({ dataTest }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Title')}
        placeholder={i18n.t('Target line title')}
        option={{
            name: 'targetLineLabel',
        }}
        inline
        fontStyleKey={FONT_STYLE_TARGET_LINE_LABEL}
        dataTest={dataTest}
    />
)

TargetLineLabel.propTypes = {
    dataTest: PropTypes.string,
}

export default TargetLineLabel
