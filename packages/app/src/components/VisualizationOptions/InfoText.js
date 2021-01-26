import React from 'react'
import PropTypes from 'prop-types'
import { IconInfo16 } from '@dhis2/ui-icons'

import {
    tabSectionOption,
    tabSectionOptionText,
    tabSectionOptionIcon,
} from './styles/VisualizationOptions.style.js'

export const InfoText = ({ text }) => (
    <div className={tabSectionOption.className}>
        <p className={tabSectionOptionText.className}>
            <span className={tabSectionOptionIcon.className}>
                <IconInfo16 />
            </span>
            {text}
        </p>
    </div>
)

InfoText.propTypes = {
    text: PropTypes.string,
}

export default InfoText
