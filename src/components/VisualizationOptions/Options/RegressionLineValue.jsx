import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import NumberBaseType from './NumberBaseType.jsx'

const RegressionLineValue = ({ dataTest, axisId, id }) => (
    <NumberBaseType
        width="96px"
        label={i18n.t('Value')}
        placeholder={i18n.t('Number')}
        option={{
            id,
            axisId,
        }}
        inline
        dataTest={dataTest}
    />
)

RegressionLineValue.propTypes = {
    axisId: PropTypes.string,
    dataTest: PropTypes.string,
    id: PropTypes.string,
}

export default RegressionLineValue
