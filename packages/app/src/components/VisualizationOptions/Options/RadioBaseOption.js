import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

export const RadioBaseOption = ({
    className,
    row,
    option,
    value,
    onChange,
}) => (
    <FormControl component="fieldset" className={className}>
        <FormLabel>{option.label}</FormLabel>
        <RadioGroup
            row={row}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {option.items.map(({ id, label }) => (
                <FormControlLabel
                    key={id}
                    value={id}
                    control={<Radio />}
                    label={label}
                />
            ))}
        </RadioGroup>
    </FormControl>
);

RadioBaseOption.defaultProps = {
    row: false,
};

RadioBaseOption.propTypes = {
    className: PropTypes.string,
    option: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    row: PropTypes.bool,
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
