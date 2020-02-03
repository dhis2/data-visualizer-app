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

const LegendSelect = ({ value, loading, options, onFocus, onChange }) => {
    const selected =
        value && value.id ? { value: value.id, label: value.displayName } : {}

    return (
        <SingleSelectField
            name="legendSet-legendSelect"
            label={i18n.t('Select a legend')}
            selected={selected}
            inputWidth="280px"
            placeholder={i18n.t('Select from predefined legends')}
            loadingText={i18n.t('Loading legends')}
            loading={loading}
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
            {options.map(({ value, label }) => (
                <SingleSelectOption key={value} value={value} label={label} />
            ))}
        </SingleSelectField>
    )
}

LegendSelect.propTypes = {
    loading: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
}

const LegendSetup = ({ value, onChange }) => {
    const engine = useDataEngine()

    const [options, setOptions] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    if (value && value.id) {
        if (!options.find(option => option.value === value.id)) {
            setOptions([
                ...options,
                { value: value.id, label: value.displayName },
            ])
        }
    }

    const onSelectFocus = async () => {
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
                const options = legendSets.legendSets.map(legendSet => ({
                    value: legendSet.id,
                    label: legendSet.name,
                }))

                setOptions(options)
            }

            setIsLoaded(true)
        }
    }

    return (
        <LegendSelect
            loading={!isLoaded}
            value={value}
            options={options}
            onChange={onChange}
            onFocus={onSelectFocus}
        />
    )
}

LegendSetup.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}

const LegendSet = ({ value, legendDisplayStrategy, onChange }) => {
    const [legendSetEnabled, setLegendSetEnabled] = useState(Boolean(value.id))

    const onCheckboxChange = ({ checked }) => {
        setLegendSetEnabled(checked)

        if (checked && !legendDisplayStrategy) {
            onChange({
                legendDisplayStrategy: 'FIXED',
            })
        } else {
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
    value: sGetUiOptions(state).legendSet || {},
    legendDisplayStrategy: sGetUiOptions(state).legendDisplayStrategy,
})

const mapDispatchToProps = dispatch => ({
    onChange: legendSetOptions => dispatch(acSetUiOptions(legendSetOptions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LegendSet)
