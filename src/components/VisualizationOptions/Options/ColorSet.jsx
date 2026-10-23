import {
    colorSets,
    COLOR_SET_DEFAULT,
    COLOR_SET_BASIC,
    COLOR_SET_EXTENDED,
    COLOR_SET_BRIGHT,
    COLOR_SET_DARK,
    COLOR_SET_GRAY,
    COLOR_SET_COLOR_BLIND,
    COLOR_SET_PATTERNS,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Field, Radio } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useId } from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui.js'
import {
    CUSTOM_COLOR_SLOTS,
    getInitialCustomColors,
} from '../../../modules/customColors.js'
import {
    COLOR_SET_CUSTOM,
    OPTION_COLOR_SET,
    OPTION_CUSTOM_COLORS,
} from '../../../modules/options.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import styles from '../styles/ColorSet.module.css'
import tabStyles from '../styles/VisualizationOptions.module.css'
import CustomColors from './CustomColors.jsx'

const PATTERNS = colorSets[COLOR_SET_PATTERNS].patterns

const getColorSetLabels = () => ({
    [COLOR_SET_DEFAULT]: i18n.t('Default'),
    [COLOR_SET_BASIC]: i18n.t('Basic'),
    [COLOR_SET_EXTENDED]: i18n.t('Extended'),
    [COLOR_SET_BRIGHT]: i18n.t('Bright'),
    [COLOR_SET_DARK]: i18n.t('Dark'),
    [COLOR_SET_GRAY]: i18n.t('Gray'),
    [COLOR_SET_COLOR_BLIND]: i18n.t('Color blind'),
    [COLOR_SET_PATTERNS]: i18n.t('Patterns'),
})

const COLOR_SET_IDS = Object.keys(getColorSetLabels())

// Ported from the series colours prototype: a strip of the set's first colours
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

const getPreviewColors = (id) =>
    id === COLOR_SET_PATTERNS
        ? PATTERNS.map(({ color }) => color)
        : colorSets[id].colors.slice(0, CUSTOM_COLOR_SLOTS)

const ColorSet = ({
    value,
    customColors,
    onChange,
    onCustomColorsChange,
    disabled,
}) => {
    const labels = getColorSetLabels()
    const isCustom = value === COLOR_SET_CUSTOM

    const select = (id) => {
        if (id === value) {
            return
        }
        if (id === COLOR_SET_CUSTOM && !customColors) {
            onCustomColorsChange(getInitialCustomColors(value))
        }
        onChange(id)
    }

    const renderCard = ({ id, label, preview, className, children }) => (
        <div
            key={id}
            onClick={() => !disabled && select(id)}
            className={cx(styles.option, className, {
                [styles.optionSelected]: id === value,
                [styles.optionDisabled]: disabled,
            })}
        >
            {preview}
            <Radio
                dense
                name="colorSet-selector"
                label={label}
                value={id}
                checked={id === value}
                disabled={disabled}
                onChange={() => select(id)}
            />
            {children}
        </div>
    )

    return (
        <div className={tabStyles.tabSectionOption}>
            <Field dense>
                <div className={styles.grid} role="radiogroup">
                    {COLOR_SET_IDS.map((id) =>
                        renderCard({
                            id,
                            label: labels[id],
                            preview: (
                                <PalettePreview
                                    colors={getPreviewColors(id)}
                                    pattern={id === COLOR_SET_PATTERNS}
                                />
                            ),
                        })
                    )}
                    {renderCard({
                        id: COLOR_SET_CUSTOM,
                        label: i18n.t('Custom'),
                        className: styles.optionWide,
                        preview: !isCustom && (
                            <PalettePreview
                                colors={
                                    customColors ||
                                    getInitialCustomColors(value)
                                }
                            />
                        ),
                        children: isCustom && customColors && !disabled && (
                            <CustomColors
                                colors={customColors}
                                onChange={onCustomColorsChange}
                            />
                        ),
                    })}
                </div>
            </Field>
        </div>
    )
}

ColorSet.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onCustomColorsChange: PropTypes.func.isRequired,
    customColors: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    value: sGetUiOptions(state)[OPTION_COLOR_SET],
    customColors: sGetUiOptions(state)[OPTION_CUSTOM_COLORS],
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (colorSet) =>
        dispatch(acSetUiOptions({ [OPTION_COLOR_SET]: colorSet })),
    onCustomColorsChange: (colors) =>
        dispatch(acSetUiOptions({ [OPTION_CUSTOM_COLORS]: colors })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorSet)
