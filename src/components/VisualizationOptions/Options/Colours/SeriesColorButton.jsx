import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { COLOR_AUTO } from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'
import ColorPickerPopover from './ColorPickerPopover.jsx'

const SeriesColorButton = ({ name, value, metadataColor, onChange }) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)
    const isAuto = value === COLOR_AUTO
    const hex = isAuto ? metadataColor : value

    return (
        <>
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
                    style={{ backgroundColor: hex }}
                />
                {isAuto ? (
                    <span className={styles.autoLabel}>{i18n.t('Auto')}</span>
                ) : (
                    <span className={styles.swatchLabel}>{value}</span>
                )}
            </button>
            {open && (
                <ColorPickerPopover
                    reference={ref}
                    metadataColor={metadataColor}
                    value={value}
                    onChange={onChange}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}

SeriesColorButton.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    metadataColor: PropTypes.string,
    value: PropTypes.string,
}

export default SeriesColorButton
