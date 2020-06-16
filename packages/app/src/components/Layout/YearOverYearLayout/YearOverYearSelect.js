import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import {
    MultiSelect,
    MultiSelectOption,
    SingleSelect,
    SingleSelectOption,
} from '@dhis2/ui'

const SinglePeriodSelector = ({ options, selected, onChange }) => (
    <SingleSelect
        onChange={onChange}
        selected={selected}
        placeholder={i18n.t('Select a period')}
        dense
    >
        {options.map(option => (
            <SingleSelectOption
                key={option.id}
                value={option.id}
                label={option.getName()}
            />
        ))}
    </SingleSelect>
)

SinglePeriodSelector.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.string,
    onChange: PropTypes.func,
}

const MultiPeriodSelector = ({ options, selected, onChange }) => (
    <MultiSelect
        onChange={onChange}
        selected={selected}
        placeholder={i18n.t('Select years')}
        dense
    >
        {options.map(option => (
            <MultiSelectOption
                key={option.id}
                value={option.id}
                label={option.getName()}
            />
        ))}
    </MultiSelect>
)

MultiPeriodSelector.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func,
}

const YearOverYearSelect = ({ multiple, value, ...props }) =>
    multiple === 'true' ? (
        <MultiPeriodSelector selected={value} {...props} />
    ) : (
        <SinglePeriodSelector selected={value} {...props} />
    )

YearOverYearSelect.propTypes = {
    multiple: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
}

export default YearOverYearSelect
