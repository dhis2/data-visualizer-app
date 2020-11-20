import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

const BaseLineValue = ({ dataTest }) => (
    <TextBaseOption
        type="number"
        width="96px"
        label={i18n.t('Value')}
        placeholder={i18n.t('Number')}
        option={{
            name: 'baseLineValue',
        }}
        inline
        dataTest={dataTest}
    />
)

BaseLineValue.propTypes = {
    dataTest: PropTypes.string,
}

export default BaseLineValue
