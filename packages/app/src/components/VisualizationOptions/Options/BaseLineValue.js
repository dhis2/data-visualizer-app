import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import NumberBaseType from './NumberBaseType'
import { OPTION_BASE_LINE_VALUE } from '../../../modules/options'

const BaseLineValue = ({ dataTest, axisId }) => (
    <NumberBaseType
        width="96px"
        label={i18n.t('Value')}
        placeholder={i18n.t('Number')}
        option={{
            id: OPTION_BASE_LINE_VALUE,
            axisId,
        }}
        inline
        dataTest={dataTest}
    />
)

BaseLineValue.propTypes = {
    axisId: PropTypes.string,
    dataTest: PropTypes.string,
}

export default BaseLineValue
