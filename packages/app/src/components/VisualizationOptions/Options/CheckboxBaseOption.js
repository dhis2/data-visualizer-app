import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Checkbox } from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const CheckboxBaseOption = ({ option, label, value, onChange }) => (
    <Checkbox
        checked={value}
        label={label}
        name={option.name}
        onChange={event => onChange(event.target.checked)}
        dense
    />
)

CheckboxBaseOption.propTypes = {
    label: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name] || false,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: checked =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxBaseOption)
