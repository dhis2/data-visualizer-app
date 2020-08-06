import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import { SingleSelect, SingleSelectOption, Button } from '@dhis2/ui'
import {
    getFontSizeOptions,
    getTextAlignOptions,
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
import { sGetConsolidatedUiFontStyle } from '../../../reducers/ui'
import { acSetUiFontStyle } from '../../../actions/ui'

// eslint-disable-next-line no-unused-vars
const TextStyle = ({ fontStyleKey, fontStyle, onChange }) => {
    const fontSizeOptions = Object.values(getFontSizeOptions())
    const textAlignOptions = Object.values(getTextAlignOptions())
    const [fontSize, setFontSize] = useState(
        fontStyle[FONT_STYLE_OPTION_FONT_SIZE]
    )
    const [textAlign, setTextAlign] = useState(
        fontStyle[FONT_STYLE_OPTION_TEXT_ALIGN]
    )
    const [textColor, setTextColor] = useState(
        fontStyle[FONT_STYLE_OPTION_TEXT_COLOR]
    )
    const [bold, setBold] = useState(fontStyle[FONT_STYLE_OPTION_BOLD])
    const [italic, setItalic] = useState(fontStyle[FONT_STYLE_OPTION_ITALIC])

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
                    onChange={e => {
                        const value = e.target.value
                        setTextColor(value)
                        onChange(FONT_STYLE_OPTION_TEXT_COLOR, value)
                    }}
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
    fontStyleKey: PropTypes.string.isRequired,
    fontStyle: PropTypes.object,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    fontStyle: sGetConsolidatedUiFontStyle(state, ownProps.fontStyleKey),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (option, value) => {
        dispatch(
            acSetUiFontStyle({
                fontStyleKey: ownProps.fontStyleKey,
                option,
                value,
            })
        )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TextStyle)
