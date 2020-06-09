import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Field, FieldGroupFF } from '@dhis2/ui'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

export const RadioBaseOption = ({ option, label, value, onChange }) => (
    <FieldGroupFF
        name={option.name}
        value={value}
        onChange={({ value }) => onChange(value)}
        label={label}
        dense
    >
        {option.items.map(({ id, label }) => (
            <Field type="radio" key={id} label={label} value={id} />
        ))}
    </FieldGroupFF>
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
