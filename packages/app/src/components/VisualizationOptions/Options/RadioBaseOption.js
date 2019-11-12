import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Radio, RadioGroupField } from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const RadioBaseOption = ({ option, label, value, onChange }) => (
    <RadioGroupField
        name={option.name}
        value={String(value)}
        onChange={event => onChange(event.target.value)}
        label={label}
        dense
    >
        {option.items.map(({ id, label }) => (
            <Radio key={id} label={label} value={String(id)} dense />
        ))}
    </RadioGroupField>
);

RadioBaseOption.propTypes = {
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: selected =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: selected })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RadioBaseOption);
