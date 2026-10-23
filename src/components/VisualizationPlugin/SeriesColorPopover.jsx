import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import ColorPickerPopover from '../ColorPicker/ColorPickerPopover.jsx'

// PROTOTYPE: colour picker for the series/slice position that was clicked in the chart
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
        <ColorPickerPopover
            reference={reference}
            placement="right"
            title={i18n.t('Series item {{number}}', {
                number: target.index + 1,
            })}
            color={color}
            onChange={onColorChange}
            onClose={() => onClose(color !== target.color)}
        />
    )
}

SeriesColorPopover.propTypes = {
    target: PropTypes.shape({
        color: PropTypes.string.isRequired,
        element: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        preview: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default SeriesColorPopover
