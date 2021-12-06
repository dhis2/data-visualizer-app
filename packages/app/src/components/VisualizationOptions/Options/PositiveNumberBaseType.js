import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui'
import { sGetUiOption } from '../../../reducers/ui'
import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

export const PositiveNumberBaseType = ({
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
    <div className={tabSectionOption.className}>
        <div>
            <InputField
                type="number"
                label={label}
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

PositiveNumberBaseType.propTypes = {
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositiveNumberBaseType)
