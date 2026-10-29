import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import {
    COLOR_AUTO,
    COLOR_PALETTE,
    COLOR_SOURCE_AUTO,
    COLOR_SOURCE_PALETTE,
} from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'
import ColorPickerPopover from './ColorPickerPopover.jsx'

const SeriesColorButton = ({
    name,
    value,
    color,
    sourceLabel,
    source,
    metadataColor,
    paletteColor,
    onChange,
    onReset,
}) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)

    // With no override, the option the colour is inherited from shows as selected
    const inheritedOption = {
        [COLOR_SOURCE_AUTO]: COLOR_AUTO,
        [COLOR_SOURCE_PALETTE]: COLOR_PALETTE,
    }[source]

    const renderLabel = () => {
        if (value === COLOR_AUTO) {
            return <span className={styles.autoLabel}>{i18n.t('Auto')}</span>
        }

        if (value === COLOR_PALETTE) {
            return (
                <span className={styles.autoLabel}>{i18n.t('Color set')}</span>
            )
        }

        if (value) {
            return <span className={styles.swatchLabel}>{value}</span>
        }

        return (
            <span
                className={styles.inheritedLabel}
                data-test="series-colour-inherited"
            >
                {sourceLabel}
            </span>
        )
    }

    return (
        <span className={styles.colourCell}>
            <button
                ref={ref}
                type="button"
                data-test="series-colour-button"
                className={styles.swatchButton}
                aria-label={i18n.t('Change colour for {{name}}', { name })}
                onClick={() => setOpen(true)}
            >
                <span
                    className={styles.swatch}
                    style={{ backgroundColor: color }}
                />
                {renderLabel()}
            </button>
            {onReset && value && (
                <button
                    type="button"
                    className={styles.resetButton}
                    aria-label={i18n.t('Reset colour for {{name}}', { name })}
                    title={i18n.t('Reset colour for {{name}}', { name })}
                    onClick={onReset}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M11.5 6a2.5 2.5 0 0 1 0 5H6v1h5.5a3.5 3.5 0 1 0 0-7H2.707l2.647-2.646-.708-.708L.793 5.5l3.853 3.854.708-.708L2.707 6H11.5Z" />
                    </svg>
                </button>
            )}
            {open && (
                <ColorPickerPopover
                    reference={ref}
                    metadataColor={metadataColor}
                    paletteColor={paletteColor}
                    value={value}
                    selectedOption={value || inheritedOption}
                    currentColor={color}
                    onChange={(newColor) =>
                        // Picking the option the colour is already inherited from is not an override
                        newColor === inheritedOption && onReset
                            ? onReset()
                            : onChange(newColor)
                    }
                    onClose={() => setOpen(false)}
                />
            )}
        </span>
    )
}

SeriesColorButton.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    metadataColor: PropTypes.string,
    paletteColor: PropTypes.string,
    source: PropTypes.string,
    sourceLabel: PropTypes.string,
    value: PropTypes.string,
    onReset: PropTypes.func,
}

export default SeriesColorButton
