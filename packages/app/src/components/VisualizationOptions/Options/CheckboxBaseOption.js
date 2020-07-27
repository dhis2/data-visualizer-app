import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Checkbox } from '@dhis2/ui'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

export const CheckboxBaseOption = ({
    option,
    label,
    value,
    onChange,
    inverted,
}) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={inverted ? !value : value}
            label={label}
            name={option.name}
            onChange={({ checked }) => onChange(inverted ? !checked : checked)}
            dense
        />
    </div>
)

CheckboxBaseOption.propTypes = {
    inverted: PropTypes.bool,
    label: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name] || false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: checked =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxBaseOption)
