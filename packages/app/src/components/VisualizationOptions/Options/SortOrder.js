import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'

import { Checkbox, SingleSelectField, SingleSelectOption } from '@dhis2/ui-core'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

import {
    tabSectionOptionItem,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'

import { options } from '../../../modules/options'

const optionName = 'sortOrder'
const defaultValue = options[optionName].defaultValue

const SortOrder = ({ value, onChange }) => {
    const [enabled, setEnabled] = useState(Boolean(value))

    const options = [
        { value: -1, label: i18n.t('Low to high') },
        { value: 1, label: i18n.t('High to low') },
    ]

    const selected = options.find(option => option.value === value) || {}

    const onToggle = checked => {
        setEnabled(checked)

        onChange({
            sortOrder: checked ? -1 : defaultValue,
        })
    }

    return (
        <div className={enabled ? '' : tabSectionOptionItem.className}>
            <Checkbox
                checked={enabled}
                label={i18n.t('Custom sort order')}
                name="sortOrder-toggle"
                onChange={({ checked }) => onToggle(checked)}
                dense
            />
            {enabled ? (
                <div className={tabSectionOptionToggleable.className}>
                    <SingleSelectField
                        name="sortOrder-select"
                        selected={selected}
                        onChange={({ selected }) =>
                            onChange({
                                sortOrder: selected.value,
                            })
                        }
                        inputWidth="280px"
                        dense
                    >
                        {options.map(({ value, label }) => (
                            <SingleSelectOption
                                key={value}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelectField>
                </div>
            ) : null}
        </div>
    )
}

SortOrder.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    value: sGetUiOptions(state)[optionName] || defaultValue,
})

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(acSetUiOptions(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortOrder)
