import { Checkbox, Box, Input, InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui.js'
import { sGetUiOption, sGetUiDisabledOption } from '../../../reducers/ui.js'
import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle.js'

export const UnconnectedTextBaseOption = ({
    type,
    label,
    placeholder,
    helpText,
    width,
    option,
    value,
    onChange,
    onToggle,
    fontStyleKey,
    toggleable,
    checked,
    inline,
    disabled,
    dataTest,
    isVertical,
}) => (
    <div className={inline ? '' : tabSectionOption.className}>
        {toggleable ? (
            <Checkbox
                checked={checked}
                label={label}
                name={`${option.name}-toggle`}
                onChange={({ checked }) => onToggle(checked)}
                dense
                disabled={disabled}
                dataTest={`${dataTest}-checkbox`}
            />
        ) : null}
        {!toggleable || checked ? (
            <div
                className={
                    toggleable ? tabSectionOptionToggleable.className : ''
                }
            >
                {inline ? (
                    <Box width={width}>
                        <Input
                            type={type}
                            onChange={({ value }) => onChange(value)}
                            name={option.name}
                            value={value.toString()}
                            placeholder={placeholder}
                            dense
                            disabled={disabled}
                            dataTest={`${dataTest}-input`}
                        />
                    </Box>
                ) : (
                    <InputField
                        type={type}
                        label={toggleable ? '' : label}
                        onChange={({ value }) => onChange(value)}
                        name={option.name}
                        value={value}
                        helpText={disabled ? '' : helpText}
                        placeholder={placeholder}
                        inputWidth={width}
                        dense
                        disabled={disabled}
                        dataTest={`${dataTest}-input`}
                    />
                )}
                {fontStyleKey ? (
                    <TextStyle
                        fontStyleKey={fontStyleKey}
                        disabled={disabled}
                        dataTest={`${dataTest}-text-style`}
                        axisId={option.axisId}
                        isVertical={isVertical}
                    />
                ) : null}
            </div>
        ) : null}
    </div>
)

UnconnectedTextBaseOption.defaultProps = {
    option: {},
}

UnconnectedTextBaseOption.propTypes = {
    checked: PropTypes.bool,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyleKey: PropTypes.string,
    helpText: PropTypes.string,
    inline: PropTypes.bool,
    isVertical: PropTypes.bool,
    label: PropTypes.string,
    option: PropTypes.object,
    placeholder: PropTypes.string,
    toggleable: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.string,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    disabled: Boolean(sGetUiDisabledOption(state, ownProps.option)),
    helpText:
        sGetUiDisabledOption(state, ownProps.option)?.helpText ||
        ownProps.helpText,
    value: sGetUiOption(state, ownProps.option) || '',
    checked:
        sGetUiOption(state, {
            id: ownProps.option.enabledId,
            axisId: ownProps.option.axisId,
        }) || false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (value) =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.option.id || ownProps.option.name,
                axisId: ownProps.option.axisId,
                value,
            })
        ),
    onToggle: (checked) =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.option.enabledId,
                axisId: ownProps.option.axisId,
                value: checked,
            })
        ),
})

export const TextBaseOption = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedTextBaseOption)
