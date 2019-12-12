import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const ShowHierarchy = () => (
    <CheckboxBaseOption
        label={i18n.t('Show hierarchy')}
        option={{
            name: 'showHierarchy',
        }}
    />
)

export default ShowHierarchy
