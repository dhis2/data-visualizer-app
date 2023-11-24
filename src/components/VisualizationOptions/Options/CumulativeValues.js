import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { useSelector } from 'react-redux'
import { sGetUiType } from '../../../reducers/ui.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.js'

const CumulativeValues = () => {
    const visType = useSelector(sGetUiType)

    return (
        <CheckboxBaseOption
            label={i18n.t('Cumulative values')}
            helpText={
                visType === VIS_TYPE_PIVOT_TABLE
                    ? i18n.t('Accumulate cell values along rows')
                    : null
            }
            option={{
                name: 'cumulativeValues',
            }}
            dataTest="option-cumulative-values"
        />
    )
}

export default CumulativeValues
