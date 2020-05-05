import React from 'react'
import PropTypes from 'prop-types'

import { seriesOptions, categoryOptions } from '../../../modules/yearOverYear'

import {
    MultiSelect,
    MultiSelectOption,
    SingleSelect,
    SingleSelectOption,
} from '@dhis2/ui-core'

const SinglePeriodSelector = ({ options, selected, onChange }) => (
    <SingleSelect
        onChange={onChange}
        selected={selected}
        placeholder="Select a period"
        dense
    >
        {options.map(option => (
            <SingleSelectOption
                key={option.id}
                value={option.id}
                label={option.name}
            />
        ))}
    </SingleSelect>
)

SinglePeriodSelector.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.object,
    onChange: PropTypes.func,
}

const MultiPeriodSelector = ({ options, selected, onChange }) => (
    <MultiSelect
        onChange={onChange}
        selected={selected}
        placeholder="Select years"
        dense
    >
        {options.map(option => (
            <MultiSelectOption
                key={option.id}
                value={option.id}
                label={option.name}
            />
        ))}
    </MultiSelect>
)

MultiPeriodSelector.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func,
}

const YearOverYearSelect = ({ multiple, value, ...props }) => {
    if (multiple === 'true') {
        const selected = []

        if (Array.isArray(value)) {
            value.forEach(value =>
                selected.push({
                    value,
                    label: seriesOptions.find(({ id }) => id === value).name,
                })
            )
        }

        return <MultiPeriodSelector selected={selected} {...props} />
    } else {
        const selected = {}

        if (value) {
            selected.value = value
            selected.label = categoryOptions.find(({ id }) => id === value).name
        }

        return <SinglePeriodSelector selected={selected} {...props} />
    }
}

YearOverYearSelect.propTypes = {
    multiple: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
}

export default YearOverYearSelect
