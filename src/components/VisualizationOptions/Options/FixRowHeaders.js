import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_FIX_ROW_HEADERS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const FixRowHeaders = ({ rowsHasItems }) => (
    <CheckboxBaseOption
        label={i18n.t('Fix row headers to left of table')}
        helpText={
            !rowsHasItems
                ? i18n.t('There aren’t any row headers because Rows is empty.')
                : null
        }
        option={{
            name: OPTION_FIX_ROW_HEADERS,
        }}
    />
)

FixRowHeaders.propTypes = {
    rowsHasItems: PropTypes.bool,
}

export default FixRowHeaders
