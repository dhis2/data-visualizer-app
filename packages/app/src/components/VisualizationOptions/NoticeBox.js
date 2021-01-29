import React from 'react'
import PropTypes from 'prop-types'
import { NoticeBox as UiNoticeBox } from '@dhis2/ui'

import { tabSectionOption } from './styles/VisualizationOptions.style.js'

const NoticeBox = ({ title, text, type }) => {
    const props = {
        title,
    }

    if (type) {
        props[type] = true
    }

    return (
        <div className={tabSectionOption.className}>
            <UiNoticeBox {...props}>{text}</UiNoticeBox>
        </div>
    )
}

NoticeBox.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
}

export default NoticeBox
