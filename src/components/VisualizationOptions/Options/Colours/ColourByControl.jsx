import {
    colorSets,
    COLOR_SET_DEFAULT,
    COLOR_SET_PATTERNS,
    hasCustomAxes,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, Field, Radio, SegmentedControl } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useId, useState } from 'react'
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
    getPalettePreviewColors,
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
import { OptionLabel } from '../OptionLabel.jsx'

const MODE_LEGEND = 'LEGEND'

const PATTERNS = colorSets[COLOR_SET_PATTERNS].patterns

// Mirrors how renderSeriesColors draws pattern fills: shape by position, in the palette colour
const PalettePreview = ({ colors, pattern }) => {
    const uid = useId().replace(/:/g, '')

    return (
        <div className={styles.palettePreview} aria-hidden="true">
            {colors.map((color, i) => {
                const shape = PATTERNS[i % PATTERNS.length]
                const patternId = `${uid}-${i}`

                return pattern ? (
                    <svg key={i} width="100%" height="100%">
                        <defs>
                            <pattern
                                id={patternId}
                                patternUnits="userSpaceOnUse"
                                width={shape.width}
                                height={shape.height}
                            >
                                <path
                                    d={shape.path}
                                    stroke={color}
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill={`url(#${patternId})`}
                        />
                    </svg>
                ) : (
                    <span key={i} style={{ background: color }} />
                )
            })}
        </div>
    )
}

PalettePreview.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    pattern: PropTypes.bool,
}

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
    const showPattern =
        showFill && options[OPTION_FILL_TYPE] === FILL_TYPE_PATTERN
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
        { label: i18n.t('Color set'), value: COLOR_MODE_PALETTE },
        ...(showLegend
            ? [{ label: i18n.t('Legend'), value: MODE_LEGEND }]
            : []),
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
                    <OptionLabel>{i18n.t('Color set')}</OptionLabel>
                    <Field dense>
                        <div
                            className={styles.paletteGrid}
                            role="radiogroup"
                            data-test="colour-palette-options"
                        >
                            {paletteIds.map((id) => (
                                <div
                                    key={id}
                                    onClick={() =>
                                        setOptions({
                                            [OPTION_COLOR_PALETTE]: id,
                                        })
                                    }
                                    className={
                                        id === palette
                                            ? `${styles.paletteOption} ${styles.paletteOptionSelected}`
                                            : styles.paletteOption
                                    }
                                >
                                    <PalettePreview
                                        colors={getPalettePreviewColors(id)}
                                        pattern={showPattern}
                                    />
                                    <Radio
                                        dense
                                        name="colour-palette"
                                        label={labels[id]}
                                        value={id}
                                        checked={id === palette}
                                        onChange={() =>
                                            setOptions({
                                                [OPTION_COLOR_PALETTE]: id,
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </Field>
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
                <>
                    <OptionLabel>{i18n.t('Colour')}</OptionLabel>
                    <Field dense>
                        <SeriesColorButton
                            name={i18n.t('all series')}
                            value={singleColor}
                            color={singleColor}
                            onChange={(color) =>
                                setOptions({ [OPTION_SINGLE_COLOR]: color })
                            }
                        />
                    </Field>
                </>
            )}

            {selected !== MODE_LEGEND && showFill && (
                <div className={styles.fill}>
                    <OptionLabel>{i18n.t('Fill')}</OptionLabel>
                    <Field dense>
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
