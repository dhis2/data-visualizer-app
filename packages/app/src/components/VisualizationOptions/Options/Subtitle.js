import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import TextBaseOption from './TextBaseOption.js'

const Subtitle = ({ dataTest }) => (
    <TextBaseOption
        type="text"
        width="280px"
        placeholder={i18n.t('Add a subtitle')}
        option={{
            name: 'subtitle',
        }}
        dataTest={dataTest}
    />
)

Subtitle.propTypes = {
    dataTest: PropTypes.string,
}

export default Subtitle
