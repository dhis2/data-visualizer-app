import i18n from '@dhis2/d2-i18n'
import {
    Button,
    Input,
    Label,
    SingleSelect,
    SingleSelectOption,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions } from '../../../reducers/ui'
import {
    tabSectionOption,
    tabSectionOptionText,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

const OperatorSelect = ({ name, value, onChange }) => {
    const options = [
        { id: 'EQ', label: '=' },
        { id: 'GT', label: '>' },
        { id: 'GE', label: '>=' },
        { id: 'LT', label: '<' },
        { id: 'LE', label: '<=' },
    ]

    return (
        <div style={{ width: '112px' }}>
            <SingleSelect
                name={name}
                onChange={({ selected }) => {
                    onChange(selected)
                }}
                selected={value}
                tabIndex="0"
                inputMaxWidth="106px"
                dense
            >
                {options.map(({ id, label }) => (
                    <SingleSelectOption key={id} value={id} label={label} />
                ))}
            </SingleSelect>
        </div>
    )
}

OperatorSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

const ValueInput = ({ name, value, onChange }) => (
    <Input
        name={name}
        value={value}
        type="number"
        onChange={({ value }) => onChange(value)}
        width="72px"
        dense
    />
)

ValueInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

class MeasureCriteria extends Component {
    constructor(props) {
        super(props)

        this.defaultState = { op1: '', v1: '', op2: '', v2: '' }

        const [op1 = '', v1 = '', op2 = '', v2 = ''] = props.value.split(/[;:]/)

        this.state = { op1, v1, op2, v2 }
    }

    onClear = () => this.setState(this.defaultState, this.props.onChange(''))

    onChange = name => value => {
        this.setState({ [name]: value }, () => {
            const { op1, v1, op2, v2 } = this.state
            const value = []

            if (op1 && v1) {
                value.push(`${op1}:${v1}`)
            }

            if (op2 && v2) {
                value.push(`${op2}:${v2}`)
            }

            this.props.onChange(value.length > 0 ? value.join(';') : '')
        })
    }

    render() {
        const { op1, v1, op2, v2 } = this.state

        return (
            <div className={tabSectionOption.className}>
                <p className={tabSectionOptionText.className}>
                    {i18n.t(
                        'You can set a minimum or maximum value. This will apply to the entire visualization, all values outside of the minimum/maximum range will not be displayed'
                    )}
                </p>
                <div className={tabSectionOptionComplexInline.className}>
                    <div style={{ width: '250px' }}>
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
                    </div>
                    <div style={{ width: '250px' }}>
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
                    </div>
                </div>
                <div style={{ paddingTop: '16px' }}>
                    <Button small onClick={this.onClear}>
                        {i18n.t('Clear min/max limits')}
                    </Button>
                </div>
            </div>
        )
    }
}

MeasureCriteria.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

const mapStateToProps = state => ({
    value: sGetUiOptions(state).measureCriteria || '',
})

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(acSetUiOptions({ measureCriteria: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeasureCriteria)
