import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui.js'
import { OPTION_OUTLIER_ANALYSIS } from '../../../modules/options.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import styles from '../styles/VisualizationOptions.module.css'
import { DEFAULT_STATE as OUTLIER_METHOD_THRESHOLD_DEFAULT_STATE } from './OutliersForOutlierTable.jsx'

const MIN_VALUE = 1
const MAX_VALUE = 500

export const OUTLIER_MAX_RESULTS_PROP = 'maxResults'
export const DEFAULT_STATE = {
    [OUTLIER_MAX_RESULTS_PROP]: 20,
}

const OutliersMaxResults = () => {
    const dispatch = useDispatch()

    const outlierAnalysis = useSelector(sGetUiOptions)[
        OPTION_OUTLIER_ANALYSIS
    ] || {
        ...OUTLIER_METHOD_THRESHOLD_DEFAULT_STATE,
        ...DEFAULT_STATE,
    }

    const onChange = ({ value }) => {
        const parsedValue = parseInt(value || MIN_VALUE, 10)

        dispatch(
            acSetUiOptions({
                [OPTION_OUTLIER_ANALYSIS]: {
                    ...outlierAnalysis,
                    [OUTLIER_MAX_RESULTS_PROP]:
                        parsedValue > MAX_VALUE
                            ? MAX_VALUE
                            : parsedValue < MIN_VALUE
                            ? MIN_VALUE
                            : Math.round(parsedValue),
                },
            })
        )
    }

    return (
        <div className={styles.tabSectionOption}>
            <div>
                <InputField
                    type="number"
                    label={i18n.t('Max results')}
                    value={outlierAnalysis[
                        OUTLIER_MAX_RESULTS_PROP
                    ]?.toString()}
                    helpText={i18n.t(
                        'The maximum number of outlier values to show in the table. Must be between 1-500.'
                    )}
                    min={MIN_VALUE.toString()}
                    max={MAX_VALUE.toString()}
                    step={'1'}
                    onChange={onChange}
                    inputWidth={'75px'}
                    dense
                    dataTest={'option-outliers-max-result-input'}
                />
            </div>
        </div>
    )
}

export default OutliersMaxResults
