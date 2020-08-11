/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import ColorSet from '../../../components/VisualizationOptions/Options/ColorSet'

export default hasCustomAxes => ({
    key: 'style-color-set',
    label: i18n.t('Color set'),
    helpText: hasCustomAxes
        ? i18n.t('Color sets are not supported yet when using multiple axes')
        : null,
    content: React.Children.toArray([<ColorSet disabled={hasCustomAxes} />]),
})
