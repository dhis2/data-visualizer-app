import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    Checkbox,
    SingleSelectField,
    SingleSelectOption,
} from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import {
    tabSectionOption,
    tabSectionOptionItem,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js';

export const SelectBaseOption = ({
    option,
    label,
    helpText,
    enabled,
    toggleable,
    value,
    onChange,
    onToggle,
}) => {
    const selected = option.items.find(item => item.id === String(value));

    return (
        <Fragment>
            {toggleable ? (
                <div
                    className={
                        enabled
                            ? tabSectionOptionItem.className
                            : tabSectionOption.className
                    }
                >
                    <Checkbox
                        checked={enabled}
                        label={label}
                        name={`${option.name}-toggle`}
                        onChange={({ checked }) => onToggle(checked)}
                        dense
                    />
                </div>
            ) : null}
            {!toggleable || enabled ? (
                <div
                    className={
                        toggleable ? tabSectionOptionToggleable.className : ''
                    }
                >
                    <SingleSelectField
                        name={option.name}
                        label={toggleable ? '' : label}
                        onChange={({ selected }) => onChange(selected.value)}
                        selected={{
                            value: selected.id,
                            label: selected.label,
                        }}
                        helpText={helpText}
                        tabIndex="0"
                        inputMaxWidth="280px"
                        dense
                    >
                        {option.items.map(({ id, label }) => (
                            <SingleSelectOption
                                key={id}
                                value={String(id)}
                                label={label}
                            />
                        ))}
                    </SingleSelectField>
                </div>
            ) : null}
        </Fragment>
    );
};

SelectBaseOption.propTypes = {
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    helpText: PropTypes.string,
    label: PropTypes.string,
    toggleable: PropTypes.bool,
    onToggle: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
    enabled: sGetUiOptions(state)[ownProps.option.name] !== undefined,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
    onToggle: checked =>
        dispatch(
            acSetUiOptions({
                [ownProps.option.name]: checked
                    ? ownProps.option.defaultValue
                    : undefined,
            })
        ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBaseOption)
