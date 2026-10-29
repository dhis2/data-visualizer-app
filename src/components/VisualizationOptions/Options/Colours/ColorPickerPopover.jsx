import i18n from '@dhis2/d2-i18n'
import { Popover } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import {
    COLOR_AUTO,
    COLOR_PALETTE,
    getPaletteColors,
    getPaletteLabels,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'

const ColorPickerPopover = ({
    reference,
    metadataColor,
    paletteColor,
    value,
    selectedOption = value,
    currentColor,
    onChange,
    onClose,
}) => {
    const labels = getPaletteLabels()

    return (
        <Popover
            reference={reference}
            placement="bottom-end"
            arrow={false}
            onClickOutside={onClose}
        >
            <div className={styles.popover}>
                {[
                    {
                        id: COLOR_AUTO,
                        color: metadataColor,
                        label: i18n.t('Auto from data item'),
                    },
                    {
                        id: COLOR_PALETTE,
                        color: paletteColor,
                        label: i18n.t('Auto from color set'),
                    },
                ]
                    .filter(({ color }) => color)
                    .map(({ id, color, label }) => (
                        <button
                            key={id}
                            type="button"
                            aria-pressed={selectedOption === id}
                            disabled={!value && selectedOption === id}
                            data-test={`colour-option-${id.toLowerCase()}`}
                            className={cx(styles.autoOption, {
                                [styles.autoOptionSelected]:
                                    selectedOption === id,
                            })}
                            onClick={() => onChange(id)}
                        >
                            <span
                                className={styles.swatch}
                                style={{ backgroundColor: color }}
                            />
                            <span className={styles.autoLabel}>{label}</span>
                        </button>
                    ))}
                <div>
                    <div className={styles.popoverSectionTitle}>
                        {i18n.t('Color sets')}
                    </div>
                    {PALETTE_IDS.map((paletteId) => (
                        <div
                            key={paletteId}
                            className={styles.paletteRow}
                            title={labels[paletteId]}
                        >
                            {getPaletteColors(paletteId)
                                .slice(0, 12)
                                .map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        aria-label={color}
                                        className={cx(styles.paletteSwatch, {
                                            [styles.paletteSwatchSelected]:
                                                value !== COLOR_AUTO &&
                                                value !== COLOR_PALETTE &&
                                                color.toLowerCase() ===
                                                    value?.toLowerCase(),
                                        })}
                                        style={{ backgroundColor: color }}
                                        onClick={() => onChange(color)}
                                    />
                                ))}
                        </div>
                    ))}
                </div>
                <div className={styles.custom}>
                    <div className={styles.popoverSectionTitle}>
                        {i18n.t('Custom')}
                    </div>
                    <HexColorPicker
                        color={currentColor || '#000000'}
                        onChange={onChange}
                    />
                    <HexColorInput
                        className={styles.hexInput}
                        color={currentColor || ''}
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
    currentColor: PropTypes.string,
    metadataColor: PropTypes.string,
    paletteColor: PropTypes.string,
    selectedOption: PropTypes.string,
    value: PropTypes.string,
}

export default ColorPickerPopover
