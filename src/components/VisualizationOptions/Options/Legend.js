import {
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, FieldSet, Legend as UiCoreLegend } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui.js'
import {
    OPTION_LEGEND_DISPLAY_STRATEGY,
    OPTION_LEGEND_DISPLAY_STYLE,
    OPTION_LEGEND_SET,
} from '../../../modules/options.js'
import { sGetUiOption } from '../../../reducers/ui.js'
import {
    tabSectionOptionToggleable,
    tabSectionOption,
    tabSectionTitle,
    tabSectionTitleMargin,
} from '../styles/VisualizationOptions.style.js'
import LegendDisplayStrategy from './LegendDisplayStrategy.js'
import LegendDisplayStyle from './LegendDisplayStyle.js'
import ShowLegendKey from './ShowLegendKey.js'

const Legend = ({
    legendSet,
    legendDisplayStrategy,
    onChange,
    hideStyleOptions,
    hideByDataItemStrategy,
}) => {
    const [legendEnabled, setLegendEnabled] = useState(
        !(
            (!legendDisplayStrategy ||
                legendDisplayStrategy === LEGEND_DISPLAY_STRATEGY_FIXED) &&
            !legendSet
        )
    )

    const onCheckboxChange = ({ checked }) => {
        setLegendEnabled(checked)

        if (checked) {
            onChange({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
            })
            onChange({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: LEGEND_DISPLAY_STYLE_FILL,
            })
        } else {
            onChange({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_FIXED,
            })
            onChange({
                optionId: OPTION_LEGEND_SET,
                value: undefined,
            })
            onChange({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: undefined,
            })
        }
    }

    return (
        <div className={tabSectionOption.className}>
            <Checkbox
                checked={legendEnabled}
                label={i18n.t('Use legend for chart colors')}
                onChange={onCheckboxChange}
                dense
            />
            {legendEnabled ? (
                <div className={tabSectionOptionToggleable.className}>
                    {!hideStyleOptions ? (
                        <div className={tabSectionOption.className}>
                            <FieldSet>
                                <UiCoreLegend>
                                    <span
                                        className={cx(
                                            tabSectionTitle.className,
                                            tabSectionTitleMargin.className
                                        )}
                                    >
                                        {i18n.t('Legend style')}
                                    </span>
                                </UiCoreLegend>
                                <div className={tabSectionOption.className}>
                                    <LegendDisplayStyle />
                                </div>
                            </FieldSet>
                        </div>
                    ) : null}
                    <div className={tabSectionOption.className}>
                        <FieldSet>
                            <UiCoreLegend>
                                <span
                                    className={cx(tabSectionTitle.className, {
                                        [tabSectionTitleMargin.className]:
                                            hideStyleOptions,
                                    })}
                                >
                                    {i18n.t('Legend type')}
                                </span>
                            </UiCoreLegend>
                            <div className={tabSectionOption.className}>
                                <LegendDisplayStrategy
                                    singleLegendSetOnly={hideByDataItemStrategy}
                                />
                            </div>
                        </FieldSet>
                    </div>
                    <div>
                        <ShowLegendKey />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

Legend.propTypes = {
    onChange: PropTypes.func.isRequired,
    hideByDataItemStrategy: PropTypes.bool,
    hideStyleOptions: PropTypes.bool,
    legendDisplayStrategy: PropTypes.string,
    legendSet: PropTypes.object,
}

const mapStateToProps = (state) => ({
    legendSet: sGetUiOption(state, { id: OPTION_LEGEND_SET }),
    legendDisplayStrategy: sGetUiOption(state, {
        id: OPTION_LEGEND_DISPLAY_STRATEGY,
    }),
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (params) => dispatch(acSetUiOption(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
