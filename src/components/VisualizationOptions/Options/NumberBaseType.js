import { Box, Input, InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui.js'
import { sGetUiOption } from '../../../reducers/ui.js'
import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

const NumberBaseType = ({
    label,
    placeholder,
    helpText,
    width,
    option,
    value,
    onChange,
    inline,
    disabled,
    dataTest,
}) => (
    <div className={inline ? '' : tabSectionOption.className}>
        <div>
            {inline ? (
                <Box width={width}>
                    <Input
                        type="number"
                        onChange={({ value }) => onChange(value)}
                        name={option.name}
                        value={value?.toString() || ''}
                        placeholder={placeholder}
                        dense
                        disabled={disabled}
                        dataTest={`${dataTest}-input`}
                    />
                </Box>
            ) : (
                <InputField
                    type="number"
                    label={label}
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
        </div>
    </div>
)

NumberBaseType.propTypes = {
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    option: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    width: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOption(state, ownProps.option),
    checked: sGetUiOption(state, ownProps.option) !== undefined,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (value) =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.option.id || ownProps.option.name,
                axisId: ownProps.option.axisId,
                value: value !== '' ? Number(value) : value,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(NumberBaseType)
