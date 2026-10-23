import i18n from '@dhis2/d2-i18n'
import { Popover } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { CUSTOM_COLOR_SLOTS } from '../../modules/customColors.js'
import styles from '../VisualizationOptions/styles/CustomColors.module.css'

// PROTOTYPE: colour picker for the series/slice that was clicked in the chart
const SeriesColorPopover = ({ target, onChange, onClose }) => {
    const [color, setColor] = useState(target.color)

    // Freeze the position: the clicked graphic is redrawn while previewing
    const reference = useMemo(() => {
        const rect = target.element.getBoundingClientRect()
        return { getBoundingClientRect: () => rect }
    }, [target])

    const onColorChange = (newColor) => {
        setColor(newColor)
        target.preview(newColor)
        onChange(target.index, newColor)
    }

    return (
        <Popover
            reference={reference}
            placement="right"
            arrow={false}
            onClickOutside={() => onClose(color !== target.color)}
        >
            <div className={styles.popover}>
                <div className={styles.popoverTitle}>{target.name}</div>
                <HexColorPicker color={color} onChange={onColorChange} />
                <HexColorInput
                    className={styles.hexInput}
                    color={color}
                    onChange={onColorChange}
                    prefixed
                />
                <div className={styles.popoverHelp}>
                    {i18n.t('Sets custom colour {{number}}', {
                        number: (target.index % CUSTOM_COLOR_SLOTS) + 1,
                    })}
                </div>
            </div>
        </Popover>
    )
}

SeriesColorPopover.propTypes = {
    target: PropTypes.shape({
        color: PropTypes.string.isRequired,
        element: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        preview: PropTypes.func.isRequired,
        name: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default SeriesColorPopover
