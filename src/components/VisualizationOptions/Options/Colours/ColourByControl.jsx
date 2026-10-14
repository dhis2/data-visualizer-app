import {
    COLOR_SET_DEFAULT,
    hasCustomAxes,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    Checkbox,
    Field,
    Radio,
    SegmentedControl,
    SingleSelectField,
    SingleSelectOption,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { acSetUiOption, acSetUiOptions } from '../../../../actions/ui.js'
import {
    FILL_TYPE_PATTERN,
    FILL_TYPE_SOLID,
    OPTION_COLOR_MODE,
    OPTION_COLOR_PALETTE,
    OPTION_FILL_TYPE,
    OPTION_LEGEND,
    OPTION_LEGEND_DISPLAY_STRATEGY,
    OPTION_LEGEND_DISPLAY_STYLE,
    OPTION_LEGEND_SET,
    OPTION_SERIES,
    OPTION_SINGLE_COLOR,
    OPTION_USE_ITEM_COLORS,
} from '../../../../modules/options.js'
import {
    COLOR_MODE_PALETTE,
    COLOR_MODE_SINGLE,
    DEFAULT_SINGLE_COLOR,
    getPaletteLabels,
    isLegendMode,
    PALETTE_BY_AXIS,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import { sGetUiOptions } from '../../../../reducers/ui.js'
import styles from '../../styles/Colours.module.css'
import tabStyles from '../../styles/VisualizationOptions.module.css'
import LegendDisplayStrategy from '../LegendDisplayStrategy.jsx'
import ShowLegendKey from '../ShowLegendKey.jsx'
import SeriesColorButton from './SeriesColorButton.jsx'
import { useColourOptionsInit } from './useColourOptionsInit.js'

const MODE_LEGEND = 'LEGEND'

const ColourByControl = ({
    options,
    setOption,
    setOptions,
    showLegend = false,
    showFill = true,
}) => {
    useColourOptionsInit()

    // Local state: "Select a legend" with no set picked yet still counts as Legend here
    const [legendSelected, setLegendSelected] = useState(
        () => showLegend && isLegendMode(options[OPTION_LEGEND])
    )
    const colorMode = options[OPTION_COLOR_MODE] || COLOR_MODE_PALETTE
    const selected = legendSelected ? MODE_LEGEND : colorMode
    const palette = options[OPTION_COLOR_PALETTE] || COLOR_SET_DEFAULT
    const singleColor = options[OPTION_SINGLE_COLOR] || DEFAULT_SINGLE_COLOR
    const labels = getPaletteLabels()
    const paletteIds =
        hasCustomAxes(options[OPTION_SERIES] || []) ||
        palette === PALETTE_BY_AXIS
            ? [PALETTE_BY_AXIS, ...PALETTE_IDS]
            : PALETTE_IDS

    const onModeChange = ({ value }) => {
        if (value === selected) {
            return
        }

        if (value === MODE_LEGEND) {
            setLegendSelected(true)
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
            })
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: LEGEND_DISPLAY_STYLE_FILL,
            })
            return
        }

        if (legendSelected) {
            setLegendSelected(false)
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STRATEGY,
                value: LEGEND_DISPLAY_STRATEGY_FIXED,
            })
            setOption({ optionId: OPTION_LEGEND_SET, value: undefined })
            setOption({
                optionId: OPTION_LEGEND_DISPLAY_STYLE,
                value: undefined,
            })
        }

        setOptions({ [OPTION_COLOR_MODE]: value })
    }

    const modeOptions = [
        ...(showLegend
            ? [{ label: i18n.t('Legend'), value: MODE_LEGEND }]
            : []),
        { label: i18n.t('Palette'), value: COLOR_MODE_PALETTE },
        { label: i18n.t('Single colour'), value: COLOR_MODE_SINGLE },
    ]

    return (
        <div className={styles.colourBy}>
            <div className={styles.modeRow}>
                <span className={styles.modeLabel}>{i18n.t('Colour by')}</span>
                <SegmentedControl
                    options={modeOptions}
                    selected={selected}
                    onChange={onModeChange}
                />
            </div>

            {selected === MODE_LEGEND && (
                <div className={styles.legendSettings}>
                    <div className={tabStyles.tabSectionOption}>
                        <LegendDisplayStrategy />
                    </div>
                    <ShowLegendKey />
                </div>
            )}

            {selected === COLOR_MODE_PALETTE && (
                <>
                    <div className={styles.paletteSelect}>
                        <SingleSelectField
                            dense
                            label={i18n.t('Palette')}
                            selected={palette}
                            onChange={({ selected }) =>
                                setOptions({ [OPTION_COLOR_PALETTE]: selected })
                            }
                            dataTest="colour-palette-select"
                        >
                            {paletteIds.map((id) => (
                                <SingleSelectOption
                                    key={id}
                                    value={id}
                                    label={labels[id]}
                                />
                            ))}
                        </SingleSelectField>
                    </div>
                    <Checkbox
                        dense
                        label={i18n.t(
                            'Use automatic data item colours where available'
                        )}
                        checked={Boolean(options[OPTION_USE_ITEM_COLORS])}
                        onChange={({ checked }) =>
                            setOptions({ [OPTION_USE_ITEM_COLORS]: checked })
                        }
                    />
                </>
            )}

            {selected === COLOR_MODE_SINGLE && (
                <Field label={i18n.t('Colour')} dense>
                    <SeriesColorButton
                        name={i18n.t('all series')}
                        value={singleColor}
                        color={singleColor}
                        onChange={(color) =>
                            setOptions({ [OPTION_SINGLE_COLOR]: color })
                        }
                    />
                </Field>
            )}

            {selected !== MODE_LEGEND && showFill && (
                <div className={styles.fill}>
                    <Field label={i18n.t('Fill')} dense>
                        {[
                            [FILL_TYPE_SOLID, i18n.t('Solid')],
                            [FILL_TYPE_PATTERN, i18n.t('Pattern')],
                        ].map(([value, label]) => (
                            <Radio
                                key={value}
                                dense
                                label={label}
                                value={value}
                                checked={
                                    (options[OPTION_FILL_TYPE] ||
                                        FILL_TYPE_SOLID) === value
                                }
                                onChange={() =>
                                    setOptions({ [OPTION_FILL_TYPE]: value })
                                }
                            />
                        ))}
                    </Field>
                </div>
            )}
        </div>
    )
}

ColourByControl.propTypes = {
    options: PropTypes.object.isRequired,
    setOption: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    showFill: PropTypes.bool,
    showLegend: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    options: sGetUiOptions(state),
})

const mapDispatchToProps = {
    setOptions: acSetUiOptions,
    setOption: acSetUiOption,
}

export default connect(mapStateToProps, mapDispatchToProps)(ColourByControl)
