import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { COLOR_AUTO } from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'
import ColorPickerPopover from './ColorPickerPopover.jsx'

const SeriesColorButton = ({
    name,
    value,
    color,
    sourceLabel,
    metadataColor,
    onChange,
    onReset,
}) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)

    const renderLabel = () => {
        if (value === COLOR_AUTO) {
            return <span className={styles.autoLabel}>{i18n.t('Auto')}</span>
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
                    ↺
                </button>
            )}
            {open && (
                <ColorPickerPopover
                    reference={ref}
                    metadataColor={metadataColor}
                    value={value}
                    currentColor={color}
                    onChange={onChange}
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
    sourceLabel: PropTypes.string,
    value: PropTypes.string,
    onReset: PropTypes.func,
}

export default SeriesColorButton
