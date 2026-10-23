import {
    colorSets,
    COLOR_SET_BASIC,
    COLOR_SET_BRIGHT,
    COLOR_SET_COLOR_BLIND,
    COLOR_SET_DARK,
    COLOR_SET_DEFAULT,
    COLOR_SET_EXTENDED,
    COLOR_SET_GRAY,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Popover } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import styles from './ColorPickerPopover.module.css'

const PALETTE_IDS = [
    COLOR_SET_DEFAULT,
    COLOR_SET_BASIC,
    COLOR_SET_EXTENDED,
    COLOR_SET_BRIGHT,
    COLOR_SET_DARK,
    COLOR_SET_GRAY,
    COLOR_SET_COLOR_BLIND,
]

const getPaletteLabels = () => ({
    [COLOR_SET_DEFAULT]: i18n.t('Default'),
    [COLOR_SET_BASIC]: i18n.t('Basic'),
    [COLOR_SET_EXTENDED]: i18n.t('Extended'),
    [COLOR_SET_BRIGHT]: i18n.t('Bright'),
    [COLOR_SET_DARK]: i18n.t('Dark'),
    [COLOR_SET_GRAY]: i18n.t('Gray'),
    [COLOR_SET_COLOR_BLIND]: i18n.t('Color blind'),
})

// Ported from the series colours prototype, minus the "Auto" options
const ColorPickerPopover = ({
    reference,
    title,
    color,
    placement = 'bottom-start',
    onChange,
    onClose,
}) => {
    const labels = getPaletteLabels()

    return (
        <Popover
            reference={reference}
            placement={placement}
            arrow={false}
            onClickOutside={onClose}
        >
            <div className={styles.popover}>
                {title && <div className={styles.title}>{title}</div>}
                <div>
                    <div className={styles.sectionTitle}>
                        {i18n.t('Color sets')}
                    </div>
                    {PALETTE_IDS.map((paletteId) => (
                        <div
                            key={paletteId}
                            className={styles.paletteRow}
                            title={labels[paletteId]}
                        >
                            {colorSets[paletteId].colors
                                .slice(0, 12)
                                .map((paletteColor) => (
                                    <button
                                        key={paletteColor}
                                        type="button"
                                        aria-label={paletteColor}
                                        className={cx(styles.paletteSwatch, {
                                            [styles.paletteSwatchSelected]:
                                                paletteColor.toLowerCase() ===
                                                color?.toLowerCase(),
                                        })}
                                        style={{
                                            backgroundColor: paletteColor,
                                        }}
                                        onClick={() => onChange(paletteColor)}
                                    />
                                ))}
                        </div>
                    ))}
                </div>
                <div className={styles.custom}>
                    <div className={styles.sectionTitle}>
                        {i18n.t('Custom')}
                    </div>
                    <HexColorPicker
                        color={color || '#000000'}
                        onChange={onChange}
                    />
                    <HexColorInput
                        className={styles.hexInput}
                        color={color || ''}
                        onChange={onChange}
                        prefixed
                    />
                </div>
            </div>
        </Popover>
    )
}

ColorPickerPopover.propTypes = {
    reference: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    color: PropTypes.string,
    placement: PropTypes.string,
    title: PropTypes.string,
}

export default ColorPickerPopover
