import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Label, Field, Radio, InputField, Button } from '@dhis2/ui'
import { connect } from 'react-redux'
import {
    defaultFontStyle,
    FONT_STYLE_OPTION_TEXT_COLOR,
} from '@dhis2/analytics'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle'
import { sGetUiOption } from '../../../reducers/ui'
import { acSetUiOption, acSetUiOptionFontStyle } from '../../../actions/ui'
import {
    OPTION_AXIS_TITLE,
    OPTION_AXIS_TITLE_TYPE,
} from '../../../modules/options'

const TITLE_AUTO = 'AUTO'
const TITLE_NONE = 'NONE'
const TITLE_CUSTOM = 'CUSTOM'
const colors = ['#4292c6', '#cb181d', '#41ab5d', '#6c66b8']

const AxisTitle = ({
    axisId,
    fontStyleKey,
    type,
    onTextChange,
    onTypeChange,
    title,
    hasCustomAxes,
    setTitleColor,
    fontStyle,
    setFontStyle,
    showAutoOption,
}) => {
    const onRadioChange = ({ value: newType }) => {
        onTypeChange(newType)

        if (
            (newType === TITLE_AUTO || newType === TITLE_CUSTOM) &&
            hasCustomAxes &&
            fontStyle[FONT_STYLE_OPTION_TEXT_COLOR] ===
                defaultFontStyle[fontStyleKey][FONT_STYLE_OPTION_TEXT_COLOR]
        ) {
            setTitleColor(colors[axisId.slice(-1)])
        }
    }

    const resetStyle = () => {
        setFontStyle(
            hasCustomAxes ? { textColor: colors[axisId.slice(-1)] } : {}
        )
    }

    const fontStyleIsDefault = () =>
        Object.keys(fontStyle).every(
            key =>
                ((key !== FONT_STYLE_OPTION_TEXT_COLOR || !hasCustomAxes) &&
                    fontStyle[key] === defaultFontStyle[fontStyleKey][key]) ||
                (key === FONT_STYLE_OPTION_TEXT_COLOR &&
                    hasCustomAxes &&
                    fontStyle[key] === colors[axisId.slice(-1)])
        )

    return (
        <div
            className={tabSectionOption.className}
            data-test={'option-chart-title'}
        >
            <Label>{i18n.t('Axis title')}</Label>
            <Field name="title-selector" dense>
                {[
                    ...(showAutoOption
                        ? [
                              {
                                  id: TITLE_AUTO,
                                  label: i18n.t('Auto generated'),
                              },
                          ]
                        : []),
                    { id: TITLE_NONE, label: i18n.t('None') },
                    { id: TITLE_CUSTOM, label: i18n.t('Custom') },
                ].map(({ id, label }) => (
                    <Radio
                        key={id}
                        label={label}
                        value={id}
                        dense
                        onChange={onRadioChange}
                        checked={type === id}
                    />
                ))}
            </Field>
            {type === TITLE_CUSTOM ? (
                <div className={tabSectionOptionToggleable.className}>
                    <InputField
                        type={'text'}
                        onChange={({ value }) => onTextChange(value)}
                        value={title}
                        placeholder={i18n.t('Add a title')}
                        inputWidth={'280px'}
                        dense
                        dataTest={`${axisId}-axis-title-input`}
                    />
                </div>
            ) : null}
            {type === TITLE_AUTO || type === TITLE_CUSTOM ? (
                <div className={tabSectionOptionToggleable.className}>
                    <TextStyle
                        fontStyleKey={fontStyleKey}
                        dataTest={`${axisId}-axis-title-text-style`}
                        axisId={axisId}
                    />
                    <Button
                        onClick={resetStyle}
                        disabled={fontStyleIsDefault()}
                        small
                    >
                        {i18n.t('Reset style to default')}
                    </Button>
                </div>
            ) : null}
        </div>
    )
}

AxisTitle.propTypes = {
    axisId: PropTypes.string,
    fontStyle: PropTypes.object,
    fontStyleKey: PropTypes.string,
    hasCustomAxes: PropTypes.bool,
    setFontStyle: PropTypes.func,
    setTitleColor: PropTypes.func,
    showAutoOption: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.bool,
    onTextChange: PropTypes.func,
    onTypeChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    fontStyle:
        sGetUiOption(state, {
            id: ownProps.fontStyleKey,
            axisId: ownProps.axisId,
        }) || {},
    title: sGetUiOption(state, {
        axisId: ownProps.axisId,
        id: OPTION_AXIS_TITLE,
    }),
    type:
        sGetUiOption(state, {
            id: OPTION_AXIS_TITLE_TYPE,
            axisId: ownProps.axisId,
        }) || TITLE_NONE,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onTextChange: value =>
        dispatch(
            acSetUiOption({
                optionId: OPTION_AXIS_TITLE,
                axisId: ownProps.axisId,
                value,
            })
        ),
    onTypeChange: type =>
        dispatch(
            acSetUiOption({
                optionId: OPTION_AXIS_TITLE_TYPE,
                axisId: ownProps.axisId,
                value: type,
            })
        ),
    setTitleColor: value =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.fontStyleKey,
                axisId: ownProps.axisId,
                fontStyleOption: FONT_STYLE_OPTION_TEXT_COLOR,
                value,
            })
        ),
    setFontStyle: value =>
        dispatch(
            acSetUiOptionFontStyle({
                optionId: ownProps.fontStyleKey,
                axisId: ownProps.axisId,
                value,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AxisTitle)
