import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Checkbox, Box, Input, InputField } from '@dhis2/ui'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'

export const TextBaseOption = ({
    type,
    label,
    placeholder,
    helpText,
    width,
    option,
    value,
    onChange,
    onToggle,
    toggleable,
    checked,
    inline,
    disabled,
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
                            value={value}
                            placeholder={placeholder}
                            dense
                            disabled={disabled}
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
                    />
                )}
            </div>
        ) : null}
    </div>
)

TextBaseOption.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    inline: PropTypes.bool,
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
    value: sGetUiOptions(state)[ownProps.option.name] || '',
    checked: sGetUiOptions(state)[ownProps.option.name] !== undefined,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
    onToggle: checked =>
        dispatch(
            acSetUiOptions({
                [ownProps.option.name]: checked ? '' : undefined,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextBaseOption)
