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
import debounce from 'lodash-es/debounce'

import styles from '../styles/TextStyle.module.css'
import FontColorIcon from '../../../assets/FontColorIcon'
import BoldIcon from '../../../assets/BoldIcon'
import ItalicIcon from '../../../assets/ItalicIcon'
import { sGetUiOption, sGetUiType } from '../../../reducers/ui'
import { acSetUiOption } from '../../../actions/ui'

const TextStyle = ({
    fontStyleKey,
    fontStyle,
    visType,
    onChange,
    disabled,
    dataTest,
}) => {
    const fontSizeOptions = Object.values(getFontSizeOptions(fontStyleKey))
    const textAlignOptions = getTextAlignOptions(fontStyleKey, visType)
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

    const onChangeColor = debounce(value => {
        setTextColor(value)
        onChange(FONT_STYLE_OPTION_TEXT_COLOR, value)
    }, 100)

    return (
        <div className={styles.container} data-test={dataTest}>
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
                    dataTest={`${dataTest}-font-size-select`}
                >
                    {fontSizeOptions.map(option => (
                        <SingleSelectOption
                            key={option.value?.toString()}
                            value={option.value?.toString()}
                            label={option.label}
                            dataTest={`${dataTest}-font-size-option-${option.value?.toString()}`}
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
                    dataTest={`${dataTest}-text-align-select`}
                >
                    {textAlignOptions.map(option => (
                        <SingleSelectOption
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            dataTest={`${dataTest}-text-align-option-${option.value?.toString()}`}
                        />
                    ))}
                </SingleSelect>
            )}
            {textColor && (
                <label
                    className={cx(styles.textColorLabel, {
                        [styles.disabled]: disabled,
                    })}
                    data-test={`${dataTest}-text-color-picker`}
                >
                    <input
                        type="color"
                        value={textColor}
                        onChange={e => onChangeColor(e.target.value)}
                        className={styles.textColorInput}
                        disabled={disabled}
                    />
                    <div className={styles.textColorIcon}>
                        <FontColorIcon color={textColor} />
                    </div>
                </label>
            )}
            {bold != null && (
                <Button
                    icon={<BoldIcon />}
                    onClick={() => {
                        onChange(FONT_STYLE_OPTION_BOLD, !bold)
                        setBold(!bold)
                    }}
                    small
                    secondary
                    toggled={bold}
                    disabled={disabled}
                    dataTest={`${dataTest}-bold-toggle`}
                />
            )}
            {italic != null && (
                <Button
                    icon={<ItalicIcon />}
                    onClick={() => {
                        onChange(FONT_STYLE_OPTION_ITALIC, !italic)
                        setItalic(!italic)
                    }}
                    small
                    secondary
                    disabled={disabled}
                    toggled={italic}
                    dataTest={`${dataTest}-italic-toggle`}
                />
            )}
        </div>
    )
}

TextStyle.propTypes = {
    fontStyleKey: PropTypes.string.isRequired,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyle: PropTypes.object,
    visType: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    fontStyle:
        sGetUiOption(state, {
            id: ownProps.fontStyleKey,
        }) || {},
    visType: sGetUiType(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (option, value) =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.fontStyleKey,
                axisId: ownProps.axisId,
                fontStyleOption: option,
                value,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextStyle)
