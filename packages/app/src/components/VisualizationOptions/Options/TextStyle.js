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
import cx from 'classnames'

import styles from '../styles/TextStyle.module.css'
import FontColorIcon from '../../../assets/FontColorIcon'
import BoldIcon from '../../../assets/BoldIcon'
import ItalicIcon from '../../../assets/ItalicIcon'
import { sGetConsolidatedUiFontStyle } from '../../../reducers/ui'
import { acSetUiFontStyle } from '../../../actions/ui'

const stringToBool = string => string === 'true'

// eslint-disable-next-line no-unused-vars
const TextStyle = ({ fontStyleKey, fontStyle, onChange, disabled }) => {
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
            {fontSize && (
                <SingleSelect
                    onChange={({ selected }) => {
                        setFontSize(Number(selected))
                        onChange(FONT_STYLE_OPTION_FONT_SIZE, Number(selected))
                    }}
                    selected={fontSize.toString()}
                    prefix={i18n.t('Size')}
                    dense
                    className={styles.fontSizeSelect}
                    disabled={disabled}
                >
                    {fontSizeOptions.map(option => (
                        <SingleSelectOption
                            key={option.value?.toString()}
                            value={option.value?.toString()}
                            label={option.label}
                        />
                    ))}
                </SingleSelect>
            )}
            {textAlign && (
                <SingleSelect
                    onChange={({ selected }) => {
                        setTextAlign(selected)
                        onChange(FONT_STYLE_OPTION_TEXT_ALIGN, selected)
                    }}
                    selected={textAlign}
                    prefix={i18n.t('Position')}
                    dense
                    className={styles.textAlignSelect}
                    disabled={disabled}
                >
                    {textAlignOptions.map(option => (
                        <SingleSelectOption
                            key={option.value}
                            value={option.value}
                            label={option.label}
                        />
                    ))}
                </SingleSelect>
            )}
            {textColor && (
                <label
                    className={cx(styles.textColorLabel, {
                        [styles.disabled]: disabled,
                    })}
                >
                    <input
                        type="color"
                        value={textColor}
                        onChange={e => {
                            const value = e.target.value
                            setTextColor(value)
                            onChange(FONT_STYLE_OPTION_TEXT_COLOR, value)
                        }}
                        className={styles.textColorInput}
                        disabled={disabled}
                    />
                    <div className={styles.textColorIcon}>
                        <FontColorIcon color={textColor} />
                    </div>
                </label>
            )}
            {/* TODO: temporary solution, use toggle instead of Button once https://jira.dhis2.org/browse/TECH-392 is implemented in @dhis2/ui */}
            {bold != null && (
                <Button
                    icon={<BoldIcon />}
                    value={bold.toString()}
                    onClick={({ value }) => {
                        setBold(!stringToBool(value))
                        onChange(FONT_STYLE_OPTION_BOLD, !stringToBool(value))
                    }}
                    className={cx({
                        [styles.buttonActive]: bold,
                    })}
                    small
                    secondary
                    disabled={disabled}
                />
            )}
            {italic != null && (
                <Button
                    icon={<ItalicIcon />}
                    value={italic.toString()}
                    onClick={({ value }) => {
                        setItalic(!stringToBool(value))
                        onChange(FONT_STYLE_OPTION_ITALIC, !stringToBool(value))
                    }}
                    className={cx({
                        [styles.buttonActive]: italic,
                    })}
                    small
                    secondary
                    disabled={disabled}
                />
            )}
        </div>
    )
}

TextStyle.propTypes = {
    fontStyleKey: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
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
