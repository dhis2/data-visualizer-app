import i18n from '@dhis2/d2-i18n'
import {
    MultiSelect,
    MultiSelectOption,
    SingleSelect,
    SingleSelectOption,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const SinglePeriodSelector = ({ options, selected, onChange, dataTest }) => (
    <SingleSelect
        onChange={onChange}
        selected={selected}
        placeholder={i18n.t('Select a period')}
        dense
        dataTest={dataTest}
    >
        {options.map(option => (
            <SingleSelectOption
                key={option.id}
                value={option.id}
                label={option.getName()}
                dataTest={`${dataTest}-option-${option.id}`}
            />
        ))}
    </SingleSelect>
)

SinglePeriodSelector.propTypes = {
    dataTest: PropTypes.string,
    options: PropTypes.array,
    selected: PropTypes.string,
    onChange: PropTypes.func,
}

const MultiPeriodSelector = ({ options, selected, onChange, dataTest }) => (
    <MultiSelect
        onChange={onChange}
        selected={selected}
        placeholder={i18n.t('Select years')}
        dense
        dataTest={dataTest}
    >
        {options.map(option => (
            <MultiSelectOption
                key={option.id}
                value={option.id}
                label={option.getName()}
                dataTest={`${dataTest}-option-${option.id}`}
            />
        ))}
    </MultiSelect>
)

MultiPeriodSelector.propTypes = {
    dataTest: PropTypes.string,
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
    dataTest: PropTypes.string,
    multiple: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
}

export default YearOverYearSelect
