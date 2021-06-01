import React from 'react'
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
    isVerticalType,
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
    isVertical,
}) => {
    const fontSizeOptions = Object.values(getFontSizeOptions(fontStyleKey))
    const textAlignOptions = getTextAlignOptions(
        fontStyleKey,
        isVertical || isVerticalType(visType)
    )

    const onChangeColor = debounce(value => {
        onChange(FONT_STYLE_OPTION_TEXT_COLOR, value)
    }, 100)

    return (
        <div className={styles.container} data-test={dataTest}>
            {fontStyle[FONT_STYLE_OPTION_FONT_SIZE] && (
                <SingleSelect
                    onChange={({ selected }) => {
                        onChange(FONT_STYLE_OPTION_FONT_SIZE, Number(selected))
                    }}
                    selected={(
                        fontStyle[FONT_STYLE_OPTION_FONT_SIZE] || ''
                    ).toString()}
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
            {fontStyle[FONT_STYLE_OPTION_TEXT_ALIGN] && (
                <SingleSelect
                    onChange={({ selected }) => {
                        onChange(FONT_STYLE_OPTION_TEXT_ALIGN, selected)
                    }}
                    selected={fontStyle[FONT_STYLE_OPTION_TEXT_ALIGN]}
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
            {fontStyle[FONT_STYLE_OPTION_TEXT_COLOR] && (
                <label
                    className={cx(styles.textColorLabel, {
                        [styles.disabled]: disabled,
                    })}
                    data-test={`${dataTest}-text-color-picker`}
                >
                    <input
                        type="color"
                        value={fontStyle[FONT_STYLE_OPTION_TEXT_COLOR]}
                        onChange={e => onChangeColor(e.target.value)}
                        className={styles.textColorInput}
                        disabled={disabled}
                    />
                    <div className={styles.textColorIcon}>
                        <FontColorIcon
                            color={fontStyle[FONT_STYLE_OPTION_TEXT_COLOR]}
                        />
                    </div>
                </label>
            )}
            {fontStyle[FONT_STYLE_OPTION_BOLD] != null && (
                <Button
                    icon={<BoldIcon />}
                    onClick={() => {
                        onChange(
                            FONT_STYLE_OPTION_BOLD,
                            !fontStyle[FONT_STYLE_OPTION_BOLD]
                        )
                    }}
                    small
                    secondary
                    toggled={fontStyle[FONT_STYLE_OPTION_BOLD]}
                    disabled={disabled}
                    dataTest={`${dataTest}-bold-toggle`}
                />
            )}
            {fontStyle[FONT_STYLE_OPTION_ITALIC] != null && (
                <Button
                    icon={<ItalicIcon />}
                    onClick={() => {
                        onChange(
                            FONT_STYLE_OPTION_ITALIC,
                            !fontStyle[FONT_STYLE_OPTION_ITALIC]
                        )
                    }}
                    small
                    secondary
                    disabled={disabled}
                    toggled={fontStyle[FONT_STYLE_OPTION_ITALIC]}
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
    isVertical: PropTypes.bool,
    visType: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    fontStyle:
        sGetUiOption(state, {
            id: ownProps.fontStyleKey,
            axisId: ownProps.axisId,
        }) || {},
    visType: sGetUiType(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (option, value) =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.fontStyleKey,
                axisId: ownProps.axisId, //FIXME: Should axisId be listed in propTypes?
                fontStyleOption: option,
                value,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextStyle)
