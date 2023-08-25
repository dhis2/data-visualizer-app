import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { SelectBaseOption } from './SelectBaseOption.js'

const NumberType = ({ hasCumulativeValuesInPt }) => (
    <SelectBaseOption
        label={i18n.t('Number type')}
        disabled={hasCumulativeValuesInPt}
        helpText={
            hasCumulativeValuesInPt
                ? i18n.t(
                      'Number type is not supported when using cumulative values in PT'
                  )
                : i18n.t('Display the value of percentages of the total')
        }
        option={{
            name: 'numberType',
            items: [
                { value: 'VALUE', label: i18n.t('Value') },
                {
                    value: 'ROW_PERCENTAGE',
                    label: i18n.t('Percentage of row'),
                },
                {
                    value: 'COLUMN_PERCENTAGE',
                    label: i18n.t('Percentage of column'),
                },
            ],
        }}
    />
)

NumberType.propTypes = {
    hasCumulativeValuesInPt: PropTypes.bool,
}

export default NumberType
