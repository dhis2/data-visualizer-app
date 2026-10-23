import i18n from '@dhis2/d2-i18n'
import { Button, Popover } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import styles from '../styles/CustomColors.module.css'

export const CUSTOM_COLOR_SLOTS = 12

const hslToHex = (h, s, l) => {
    const a = s * Math.min(l, 1 - l)
    const f = (n) => {
        const k = (n + h / 30) % 12
        const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(c * 255)
            .toString(16)
            .padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
}

// Golden-angle hue steps from a random start keep neighbouring slots distinct
export const getRandomColors = () => {
    const start = Math.random() * 360
    return Array.from({ length: CUSTOM_COLOR_SLOTS }, (_, i) =>
        hslToHex(
            (start + i * 137.508) % 360,
            0.55 + Math.random() * 0.25,
            0.4 + Math.random() * 0.2
        )
    )
}

const Slot = ({ index, color, onChange }) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                ref={ref}
                type="button"
                className={styles.slot}
                style={{ backgroundColor: color }}
                title={`${index + 1}: ${color}`}
                aria-label={i18n.t('Colour {{number}}', { number: index + 1 })}
                onClick={() => setOpen(!open)}
            >
                <span className={styles.slotNumber}>{index + 1}</span>
            </button>
            {open && (
                <Popover
                    reference={ref}
                    placement="bottom-start"
                    arrow={false}
                    onClickOutside={() => setOpen(false)}
                >
                    <div className={styles.popover}>
                        <HexColorPicker color={color} onChange={onChange} />
                        <HexColorInput
                            className={styles.hexInput}
                            color={color}
                            onChange={onChange}
                            prefixed
                        />
                    </div>
                </Popover>
            )}
        </>
    )
}

Slot.propTypes = {
    color: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

const CustomColors = ({ colors, onChange }) => (
    <div className={styles.container}>
        <div className={styles.slots}>
            {colors.map((color, index) => (
                <Slot
                    key={index}
                    index={index}
                    color={color}
                    onChange={(newColor) =>
                        onChange(
                            colors.map((c, i) => (i === index ? newColor : c))
                        )
                    }
                />
            ))}
        </div>
        <Button small onClick={() => onChange(getRandomColors())}>
            🎲 {i18n.t('Randomise')}
        </Button>
    </div>
)

CustomColors.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default CustomColors
