import i18n from '@dhis2/d2-i18n'
import { FieldSet, Legend } from '@dhis2/ui'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acSetUiDataSorting, acSetUiOptions } from '../../../actions/ui.js'
import { getDefaultSorting } from '../../../modules/ui.js'
import { sGetUi, sGetUiOptions } from '../../../reducers/ui.js'
import {
    tabSectionOption,
    tabSectionTitle,
} from '../styles/VisualizationOptions.style.js'
import OutlierDetectionMethod from './OutlierDetectionMethod.js'
import { DEFAULT_STATE as OUTLIER_MAX_RESULTS_DEFAULT_STATE } from './OutliersMaxResults.js'

export const OUTLIER_METHOD_PROP = 'outlierMethod'
export const OUTLIER_THRESHOLD_PROP = 'thresholdFactor'

export const OUTLIER_ANALYSIS_OPTION_NAME = 'outlierAnalysis'

export const METHOD_STANDARD_Z_SCORE = 'STANDARD_Z_SCORE'
export const METHOD_MODIFIED_Z_SCORE = 'MODIFIED_Z_SCORE'
const methods = [
    {
        id: METHOD_STANDARD_Z_SCORE,
        label: i18n.t('Z-score / Standard score'),
        defaultThreshold: 3,
    },
    {
        id: METHOD_MODIFIED_Z_SCORE,
        label: i18n.t('Modified Z-score'),
        defaultThreshold: 3,
    },
]

export const DEFAULT_STATE = {
    [OUTLIER_METHOD_PROP]: METHOD_MODIFIED_Z_SCORE,
    [OUTLIER_THRESHOLD_PROP]: 3,
}

const Outliers = () => {
    const dispatch = useDispatch()

    let outlierAnalysis =
        useSelector(sGetUiOptions)[OUTLIER_ANALYSIS_OPTION_NAME]

    if (
        !outlierAnalysis ||
        !methods
            .map(({ id }) => id)
            .includes(outlierAnalysis[OUTLIER_METHOD_PROP])
    ) {
        outlierAnalysis = {
            ...OUTLIER_MAX_RESULTS_DEFAULT_STATE,
            ...DEFAULT_STATE,
        }

        dispatch(
            acSetUiOptions({
                [OUTLIER_ANALYSIS_OPTION_NAME]: outlierAnalysis,
            })
        )
    }

    const sorting = useSelector(sGetUi).sorting

    const onMethodChange = (value) => {
        dispatch(
            acSetUiOptions({
                [OUTLIER_ANALYSIS_OPTION_NAME]: {
                    ...outlierAnalysis,
                    [OUTLIER_METHOD_PROP]: value,
                    [OUTLIER_THRESHOLD_PROP]: methods.find(
                        (item) => item.id === value
                    ).defaultThreshold,
                },
            })
        )

        // reset sorting to avoid sorting on non existing column
        // in case the sorting was on a column specific to a method
        if (
            sorting?.dimension &&
            !['value', 'lowerbound', 'upperbound'].includes(sorting.dimension)
        ) {
            dispatch(acSetUiDataSorting(getDefaultSorting()))
        }
    }

    const onThresholdChange = (value) =>
        dispatch(
            acSetUiOptions({
                [OUTLIER_ANALYSIS_OPTION_NAME]: {
                    ...outlierAnalysis,
                    [OUTLIER_THRESHOLD_PROP]: value,
                },
            })
        )

    return (
        <div className={tabSectionOption.className}>
            <FieldSet>
                <Legend>
                    <span className={tabSectionTitle.className}>
                        {i18n.t('Outlier detection method')}
                    </span>
                </Legend>
                <div className={tabSectionOption.className}>
                    <OutlierDetectionMethod
                        methods={methods}
                        onMethodChange={onMethodChange}
                        onThresholdChange={onThresholdChange}
                        currentMethodId={outlierAnalysis[OUTLIER_METHOD_PROP]}
                        currentThreshold={
                            outlierAnalysis[OUTLIER_THRESHOLD_PROP]
                        }
                    />
                </div>
            </FieldSet>
        </div>
    )
}

export default Outliers
