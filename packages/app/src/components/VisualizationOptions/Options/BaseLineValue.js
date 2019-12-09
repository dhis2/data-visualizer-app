import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import TextBaseOption from './TextBaseOption'

const BaseLineValue = ({ enabled }) => (
    <TextBaseOption
        enabled={enabled}
        type="number"
        option={{
            name: 'baseLineValue',
            label: i18n.t('Base line value'),
        }}
    />
)

BaseLineValue.propTypes = {
    enabled: PropTypes.bool.isRequired,
}

export default BaseLineValue
