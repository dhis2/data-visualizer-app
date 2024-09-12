import {
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, FieldSet, Help, Legend as UiCoreLegend } from '@dhis2/ui'
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
import { sGetUiOption, sGetUiDisabledOption } from '../../../reducers/ui.js'
import {
    tabSectionOptionToggleable,
    tabSectionOption,
    tabSectionTitle,
    tabSectionTitleDisabled,
    tabSectionTitleMargin,
} from '../styles/VisualizationOptions.style.js'
import LegendDisplayStrategy from './LegendDisplayStrategy.jsx'
import LegendDisplayStyle from './LegendDisplayStyle.jsx'
import ShowLegendKey from './ShowLegendKey.jsx'

const optionName = 'legend'

const Legend = ({
    legendSet,
    legendDisplayStrategy,
    onChange,
    helpText,
    hideStyleOptions,
    disabled,
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
        <div className={tabSectionOption.className} data-test="option-legend">
            <Checkbox
                checked={legendEnabled}
                disabled={disabled}
                helpText={helpText}
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
                                            tabSectionTitleMargin.className,
                                            {
                                                [tabSectionTitleDisabled.className]:
                                                    disabled,
                                            }
                                        )}
                                    >
                                        {i18n.t('Legend style')}
                                    </span>
                                </UiCoreLegend>
                                <div className={tabSectionOption.className}>
                                    <LegendDisplayStyle disabled={disabled} />
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
                                        [tabSectionTitleDisabled.className]:
                                            disabled,
                                    })}
                                >
                                    {i18n.t('Legend type')}
                                </span>
                            </UiCoreLegend>
                            <div className={tabSectionOption.className}>
                                <LegendDisplayStrategy disabled={disabled} />
                            </div>
                        </FieldSet>
                    </div>
                    <div>
                        <ShowLegendKey disabled={disabled} />
                    </div>
                </div>
            ) : null}
            {helpText && (
                <UiCoreLegend>
                    <Help>{helpText}</Help>
                </UiCoreLegend>
            )}
        </div>
    )
}

Legend.propTypes = {
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    hideStyleOptions: PropTypes.bool,
    legendDisplayStrategy: PropTypes.string,
    legendSet: PropTypes.object,
}

const mapStateToProps = (state) => ({
    disabled: Boolean(sGetUiDisabledOption(state, { name: optionName })),
    helpText: sGetUiDisabledOption(state, { name: optionName })?.helpText,
    legendSet: sGetUiOption(state, { id: OPTION_LEGEND_SET }),
    legendDisplayStrategy: sGetUiOption(state, {
        id: OPTION_LEGEND_DISPLAY_STRATEGY,
    }),
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (params) => dispatch(acSetUiOption(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
