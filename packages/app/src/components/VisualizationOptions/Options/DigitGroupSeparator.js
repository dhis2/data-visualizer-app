import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'

import SelectBaseOption from './SelectBaseOption'

import { sGetSettingsDigitGroupSeparator } from '../../../reducers/settings'

const DigitGroupSeparator = ({ defaultValue }) => (
    <SelectBaseOption
        label={i18n.t('Digit group separator')}
        option={{
            name: 'digitGroupSeparator',
            defaultValue,
            items: [
                { value: 'NONE', label: i18n.t('None') },
                { value: 'SPACE', label: i18n.t('Space') },
                { value: 'COMMA', label: i18n.t('Comma') },
            ],
        }}
    />
)

DigitGroupSeparator.propTypes = {
    defaultValue: PropTypes.string,
}

const mapStateToProps = state => ({
    defaultValue: sGetSettingsDigitGroupSeparator(state),
})

export default connect(mapStateToProps)(DigitGroupSeparator)
