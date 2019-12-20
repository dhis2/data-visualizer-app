import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'
import {
    Checkbox,
    FieldSet,
    Legend,
    SingleSelectField,
    SingleSelectOption,
} from '@dhis2/ui-core'
import { useDataEngine } from '@dhis2/app-runtime'

import LegendDisplayStyle from './LegendDisplayStyle'
import LegendDisplayStrategy from './LegendDisplayStrategy'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import {
    tabSection,
    tabSectionOption,
    tabSectionTitle,
} from '../styles/VisualizationOptions.style.js'

const LegendSelect = ({ value, options, onFocus, onChange }) => {
    const selected = value ? { value: value.id, label: value.displayName } : {}

    // TODO add loading/loadingText
    return (
        <SingleSelectField
            name="legendSet-legendSelect"
            label={i18n.t('Select a legend')}
            selected={selected}
            inputWidth="280px"
            placeholder={i18n.t('Select from predefined legends')}
            dense
            onFocus={onFocus}
            onChange={({ selected }) =>
                onChange({
                    legendSet: {
                        id: selected.value,
                        displayName: selected.label,
                    },
                })
            }
        >
            {options.map(({ id, label }) => (
                <SingleSelectOption key={id} value={String(id)} label={label} />
            ))}
        </SingleSelectField>
    )
}

LegendSelect.propTypes = {
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
}

const LegendSetup = ({ value, onChange }) => {
    console.log('legendSetup value', value)
    const engine = useDataEngine()

    const [options, setOptions] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    if (value) {
        if (!options.find(option => option.id === value.id)) {
            setOptions([...options, { id: value.id, label: value.displayName }])
        }
    }

    const onSelectFocus = async () => {
        console.log('select focus')

        if (!isLoaded) {
            const query = {
                legendSets: {
                    resource: 'legendSets.json',
                    params: () => ({
                        fields:
                            'id,displayName~rename(name),legends[id,displayName~rename(name),startValue,endValue,color]',
                        paging: false,
                    }),
                },
            }

            const { legendSets } = await engine.query(query)

            if (legendSets) {
                console.log('legendSets', legendSets)

                const options = legendSets.legendSets.map(legendSet => ({
                    id: legendSet.id,
                    label: legendSet.name,
                }))

                console.log('set option', options)

                setOptions(options)
            }

            setIsLoaded(true)
        }
    }

    return (
        <LegendSelect
            value={value}
            options={options}
            onChange={onChange}
            onFocus={onSelectFocus}
        />
    )
}

LegendSetup.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

const LegendSet = ({ value, legendDisplayStrategy, onChange }) => {
    const [legendSetEnabled, setLegendSetEnabled] = useState(Boolean(value))

    const onCheckboxChange = ({ checked }) => {
        setLegendSetEnabled(checked)

        if (checked && !legendDisplayStrategy) {
            onChange({
                legendDisplayStrategy: 'FIXED',
            })
        } else {
            // XXX reset
            onChange({
                legendSet: undefined,
                legendDisplayStrategy: undefined,
            })
        }
    }

    return (
        <Fragment>
            <Checkbox
                checked={legendSetEnabled}
                label={i18n.t('Display legend')}
                onChange={onCheckboxChange}
                dense
            />
            {legendSetEnabled ? (
                <Fragment>
                    <div className={tabSection.className}>
                        <FieldSet>
                            <Legend>
                                <span className={tabSectionTitle.className}>
                                    {i18n.t('Legend type')}
                                </span>
                            </Legend>
                            <div className={tabSectionOption.className}>
                                <LegendDisplayStrategy />
                            </div>
                        </FieldSet>
                    </div>
                    <div className={tabSection.className}>
                        <FieldSet>
                            <Legend>
                                <span className={tabSectionTitle.className}>
                                    {i18n.t('Legend setup')}
                                </span>
                            </Legend>
                            {legendDisplayStrategy === 'FIXED' ? (
                                <div className={tabSectionOption.className}>
                                    <LegendSetup
                                        value={value}
                                        onChange={onChange}
                                    />
                                </div>
                            ) : null}
                            <LegendDisplayStyle />
                        </FieldSet>
                    </div>
                </Fragment>
            ) : null}
        </Fragment>
    )
}

LegendSet.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    legendDisplayStrategy: PropTypes.string,
}

const mapStateToProps = state => ({
    value: sGetUiOptions(state).legendSet,
    legendDisplayStrategy: sGetUiOptions(state).legendDisplayStrategy,
})

const mapDispatchToProps = dispatch => ({
    onChange: legendSetOptions => dispatch(acSetUiOptions(legendSetOptions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LegendSet)
