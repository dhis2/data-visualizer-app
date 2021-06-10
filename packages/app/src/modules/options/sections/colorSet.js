/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import ColorSet from '../../../components/VisualizationOptions/Options/ColorSet'

export default hasDisabledSections => ({
    key: 'style-color-set',
    label: i18n.t('Color set'),
    helpText: hasDisabledSections
        ? i18n.t('Color sets are not supported yet when using multiple axes')
        : null,
    content: React.Children.toArray([
        <ColorSet disabled={hasDisabledSections} />,
    ]),
})
