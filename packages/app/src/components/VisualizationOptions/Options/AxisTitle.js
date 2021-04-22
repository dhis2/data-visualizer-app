import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Label, Field, Radio, InputField } from '@dhis2/ui'
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
import { acSetUiOption } from '../../../actions/ui'
import {
    OPTION_AXIS_TITLE,
    OPTION_AXIS_TITLE_ENABLED,
} from '../../../modules/options'

const TITLE_AUTO = 'AUTO'
const TITLE_NONE = 'NONE'
const TITLE_CUSTOM = 'CUSTOM'
const colors = ['#4292c6', '#cb181d', '#41ab5d', '#6c66b8']

const AxisTitle = ({
    disabled,
    axisId,
    fontStyleKey,
    //checked,
    onChange,
    onToggle,
    title,
    hasCustomAxes,
    setTitleColor,
    fontStyle,
}) => {
    const [titleType, setTitleType] = useState(TITLE_NONE)

    const onTypeChange = ({ value }) => {
        setTitleType(value)
        onToggle(value === TITLE_CUSTOM || value === TITLE_AUTO)

        if (value === TITLE_AUTO) {
            onChange(
                i18n.t('Axis {{axisId}}', {
                    axisId: Number(axisId.slice(-1)) + 1,
                })
            )
            if (
                hasCustomAxes &&
                fontStyle[FONT_STYLE_OPTION_TEXT_COLOR] ===
                    defaultFontStyle[fontStyleKey][FONT_STYLE_OPTION_TEXT_COLOR]
            ) {
                setTitleColor(colors[axisId.slice(-1)])
            }
        } else {
            //TODO: Always set title to empty string here?
            onChange()
        }
    }

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
                        onChange={({ value }) => onChange(value)}
                        value={title}
                        placeholder={i18n.t('Add a title')}
                        inputWidth={'280px'}
                        dense
                        disabled={disabled}
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
                </div>
            ) : null}
        </div>
    )
}

AxisTitle.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyle: PropTypes.object,
    fontStyleKey: PropTypes.string,
    hasCustomAxes: PropTypes.bool,
    setTitleColor: PropTypes.func,
    title: PropTypes.string,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    fontStyle:
        sGetUiOption(state, {
            id: ownProps.fontStyleKey,
            axisId: ownProps.axisId,
        }) || {},
    title:
        sGetUiOption(state, {
            axisId: ownProps.axisId,
            id: OPTION_AXIS_TITLE,
        }) || '',
    checked:
        sGetUiOption(state, {
            id: OPTION_AXIS_TITLE_ENABLED,
            axisId: ownProps.axisId,
        }) || false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(
            acSetUiOption({
                optionId: OPTION_AXIS_TITLE,
                axisId: ownProps.axisId,
                value,
            })
        ),
    onToggle: checked =>
        dispatch(
            acSetUiOption({
                optionId: OPTION_AXIS_TITLE_ENABLED,
                axisId: ownProps.axisId,
                value: checked,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(AxisTitle)
