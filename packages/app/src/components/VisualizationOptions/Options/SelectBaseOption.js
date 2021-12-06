import { Checkbox, SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions } from '../../../reducers/ui'
import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'

export const SelectBaseOption = ({
    option,
    label,
    helpText,
    toggleable,
    value,
    onChange,
    disabled,
    dataTest,
}) => {
    const defaultValue = option.defaultValue
    const [checked, setChecked] = useState(value !== defaultValue)
    const selected = option.items.find((item) => item.value === value)?.value
    const onToggle = (checked) => {
        setChecked(checked)

        onChange(checked ? option.items[0].value : defaultValue)
    }

    return (
        <div className={tabSectionOption.className}>
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
            {(!toggleable || checked) && !disabled ? (
                <div
                    className={
                        toggleable ? tabSectionOptionToggleable.className : ''
                    }
                >
                    <SingleSelectField
                        name={`${option.name}-select`}
                        label={toggleable ? '' : label}
                        onChange={({ selected }) => onChange(selected)}
                        selected={selected}
                        helpText={helpText}
                        inputWidth="280px"
                        dense
                        dataTest={`${dataTest}-select`}
                    >
                        {option.items.map(({ value, label }) => (
                            <SingleSelectOption
                                key={value}
                                value={value}
                                label={label}
                                dataTest={`${dataTest}-option`}
                            />
                        ))}
                    </SingleSelectField>
                </div>
            ) : null}
        </div>
    )
}

SelectBaseOption.propTypes = {
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    label: PropTypes.string,
    toggleable: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (value) =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectBaseOption)
