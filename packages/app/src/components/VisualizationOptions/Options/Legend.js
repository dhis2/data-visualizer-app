import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'
import { Checkbox, FieldSet, Legend as UiCoreLegend } from '@dhis2/ui'

import LegendDisplayStyle, {
    LEGEND_DISPLAY_STYLE_OPTION_NAME,
    LEGEND_DISPLAY_STYLE_FILL,
} from './LegendDisplayStyle'
import LegendDisplayStrategy, {
    LEGEND_DISPLAY_STRATEGY_OPTION_NAME,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
} from './LegendDisplayStrategy'
import { LEGEND_SET_OPTION_NAME } from './LegendSet'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import {
    tabSectionOptionToggleable,
    tabSectionOption,
    tabSectionTitle,
} from '../styles/VisualizationOptions.style.js'

const Legend = ({
    legendSet,
    legendDisplayStrategy,
    onChange,
    hideStyleOptions,
}) => {
    const [legendEnabled, setLegendEnabled] = useState(
        !(legendDisplayStrategy === LEGEND_DISPLAY_STRATEGY_FIXED && !legendSet)
    )

    const onCheckboxChange = ({ checked }) => {
        setLegendEnabled(checked)

        if (checked) {
            onChange({
                [LEGEND_DISPLAY_STRATEGY_OPTION_NAME]: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
            })
        } else {
            onChange({
                [LEGEND_SET_OPTION_NAME]: undefined,
                [LEGEND_DISPLAY_STRATEGY_OPTION_NAME]: LEGEND_DISPLAY_STRATEGY_FIXED,
                [LEGEND_DISPLAY_STYLE_OPTION_NAME]: LEGEND_DISPLAY_STYLE_FILL,
            })
        }
    }

    return (
        <div className={tabSectionOption.className}>
            <Checkbox
                checked={legendEnabled}
                label={i18n.t('Display legend')}
                onChange={onCheckboxChange}
                dense
            />
            {legendEnabled ? (
                <div className={tabSectionOptionToggleable.className}>
                    {!hideStyleOptions ? (
                        <FieldSet>
                            <UiCoreLegend>
                                <span
                                    className={tabSectionTitle.className}
                                    style={{ marginTop: 8 }}
                                >
                                    {i18n.t('Legend style')}
                                </span>
                            </UiCoreLegend>
                            <div className={tabSectionOption.className}>
                                <LegendDisplayStyle />
                            </div>
                        </FieldSet>
                    ) : null}
                    <FieldSet>
                        <UiCoreLegend>
                            <span className={tabSectionTitle.className}>
                                {i18n.t('Legend type')}
                            </span>
                        </UiCoreLegend>
                        <div className={tabSectionOption.className}>
                            <LegendDisplayStrategy />
                        </div>
                    </FieldSet>
                </div>
            ) : null}
        </div>
    )
}

Legend.propTypes = {
    legendDisplayStrategy: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    hideStyleOptions: PropTypes.bool,
    legendSet: PropTypes.object,
}

const mapStateToProps = state => ({
    legendSet: sGetUiOptions(state)[LEGEND_SET_OPTION_NAME],
    legendDisplayStrategy: sGetUiOptions(state)[
        LEGEND_DISPLAY_STRATEGY_OPTION_NAME
    ],
})

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(acSetUiOptions(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
