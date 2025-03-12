import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { TextBaseOption } from './TextBaseOption.jsx'

const Subtitle = ({ dataTest, label }) => (
    <TextBaseOption
        type="text"
        width="280px"
        placeholder={i18n.t('Add a subtitle')}
        label={label}
        option={{
            name: 'subtitle',
        }}
        dataTest={dataTest}
    />
)

Subtitle.defaultProps = {
    dataTest: 'visualization-option-subtitle',
}

Subtitle.propTypes = {
    dataTest: PropTypes.string,
    label: PropTypes.string,
}

export default Subtitle
