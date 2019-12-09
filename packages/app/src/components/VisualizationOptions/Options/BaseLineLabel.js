import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import TextBaseOption from './TextBaseOption'

const BaseLineLabel = ({ enabled }) => (
    <TextBaseOption
        enabled={enabled}
        type="text"
        option={{
            name: 'baseLineLabel',
            label: i18n.t('Base line title'),
        }}
    />
)

BaseLineLabel.propTypes = {
    enabled: PropTypes.bool.isRequired,
}

export default BaseLineLabel
