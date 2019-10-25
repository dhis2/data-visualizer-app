import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

const OperatorSelect = ({ value, onChange }) => (
    <Select displayEmpty={true} value={value} onChange={onChange}>
        {[
            { id: 'EQ', label: '=' },
            { id: 'GT', label: '>' },
            { id: 'GE', label: '>=' },
            { id: 'LT', label: '<' },
            { id: 'LE', label: '<=' },
        ].map(({ id, label }) => (
            <MenuItem key={id} value={id}>
                {label}
            </MenuItem>
        ))}
    </Select>
);

const ValueInput = ({ value, onChange }) => (
    <TextField value={value} type="number" onChange={onChange} />
);

class MeasureCriteria extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            op1: '', // XXX must be the same as default values
            v1: '',
            op2: '',
            v2: '',
        };

        this.state = this.defaultState;
    }

    onClear = () => this.setState(this.defaultState);

    onChange = name => event => {
        this.setState({ [name]: event.target.value }, () => {
            const { op1, v1, op2, v2 } = this.state;
            const value = [];

            if (op1 && v1) {
                value.push(`${op1}:${v1}`);
            }

            if (op2 && v2) {
                value.push(`${op2}:${v2}`);
            }

            if (value.length > 0) {
                this.props.onChange(value.join(';'));
            }
        });
    };

    render() {
        const { op1, v1, op2, v2 } = this.state;

        return (
            <Fragment>
                <p>
                    {i18n.t(
                        'You can set a minimum or maximum value. This will apply to the entire table, all values outside of the minimum/maximum range will not be displayed'
                    )}
                </p>
                <FormLabel component="legend">
                    {i18n.t('Minimum data value')}
                </FormLabel>
                <FormGroup row>
                    <OperatorSelect
                        name="op1"
                        value={op1}
                        onChange={this.onChange('op1')}
                    />
                    <ValueInput
                        name="v1"
                        value={v1}
                        onChange={this.onChange('v1')}
                    />
                </FormGroup>

                <FormLabel component="legend">
                    {i18n.t('Maximum data value')}
                </FormLabel>
                <FormGroup row>
                    <OperatorSelect
                        name="op2"
                        value={op2}
                        onChange={this.onChange('op2')}
                    />
                    <ValueInput
                        name="v2"
                        value={v2}
                        onChange={this.onChange('v2')}
                    />
                </FormGroup>
                <Button variant="outlined" onClick={this.onClear}>
                    {i18n.t('Clear min/max limits')}
                </Button>
            </Fragment>
        );
    }
}

MeasureCriteria.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const mapStateToProps = state => ({
    value: sGetUiOptions(state).measureCriteria || '',
});

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(acSetUiOptions({ measureCriteria: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MeasureCriteria);
