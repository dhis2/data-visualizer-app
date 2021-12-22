import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { acSetUiOptions } from '../../../actions/ui.js'
import { sGetSettings } from '../../../reducers/settings.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import { sGetUserAuthorities } from '../../../reducers/user.js'

export const APPROVAL_LEVEL_OPTION_AUTH = 'F_VIEW_UNAPPROVED_DATA'

const optionName = 'approvalLevel'

const query = {
    dataApprovalLevels: {
        resource: 'dataApprovalLevels.json',
        params: {
            order: 'level:asc',
            fields: 'id,displayName~rename(name),level',
            paging: 'false',
        },
    },
}

const ApprovalLevelSelect = ({
    value,
    loading,
    options,
    onFocus,
    onChange,
}) => (
    <SingleSelectField
        name="approvalLevelSelect"
        label={i18n.t('Data approved at level')}
        selected={value?.id}
        inputWidth="280px"
        placeholder={i18n.t('Select from predefined levels')}
        loadingText={i18n.t('Loading data approval levels')}
        loading={loading}
        dense
        onFocus={onFocus}
        onChange={({ selected }) =>
            onChange({
                id: selected,
                displayName: options.find((option) => option.value === selected)
                    .label,
            })
        }
    >
        {options.map(({ value, label }) => (
            <SingleSelectOption key={value} value={value} label={label} />
        ))}
    </SingleSelectField>
)

ApprovalLevelSelect.propTypes = {
    loading: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
}

const ApprovalLevel = ({ value, onChange, enabled }) => {
    const engine = useDataEngine()

    const [options, setOptions] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    if (!enabled) {
        return null
    }

    if (value && value.id) {
        if (!options.find((option) => option.value === value.id)) {
            setOptions([
                ...options,
                { value: value.id, label: value.displayName },
            ])
        }
    }

    const onSelectFocus = async () => {
        if (!isLoaded) {
            const { dataApprovalLevels } = await engine.query(query)

            if (dataApprovalLevels) {
                const options = dataApprovalLevels.dataApprovalLevels.map(
                    (level) => ({
                        value: level.id,
                        label: level.name,
                    })
                )

                setOptions(options)
            }

            setIsLoaded(true)
        }
    }

    return (
        <ApprovalLevelSelect
            loading={!isLoaded}
            value={value}
            options={options}
            onChange={onChange}
            onFocus={onSelectFocus}
        />
    )
}

ApprovalLevel.propTypes = {
    enabled: PropTypes.bool,
    value: PropTypes.object,
    onChange: PropTypes.func,
}

const approvalLevelEnabledSelector = createSelector(
    [sGetSettings, sGetUserAuthorities],
    (settings, authorities) =>
        settings.keyIgnoreAnalyticsApprovalYearThreshold !== -1 &&
        authorities[APPROVAL_LEVEL_OPTION_AUTH]
)

const mapStateToProps = (state) => ({
    enabled: approvalLevelEnabledSelector(state),
    value: sGetUiOptions(state)[optionName] || {},
})

const mapDispatchToProps = (dispatch) => ({
    onChange: ({ id, displayName }) =>
        dispatch(acSetUiOptions({ [optionName]: { id, displayName } })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalLevel)
