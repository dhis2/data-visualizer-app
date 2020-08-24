import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Label } from '@dhis2/ui'
import { FONT_STYLE_CATEGORY_AXIS_LABELS } from '@dhis2/analytics'

import { tabSectionOption } from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle'

const CategoryAxisLabels = ({ disabled }) => (
    <div className={tabSectionOption.className}>
        <Label>{i18n.t('Labels')}</Label>
        <TextStyle
            fontStyleKey={FONT_STYLE_CATEGORY_AXIS_LABELS}
            disabled={disabled}
        />
    </div>
)

CategoryAxisLabels.propTypes = {
    disabled: PropTypes.bool,
}

export default CategoryAxisLabels
