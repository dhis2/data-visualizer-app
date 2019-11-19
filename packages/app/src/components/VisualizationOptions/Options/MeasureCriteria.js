import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import i18n from '@dhis2/d2-i18n';

import {
    Button,
    Field,
    Input,
    Label,
    SingleSelect,
    SingleSelectOption,
} from '@dhis2/ui-core';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

import {
    tabSectionOption,
    tabSectionOptionText,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js';

const OperatorSelect = ({ name, value, onChange }) => {
    const options = [
        { id: 'EQ', label: '=' },
        { id: 'GT', label: '>' },
        { id: 'GE', label: '>=' },
        { id: 'LT', label: '<' },
        { id: 'LE', label: '<=' },
    ];

    const selected = options.find(option => option.id === value);

    return (
        <div style={{ flexBasis: '104px' }}>
            <SingleSelect
                name={name}
                onChange={selected => onChange(selected.value)}
                selected={
                    selected
                        ? {
                              value: selected.id,
                              label: selected.label,
                          }
                        : undefined
                }
                tabIndex="0"
                inputWidth="100px"
                dense
            >
                {options.map(({ id, label }) => (
                    <SingleSelectOption key={id} value={id} label={label} />
                ))}
            </SingleSelect>
        </div>
    );
};

const ValueInput = ({ name, value, onChange }) => (
    <Input
        name={name}
        value={value}
        type="number"
        onChange={event => onChange(event.target.value)}
        inputWidth="72px"
        dense
    />
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

    onClear = () => this.setState(this.defaultState, this.props.onChange(''));

    onChange = name => value => {
        console.log('onchange', value);
        this.setState({ [name]: value }, () => {
            const { op1, v1, op2, v2 } = this.state;
            const value = [];

            if (op1 && v1) {
                value.push(`${op1}:${v1}`);
            }

            if (op2 && v2) {
                value.push(`${op2}:${v2}`);
            }

            this.props.onChange(value.length > 0 ? value.join(';') : '');
        });
    };

    render() {
        const { op1, v1, op2, v2 } = this.state;

        return (
            <div className={tabSectionOption.className}>
                <p className={tabSectionOptionText.className}>
                    {i18n.t(
                        'You can set a minimum or maximum value. This will apply to the entire table, all values outside of the minimum/maximum range will not be displayed'
                    )}
                </p>
                <div className={tabSectionOptionComplexInline.className}>
                    <Field>
                        <Label>{i18n.t('Minimum data value')}</Label>
                        <div
                            className={tabSectionOptionComplexInline.className}
                        >
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
                        </div>
                    </Field>
                    <Field>
                        <Label>{i18n.t('Maximum data value')}</Label>
                        <div
                            className={tabSectionOptionComplexInline.className}
                        >
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
                        </div>
                    </Field>
                </div>
                <Button onClick={this.onClear}>
                    {i18n.t('Clear min/max limits')}
                </Button>
            </div>
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
