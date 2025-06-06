import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_TITLE } from '../../../modules/options.js'
import { TextBaseOption } from './TextBaseOption.js'

const Title = ({ label, inline }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={label}
        placeholder={i18n.t('Add a title')}
        option={{
            name: OPTION_TITLE,
        }}
        inline={inline}
    />
)

Title.defaultProps = {
    inline: false,
}

Title.propTypes = {
    inline: PropTypes.bool,
    label: PropTypes.string,
}

export default Title
