import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import TextBaseOption from './TextBaseOption'

const TargetLineLabel = ({ enabled }) => (
    <TextBaseOption
        enabled={enabled}
        type="text"
        option={{
            name: 'targetLineLabel',
            label: i18n.t('Target line title'),
        }}
    />
)

TargetLineLabel.propTypes = {
    enabled: PropTypes.bool.isRequired,
}

export default TargetLineLabel
