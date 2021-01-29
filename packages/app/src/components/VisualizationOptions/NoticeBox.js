import React from 'react'
import PropTypes from 'prop-types'
import { NoticeBox as UiNoticeBox } from '@dhis2/ui'

import { tabSectionOption } from './styles/VisualizationOptions.style.js'

const NoticeBox = ({ title, text, warning = false, error = false }) => (
    <div className={tabSectionOption.className}>
        <UiNoticeBox title={title} warning={warning} error={error}>
            {text}
        </UiNoticeBox>
    </div>
)

NoticeBox.propTypes = {
    error: PropTypes.bool,
    text: PropTypes.string,
    title: PropTypes.string,
    warning: PropTypes.bool,
}

export default NoticeBox
