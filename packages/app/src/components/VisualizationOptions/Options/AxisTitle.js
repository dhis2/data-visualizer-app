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
    OPTION_AXIS_TITLE_ENABLED,
} from '../../../modules/options'

const TITLE_AUTO = 'AUTO'
const TITLE_NONE = 'NONE'
const TITLE_CUSTOM = 'CUSTOM'
const colors = ['#4292c6', '#cb181d', '#41ab5d', '#6c66b8']

const AxisTitle = ({
    axisId,
    fontStyleKey,
    enabled,
    onTextChange,
    onEnabledToggle,
    title,
    hasCustomAxes,
    setTitleColor,
    fontStyle,
    setFontStyle,
}) => {
    const titleType = enabled
        ? title || title === ''
            ? TITLE_CUSTOM
            : TITLE_AUTO
        : TITLE_NONE

    const onTypeChange = ({ value: type }) => {
        onEnabledToggle(type === TITLE_CUSTOM || type === TITLE_AUTO)

        if (
            (type === TITLE_AUTO || type === TITLE_CUSTOM) &&
            hasCustomAxes &&
            fontStyle[FONT_STYLE_OPTION_TEXT_COLOR] ===
                defaultFontStyle[fontStyleKey][FONT_STYLE_OPTION_TEXT_COLOR]
        ) {
            setTitleColor(colors[axisId.slice(-1)])
        }
        if (type === TITLE_CUSTOM) {
            onTextChange('Custom')
        } else {
            onTextChange()
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
                    {
                        id: TITLE_AUTO,
                        label: i18n.t('Auto generated'),
                    },
                    { id: TITLE_NONE, label: i18n.t('None') },
                    { id: TITLE_CUSTOM, label: i18n.t('Custom') },
                ].map(({ id, label }) => (
                    <Radio
                        key={id}
                        label={label}
                        value={id}
                        dense
                        onChange={onTypeChange}
                        checked={titleType === id}
                    />
                ))}
            </Field>
            {titleType === TITLE_CUSTOM ? (
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
            {titleType === TITLE_AUTO || titleType === TITLE_CUSTOM ? (
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
    enabled: PropTypes.bool,
    fontStyle: PropTypes.object,
    fontStyleKey: PropTypes.string,
    hasCustomAxes: PropTypes.bool,
    setFontStyle: PropTypes.func,
    setTitleColor: PropTypes.func,
    title: PropTypes.string,
    onEnabledToggle: PropTypes.func,
    onTextChange: PropTypes.func,
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
    enabled:
        sGetUiOption(state, {
            id: OPTION_AXIS_TITLE_ENABLED,
            axisId: ownProps.axisId,
        }) || false,
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
    onEnabledToggle: enabled =>
        dispatch(
            acSetUiOption({
                optionId: OPTION_AXIS_TITLE_ENABLED,
                axisId: ownProps.axisId,
                value: enabled,
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
