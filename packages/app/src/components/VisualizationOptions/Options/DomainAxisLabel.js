import React from 'react'
import TextBaseOption from './TextBaseOption'
import i18n from '@dhis2/d2-i18n'

const DomainAxisLabel = () => (
    <TextBaseOption
        type="text"
        option={{
            name: 'domainAxisLabel',
            label: i18n.t('Domain axis title'),
        }}
    />
)

export default DomainAxisLabel
