import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

export const CheckboxBaseOption = ({ className, option, value, onChange }) => (
    <FormControlLabel
        className={className}
        control={
            <Checkbox
                checked={value}
                color={'primary'}
                onChange={event => onChange(event.target.checked)}
            />
        }
        label={option.label}
    />
)

CheckboxBaseOption.propTypes = {
    className: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: checked =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxBaseOption)
