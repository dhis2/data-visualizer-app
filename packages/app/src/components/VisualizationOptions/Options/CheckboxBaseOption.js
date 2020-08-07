import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox } from '@dhis2/ui'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'
import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle'

export const CheckboxBaseOption = ({
    option,
    label,
    value,
    onChange,
    inverted,
    fontStyleKey,
}) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={inverted ? !value : value}
            label={label}
            name={option.name}
            onChange={({ checked }) => onChange(inverted ? !checked : checked)}
            dense
        />
        {((!inverted && value) || (inverted && !value)) && fontStyleKey ? (
            <div className={tabSectionOptionToggleable.className}>
                <TextStyle fontStyleKey={fontStyleKey} />
            </div>
        ) : null}
    </div>
)

CheckboxBaseOption.propTypes = {
    fontStyleKey: PropTypes.string,
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
