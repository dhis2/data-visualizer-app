import i18n from '@dhis2/d2-i18n'
import React from 'react'
import CheckboxBaseOption from './CheckboxBaseOption'

const ShowData = () => (
    <CheckboxBaseOption
        label={i18n.t('Value labels')}
        option={{
            name: 'showData',
        }}
    />
)

export default ShowData
