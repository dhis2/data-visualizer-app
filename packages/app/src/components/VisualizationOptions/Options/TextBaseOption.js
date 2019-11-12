import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Checkbox, InputField } from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const TextBaseOption = ({
    className,
    type,
    label,
    placeholder,
    helpText,
    option,
    value,
    onChange,
    onToggle,
    toggleable,
    enabled,
}) => (
    <Fragment>
        {toggleable ? (
            <Checkbox
                checked={enabled}
                label={label}
                name={`${option.name}-toggle`}
                onChange={event => onToggle(event.target.checked)}
                dense
            />
        ) : null}
        {!toggleable || enabled ? (
            <InputField
                className={className}
                type={type}
                label={toggleable ? '' : label}
                onChange={event => onChange(event.target.value)}
                name={option.name}
                value={value}
                helpText={helpText}
                placeholder={placeholder}
                dense
            />
        ) : null}
    </Fragment>
);

TextBaseOption.propTypes = {
    className: PropTypes.string,
    enabled: PropTypes.bool,
    helpText: PropTypes.string,
    label: PropTypes.string,
    option: PropTypes.object,
    placeholder: PropTypes.string,
    toggleable: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name] || '',
    enabled: sGetUiOptions(state)[ownProps.option.name] !== undefined,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: value =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: value })),
    onToggle: checked =>
        dispatch(
            acSetUiOptions({
                [ownProps.option.name]: checked ? '' : undefined,
            })
        ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextBaseOption)
