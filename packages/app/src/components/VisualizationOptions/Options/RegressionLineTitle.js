import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

const RegressionLineTitle = ({ dataTest, axisId, fontStyleKey, id }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Title')}
        placeholder={i18n.t('Add a title')}
        option={{
            id,
            axisId,
        }}
        inline
        fontStyleKey={fontStyleKey}
        dataTest={dataTest}
    />
)

RegressionLineTitle.propTypes = {
    axisId: PropTypes.string,
    dataTest: PropTypes.string,
    fontStyleKey: PropTypes.string,
    id: PropTypes.string,
}

export default RegressionLineTitle
