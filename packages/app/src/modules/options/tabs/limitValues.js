/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import MeasureCriteria from '../../../components/VisualizationOptions/Options/MeasureCriteria'

export default () => ({
    key: 'limitValues-tab',
    label: i18n.t('Limit values'),
    content: [
        /*
        {
            key: 'limitValues-limit-numbers',
            label: i18n.t('Limit number of values'),
            content: [<TopLimit />],
        },*/
        {
            key: 'limitValues-limit-min-max',
            label: i18n.t('Limit minimum/maximum values'),
            content: React.Children.toArray([<MeasureCriteria />]),
        },
    ],
})
