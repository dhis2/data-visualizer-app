import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui'
import { OPTION_LEGEND_SET } from '../../../modules/options'
import { sGetUiOption } from '../../../reducers/ui'

const query = {
    legendSets: {
        resource: 'legendSets',
        params: {
            fields: [
                'id',
                'displayName~rename(name)',
                'legends[id,displayName~rename(name),startValue,endValue,color]',
            ],
            paging: 'false',
        },
    },
}

const LegendSetSelect = ({ value, loading, options, onFocus, onChange }) => (
    <SingleSelectField
        name="legendSetSelect"
        label={i18n.t('Legend')}
        selected={value?.id}
        inputWidth="280px"
        placeholder={i18n.t('Select from legends')}
        loadingText={i18n.t('Loading legends')}
        loading={loading}
        dense
        onFocus={onFocus}
        onChange={({ selected }) =>
            onChange({
                id: selected,
                displayName: options.find(option => option.value === selected)
                    .label,
            })
        }
    >
        {options.map(({ value, label }) => (
            <SingleSelectOption key={value} value={value} label={label} />
        ))}
    </SingleSelectField>
)

LegendSetSelect.propTypes = {
    loading: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
}

const LegendSet = ({ value, onChange }) => {
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
        <LegendSetSelect
            loading={!isLoaded}
            value={value}
            options={options}
            onChange={onChange}
            onFocus={onSelectFocus}
        />
    )
}

LegendSet.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
}

const mapStateToProps = state => ({
    value: sGetUiOption(state, { id: OPTION_LEGEND_SET }),
})

const mapDispatchToProps = dispatch => ({
    onChange: ({ id, displayName }) =>
        dispatch(
            acSetUiOption({
                value: { id, displayName },
                optionId: OPTION_LEGEND_SET,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(LegendSet)
