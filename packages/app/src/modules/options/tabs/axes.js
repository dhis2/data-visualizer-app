import i18n from '@dhis2/d2-i18n'
import React from 'react'
import AxesTabs from '../../../components/AxesTabs/AxesTabs'

export default content => ({
    key: 'axes-tab',
    label: i18n.t('Axes'),
    content: [
        {
            key: 'axis-tabs',
            content: React.Children.toArray([
                <AxesTabs items={content} key="tabs" dataTest={'axes-tabs'} />,
            ]),
        },
    ],
})
