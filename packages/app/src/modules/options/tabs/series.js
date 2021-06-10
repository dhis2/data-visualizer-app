/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import SeriesTable from '../../../components/VisualizationOptions/Options/SeriesTable'

export default ({ showAxisOptions, showTypeOptions } = {}) => ({
    key: 'series-tab',
    label: i18n.t('Series'),
    content: [
        {
            key: 'series-table',
            content: React.Children.toArray([
                <SeriesTable
                    showAxisOptions={showAxisOptions}
                    showTypeOptions={showTypeOptions}
                />,
            ]),
        },
    ],
})
