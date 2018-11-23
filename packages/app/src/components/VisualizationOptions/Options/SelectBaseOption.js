import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const SelectBaseOption = ({ className, onChange, option, value }) => (
    <FormControl className={className}>
        <InputLabel>{option.label}</InputLabel>
        <Select
            displayEmpty={true}
            onChange={event => onChange(event.target.value)}
            value={value}
        >
            {option.items.map(({ id, label }) => (
                <MenuItem key={id} value={id}>
                    {label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

SelectBaseOption.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    value: sGetUiOptions(state)[ownProps.option.name],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: checked =>
        dispatch(acSetUiOptions({ [ownProps.option.name]: checked })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectBaseOption);
