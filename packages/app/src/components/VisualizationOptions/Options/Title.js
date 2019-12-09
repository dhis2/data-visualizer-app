import React from 'react'
import TextBaseOption from './TextBaseOption'
import i18n from '@dhis2/d2-i18n'

const Title = () => (
    <TextBaseOption
        type="text"
        option={{
            name: 'title',
            label: i18n.t('Chart title'),
        }}
    />
)

export default Title
