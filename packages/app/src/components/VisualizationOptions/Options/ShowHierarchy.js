import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Label } from '@dhis2/ui-core'

import CheckboxBaseOption from './CheckboxBaseOption'

const ShowHierarchy = () => (
    <div>
        <Label>{i18n.t('Labels')}</Label>
        <CheckboxBaseOption
            label={i18n.t('Show hierarchy')}
            option={{
                name: 'showHierarchy',
            }}
        />
    </div>
)

export default ShowHierarchy
