import { Field, Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions } from '../../../reducers/ui'

export const RadioBaseOption = ({
    option,
    label,
    value,
    onChange,
    disabled,
}) => (
    <Field name={option.name} label={label} dense>
        {option.items.map(({ id, label }) => (
            <Radio
                key={id}
                label={label}
                value={id}
                checked={value === id}
                onChange={({ value }) => onChange(value)}
                disabled={disabled}
                dense
            />
        ))}
    </Field>
)

RadioBaseOption.propTypes = {
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(RadioBaseOption)
