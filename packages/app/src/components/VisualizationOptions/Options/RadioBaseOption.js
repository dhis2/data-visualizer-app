import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Radio, RadioGroupField } from '@dhis2/ui-core'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

export const RadioBaseOption = ({ option, label, value, onChange }) => (
    <RadioGroupField
        name={option.name}
        value={String(value)}
        onChange={({ value }) => onChange(value)}
        label={label}
        dense
    >
        {option.items.map(({ id, label }) => (
            <Radio key={id} label={label} value={String(id)} />
        ))}
    </RadioGroupField>
)

RadioBaseOption.propTypes = {
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
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
