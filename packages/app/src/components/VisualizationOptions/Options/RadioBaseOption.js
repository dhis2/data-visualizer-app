import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Radio, RadioGroupField } from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

import { tabSectionOptionItem } from '../styles/VisualizationOptions.style.js';

export const RadioBaseOption = ({ option, label, value, onChange }) => (
    <RadioGroupField
        name={option.name}
        value={String(value)}
        onChange={(ref, e) => {
            console.log('v', ref, e);
            onChange(ref.value);
        }}
        label={label}
        dense
    >
        {option.items.map(({ id, label }) => (
            <div key={`${id}-div`} className={tabSectionOptionItem.className}>
                <Radio key={id} label={label} value={String(id)} />
            </div>
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
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RadioBaseOption);
