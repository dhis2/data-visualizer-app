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
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, Field, Help, Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui.js'
import {
    OPTION_COLOR_SET,
    OPTION_LEGEND_DISPLAY_STRATEGY,
    OPTION_LEGEND_SET,
    OPTION_USE_ITEM_COLOR,
} from '../../../modules/options.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import styles from '../styles/VisualizationOptions.module.css'

const ColorSet = ({
    value,
    onChange,
    disabled,
    useItemColor,
    onUseItemColorChange,
    legendActive,
}) => (
    <div className={styles.tabSectionOption}>
        <div className={styles.tabSectionOption}>
            <Checkbox
                checked={useItemColor}
                label={i18n.t('Use configured item color when available')}
                onChange={({ checked }) => onUseItemColorChange(checked)}
                disabled={disabled}
                dense
                dataTest="option-use-item-color"
            />
            <Help>
                {legendActive
                    ? i18n.t(
                          'Legend is currently controlling colors. This setting will apply when legend is turned off.'
                      )
                    : i18n.t(
                          'For data elements and indicators with a color configured in their maintenance settings, use that color instead of the color set below.'
                      )}
            </Help>
        </div>
        <Field name="colorSet-selector" dense>
            {[
                [
                    {
                        id: COLOR_SET_DEFAULT,
                        label: i18n.t('Default'),
                    },
                    {
                        id: COLOR_SET_BASIC,
                        label: i18n.t('Basic'),
                    },
                    {
                        id: COLOR_SET_EXTENDED,
                        label: i18n.t('Extended'),
                    },
                    {
                        id: COLOR_SET_BRIGHT,
                        label: i18n.t('Bright'),
                    },
                    {
                        id: COLOR_SET_DARK,
                        label: i18n.t('Dark'),
                    },
                    {
                        id: COLOR_SET_GRAY,
                        label: i18n.t('Gray'),
                    },
                    {
                        id: COLOR_SET_COLOR_BLIND,
                        label: i18n.t('Color blind'),
                    },
                    {
                        id: COLOR_SET_PATTERNS,
                        label: i18n.t('Patterns'),
                    },
                ].map(({ id, label }) => (
                    <span key={id}>
                        <Radio
                            label={
                                <>
                                    {label}
                                    <ColorSetPreview
                                        colorSet={colorSets[id]}
                                        disabled={disabled}
                                    />
                                </>
                            }
                            value={id}
                            dense
                            onChange={({ value }) => onChange(value)}
                            checked={value === id}
                            disabled={disabled}
                        />
                    </span>
                )),
            ]}
        </Field>
    </div>
)

ColorSet.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onUseItemColorChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    legendActive: PropTypes.bool,
    useItemColor: PropTypes.bool,
}

const ColorSetPreview = ({ colorSet, disabled }) => (
    <div
        style={{
            display: 'flex',
            marginInlineStart: 4,
            opacity: disabled ? 0.3 : 1,
        }}
    >
        {colorSet.patterns?.map((pattern, index) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                key={`pattern-${index}`}
            >
                <defs>
                    <pattern
                        id={`bg${index}`}
                        patternUnits="userSpaceOnUse"
                        width={pattern.width}
                        height={pattern.height}
                    >
                        <path
                            d={pattern.path}
                            stroke={pattern.color}
                            strokeWidth={2}
                            fill="none"
                        />
                    </pattern>
                </defs>
                <rect height="14" width="14" fill={`url(#bg${index})`}></rect>
            </svg>
        ))}
        {colorSet.colors?.map((color) => (
            <div
                key={color}
                style={{ backgroundColor: color, width: 14, height: 14 }}
            />
        ))}
    </div>
)

ColorSetPreview.propTypes = {
    colorSet: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = (state) => {
    const uiOptions = sGetUiOptions(state)
    const strategy = uiOptions[OPTION_LEGEND_DISPLAY_STRATEGY]
    const legendSet = uiOptions[OPTION_LEGEND_SET]
    return {
        value: uiOptions[OPTION_COLOR_SET],
        useItemColor: Boolean(uiOptions[OPTION_USE_ITEM_COLOR]),
        legendActive:
            strategy === LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM ||
            Boolean(legendSet),
    }
}

const mapDispatchToProps = (dispatch) => ({
    onChange: (colorSet) =>
        dispatch(acSetUiOptions({ [OPTION_COLOR_SET]: colorSet })),
    onUseItemColorChange: (checked) =>
        dispatch(acSetUiOptions({ [OPTION_USE_ITEM_COLOR]: checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorSet)
