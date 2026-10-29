import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui.js'
import { sGetUiOption } from '../../../reducers/ui.js'
import styles from '../styles/VisualizationOptions.module.css'
import { OptionLabel } from './OptionLabel.jsx'

const UnconnectedPositiveNumberBaseType = ({
    label,
    placeholder,
    helpText,
    width,
    option,
    value,
    onChange,
    disabled,
    dataTest,
}) => (
    <div className={styles.tabSectionOption}>
        <div>
            {label ? (
                <OptionLabel htmlFor={option.name} disabled={disabled}>
                    {label}
                </OptionLabel>
            ) : null}
            <InputField
                type="number"
                onChange={({ value }) => {
                    const parsedValue = parseInt(value, 10)
                    parsedValue >= 0
                        ? onChange(Math.round(value))
                        : onChange(parsedValue ? 0 : null)
                }}
                name={option.name}
                value={value || value === 0 ? value.toString() : ''}
                helpText={helpText}
                placeholder={placeholder}
                inputWidth={width}
                dense
                disabled={disabled}
                dataTest={dataTest}
            />
        </div>
    </div>
)

UnconnectedPositiveNumberBaseType.propTypes = {
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    label: PropTypes.string,
    option: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOption(state, ownProps.option),
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
})

export const PositiveNumberBaseType = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedPositiveNumberBaseType)
