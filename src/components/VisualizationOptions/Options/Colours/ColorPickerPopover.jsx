import i18n from '@dhis2/d2-i18n'
import { Popover } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import {
    COLOR_AUTO,
    getPaletteColors,
    getPaletteLabels,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'

const ColorPickerPopover = ({
    reference,
    metadataColor,
    value,
    onChange,
    onClose,
}) => {
    const labels = getPaletteLabels()
    const hex = value === COLOR_AUTO ? metadataColor : value

    return (
        <Popover
            reference={reference}
            placement="bottom-end"
            arrow={false}
            onClickOutside={onClose}
        >
            <div className={styles.popover}>
                {metadataColor && (
                    <button
                        type="button"
                        className={cx(styles.autoOption, {
                            [styles.autoOptionSelected]: value === COLOR_AUTO,
                        })}
                        onClick={() => onChange(COLOR_AUTO)}
                    >
                        <span
                            className={styles.swatch}
                            style={{ backgroundColor: metadataColor }}
                        />
                        <span>
                            <span className={styles.autoLabel}>
                                {i18n.t('Auto')}
                            </span>
                            {' · '}
                            <span>{i18n.t('Use data item colour')}</span>
                        </span>
                    </button>
                )}
                <div>
                    <div className={styles.popoverSectionTitle}>
                        {i18n.t('Palettes')}
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
                        color={hex || '#000000'}
                        onChange={onChange}
                    />
                    <HexColorInput
                        className={styles.hexInput}
                        color={hex || ''}
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
    metadataColor: PropTypes.string,
    value: PropTypes.string,
}

export default ColorPickerPopover
