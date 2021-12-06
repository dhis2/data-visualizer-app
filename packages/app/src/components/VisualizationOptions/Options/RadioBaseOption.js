import { Field, Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption, acSetUiOptions } from '../../../actions/ui.js'
import { sGetUiOption, sGetUiOptions } from '../../../reducers/ui.js'

export const RadioBaseOption = ({
    option,
    label,
    value,
    onChange,
    disabled,
    dataTest,
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
                dataTest={`${dataTest}-option-${id}`}
            />
        ))}
    </Field>
)

RadioBaseOption.propTypes = {
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
    value: ownProps.option.id
        ? sGetUiOption(state, { id: ownProps.option.id })
        : sGetUiOptions(state)[ownProps.option.name],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        ownProps.option.id
            ? dispatch(acSetUiOption({ optionId: ownProps.option.id, value }))
            : dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(RadioBaseOption)
