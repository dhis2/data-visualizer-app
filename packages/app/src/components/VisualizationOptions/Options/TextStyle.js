import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { SingleSelect, SingleSelectOption, Button } from '@dhis2/ui'
import {
    getFontSizeOptions,
    getTextAlignOptions,
    defaultFontStyle,
    FONT_STYLE_OPTION_FONT_SIZE,
    FONT_STYLE_OPTION_BOLD,
    FONT_STYLE_OPTION_ITALIC,
    FONT_STYLE_OPTION_TEXT_COLOR,
    FONT_STYLE_OPTION_TEXT_ALIGN,
} from '@dhis2/analytics'

import styles from '../styles/TextStyle.module.css'
import FontColorIcon from '../../../assets/FontColorIcon'
import BoldIcon from '../../../assets/BoldIcon'
import ItalicIcon from '../../../assets/ItalicIcon'

const TextStyle = ({ fontStyle }) => {
    const fontSizeOptions = Object.values(getFontSizeOptions())
    const textAlignOptions = Object.values(getTextAlignOptions())
    const defaultStyle = defaultFontStyle[fontStyle]
    const [fontSize, setFontSize] = useState(
        defaultStyle[FONT_STYLE_OPTION_FONT_SIZE]
    )
    const [textAlign, setTextAlign] = useState(
        defaultStyle[FONT_STYLE_OPTION_TEXT_ALIGN]
    )
    const [textColor, setTextColor] = useState(
        defaultStyle[FONT_STYLE_OPTION_TEXT_COLOR]
    )
    const [bold, setBold] = useState(defaultStyle[FONT_STYLE_OPTION_BOLD])
    const [italic, setItalic] = useState(defaultStyle[FONT_STYLE_OPTION_ITALIC])

    return (
        <div className={styles.container}>
            <SingleSelect
                onChange={({ selected }) => {
                    console.log('size changed to ' + selected)
                    setFontSize(selected)
                }}
                selected={fontSize}
                prefix={i18n.t('Size')}
                dense
                className={styles.fontSizeSelect}
            >
                {fontSizeOptions.map(option => (
                    <SingleSelectOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </SingleSelect>
            <SingleSelect
                onChange={({ selected }) => {
                    console.log('position changed to ' + selected)
                    setTextAlign(selected)
                }}
                selected={textAlign}
                prefix={i18n.t('Position')}
                dense
                className={styles.textAlignSelect}
            >
                {textAlignOptions.map(option => (
                    <SingleSelectOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </SingleSelect>
            <label className={styles.textColorLabel}>
                <input
                    type="color"
                    value={textColor}
                    onChange={e => setTextColor(e.target.value)}
                    className={styles.textColorInput}
                />
                <FontColorIcon color={textColor} />
            </label>
            <Button
                icon={<BoldIcon />}
                value={bold}
                onClick={({ value }) => {
                    setBold(!value)
                }}
                className={bold ? styles.buttonActive : ''}
                small
                secondary
            />
            <Button
                icon={<ItalicIcon />}
                value={italic}
                onClick={({ value }) => {
                    setItalic(!value)
                }}
                className={italic ? styles.buttonActive : ''}
                small
                secondary
            />
        </div>
    )
}

TextStyle.propTypes = {
    fontStyle: PropTypes.string.isRequired,
}

export default TextStyle
