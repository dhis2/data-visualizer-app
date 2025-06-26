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
import { acSetUiOptions } from '../../../actions/ui.js'
import { OPTION_MEASURE_CRITERIA } from '../../../modules/options.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import styles from '../styles/VisualizationOptions.module.css'

const EQUAL_OPERATOR_ID = 'EQ'
const GREATER_THAN_OPERATOR_ID = 'GT'
const GREATER_THAN_OR_EQUAL_OPERATOR_ID = 'GE'
const LESS_THAN_OPERATOR_ID = 'LT'
const LESS_THAN_OR_EQUAL_OPERATOR_ID = 'LE'
const EMPTY = ''

const MIN_OPERATORS = [
    { id: EQUAL_OPERATOR_ID, label: '=' },
    { id: GREATER_THAN_OPERATOR_ID, label: '>' },
    { id: GREATER_THAN_OR_EQUAL_OPERATOR_ID, label: '>=' },
]

const MAX_OPERATORS = [
    { id: EQUAL_OPERATOR_ID, label: '=' },
    { id: LESS_THAN_OPERATOR_ID, label: '<' },
    { id: LESS_THAN_OR_EQUAL_OPERATOR_ID, label: '<=' },
]

const OperatorSelect = ({ name, value, onChange, operators, dataTest }) => {
    return (
        <div style={{ width: '112px', marginRight: '8px' }}>
            <SingleSelect
                name={name}
                onChange={({ selected }) => {
                    onChange(selected)
                }}
                selected={value}
                tabIndex="0"
                inputMaxWidth="106px"
                dense
                dataTest={dataTest}
            >
                {operators.map(({ id, label }) => (
                    <SingleSelectOption
                        key={id}
                        value={id}
                        label={label}
                        dataTest={`${dataTest}-option`}
                    />
                ))}
            </SingleSelect>
        </div>
    )
}

OperatorSelect.propTypes = {
    name: PropTypes.string.isRequired,
    operators: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
}

const ValueInput = ({ name, value, onChange, dataTest }) => (
    <Input
        name={name}
        value={value}
        type="number"
        onChange={({ value }) => onChange(value)}
        width="72px"
        dense
        dataTest={dataTest}
    />
)

ValueInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
}

class MeasureCriteria extends Component {
    constructor(props) {
        super(props)

        const OP1_DEFAULT = GREATER_THAN_OPERATOR_ID
        const OP2_DEFAULT = LESS_THAN_OPERATOR_ID

        this.defaultState = {
            op1: OP1_DEFAULT,
            v1: EMPTY,
            op2: OP2_DEFAULT,
            v2: EMPTY,
        }

        let [op1 = OP1_DEFAULT, v1 = EMPTY, op2 = OP2_DEFAULT, v2 = EMPTY] =
            typeof props?.value === 'string' ? props.value.split(/[;:]/) : []

        if (
            [LESS_THAN_OPERATOR_ID, LESS_THAN_OR_EQUAL_OPERATOR_ID].includes(
                op1
            )
        ) {
            op2 = op1
            v2 = v1
            op1 = OP1_DEFAULT
            v1 = EMPTY
        }

        this.state = { op1, v1, op2, v2 }
    }

    onClear = () => this.setState(this.defaultState, this.props.onChange(EMPTY))

    onChange = (name) => (value) => {
        this.setState({ [name]: value }, () => {
            const { op1, v1, op2, v2 } = this.state
            const value = []

            if (op1 && v1) {
                value.push(`${op1}:${v1}`)
            }

            if (op2 && v2) {
                value.push(`${op2}:${v2}`)
            }

            this.props.onChange(value.length > 0 ? value.join(';') : EMPTY)
        })
    }

    render() {
        const { op1, v1, op2, v2 } = this.state

        return (
            <div className={styles.tabSectionOption}>
                <p className={styles.tabSectionOptionText}>
                    {i18n.t(
                        'You can set a minimum or maximum value. This will apply to the entire visualization, all values outside of the minimum/maximum range will not be displayed'
                    )}
                </p>
                <div className={styles.tabSectionOptionComplexInline}>
                    <div style={{ width: '250px', marginRight: '8px' }}>
                        <Label>{i18n.t('Minimum data value')}</Label>
                        <div className={styles.tabSectionOptionComplexInline}>
                            <OperatorSelect
                                name="op1"
                                value={op1}
                                onChange={this.onChange('op1')}
                                operators={MIN_OPERATORS}
                                dataTest="measure-critiera-min-operator"
                            />
                            <ValueInput
                                name="v1"
                                value={v1}
                                onChange={this.onChange('v1')}
                                dataTest="measure-critiera-min-value"
                            />
                        </div>
                    </div>
                    <div style={{ width: '250px' }}>
                        <Label>{i18n.t('Maximum data value')}</Label>
                        <div className={styles.tabSectionOptionComplexInline}>
                            <OperatorSelect
                                name="op2"
                                value={op2}
                                onChange={this.onChange('op2')}
                                operators={MAX_OPERATORS}
                                dataTest="measure-critiera-max-operator"
                            />
                            <ValueInput
                                name="v2"
                                value={v2}
                                onChange={this.onChange('v2')}
                                dataTest="measure-critiera-max-value"
                            />
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: '16px' }}>
                    <Button
                        small
                        onClick={this.onClear}
                        dataTest="measure-critiera-clear-button"
                    >
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

const mapStateToProps = (state) => ({
    value: sGetUiOptions(state)[OPTION_MEASURE_CRITERIA] || EMPTY,
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (value) =>
        dispatch(acSetUiOptions({ [OPTION_MEASURE_CRITERIA]: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeasureCriteria)
