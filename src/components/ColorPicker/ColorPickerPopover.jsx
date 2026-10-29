import i18n from '@dhis2/d2-i18n'
import { IconSettings16, Popover } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import styles from './ColorPickerPopover.module.css'

// Generic spectrum like most pickers offer: 12 hues from mid to dark, then greys.
// No white or pale colours: they vanish on the chart's white background.
// prettier-ignore
const SPECTRUM_ROWS = [
    ['#f87171', '#fb923c', '#fbbf24', '#facc15', '#a3e635', '#4ade80', '#2dd4bf', '#22d3ee', '#60a5fa', '#818cf8', '#c084fc', '#f472b6'],
    ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'],
    ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#0d9488', '#0891b2', '#2563eb', '#4f46e5', '#9333ea', '#db2777'],
    ['#b91c1c', '#c2410c', '#b45309', '#a16207', '#4d7c0f', '#15803d', '#0f766e', '#0e7490', '#1d4ed8', '#4338ca', '#7e22ce', '#be185d'],
    ['#991b1b', '#9a3412', '#92400e', '#854d0e', '#3f6212', '#166534', '#115e59', '#155e75', '#1e40af', '#3730a3', '#6b21a8', '#9d174d'],
    ['#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#000000'],
]

// Ported from the series colours prototype, minus the "Auto" options
const ColorPickerPopover = ({
    reference,
    title,
    color,
    placement = 'bottom-start',
    onChange,
    onClose,
    onOpenStyleOptions,
}) => {
    const renderRow = (key, colors) => (
        <div key={key} className={styles.paletteRow}>
            {colors.map((swatchColor) => (
                <button
                    key={swatchColor}
                    type="button"
                    aria-label={swatchColor}
                    className={cx(styles.paletteSwatch, {
                        [styles.paletteSwatchSelected]:
                            swatchColor.toLowerCase() === color?.toLowerCase(),
                    })}
                    style={{ backgroundColor: swatchColor }}
                    onClick={() => onChange(swatchColor)}
                />
            ))}
        </div>
    )

    return (
        <Popover
            reference={reference}
            placement={placement}
            arrow={false}
            onClickOutside={onClose}
        >
            <div className={styles.popover}>
                {(title || onOpenStyleOptions) && (
                    <div className={styles.header}>
                        <span className={styles.title}>{title}</span>
                        {onOpenStyleOptions && (
                            <button
                                type="button"
                                className={styles.iconButton}
                                aria-label={i18n.t('Edit all colours')}
                                title={i18n.t('Edit all colours')}
                                onClick={onOpenStyleOptions}
                            >
                                <IconSettings16 />
                            </button>
                        )}
                    </div>
                )}
                <div>
                    {SPECTRUM_ROWS.map((row, index) => renderRow(index, row))}
                </div>
                <div className={styles.custom}>
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
    onOpenStyleOptions: PropTypes.func,
}

export default ColorPickerPopover
