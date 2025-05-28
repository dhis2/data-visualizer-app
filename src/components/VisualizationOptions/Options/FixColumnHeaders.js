import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_FIX_COLUMN_HEADERS } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const FixColumnHeaders = ({ columnsHasItems }) => (
    <CheckboxBaseOption
        label={i18n.t('Fix column headers to top of table')}
        helpText={
            !columnsHasItems
                ? i18n.t(
                      'There aren’t any column headers because Columns is empty.'
                  )
                : null
        }
        option={{
            name: OPTION_FIX_COLUMN_HEADERS,
        }}
    />
)

FixColumnHeaders.propTypes = {
    columnsHasItems: PropTypes.bool,
}

export default FixColumnHeaders
