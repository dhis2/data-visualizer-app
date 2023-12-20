import i18n from '@dhis2/d2-i18n'
import { FieldSet, Legend } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import {
    tabSectionOption,
    tabSectionTitle,
} from '../styles/VisualizationOptions.style.js'
import OutlierDetectionMethod from './OutlierDetectionMethod.js'
import { DEFAULT_STATE as OUTLIER_MAX_RESULTS_DEFAULT_STATE } from './OutliersMaxResults.js'

export const OUTLIER_METHOD_PROP = 'outlierMethod'
export const OUTLIER_THRESHOLD_PROP = 'thresholdFactor'

const OUTLIER_ANALYSIS_OPTION_NAME = 'outlierAnalysis'

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

const Outliers = ({ outlierAnalysis, onChange }) => {
    const storeProp = (prop, value) =>
        onChange({ ...outlierAnalysis, [prop]: value })

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
                        onMethodChange={(value) =>
                            onChange({
                                ...outlierAnalysis,
                                [OUTLIER_METHOD_PROP]: value,
                                [OUTLIER_THRESHOLD_PROP]: methods.find(
                                    (item) => item.id === value
                                ).defaultThreshold,
                            })
                        }
                        onThresholdChange={(value) =>
                            storeProp(OUTLIER_THRESHOLD_PROP, value)
                        }
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

Outliers.propTypes = {
    outlierAnalysis: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    // OutliersMaxResults is part of the root option name, so we need to merge the default states
    outlierAnalysis: sGetUiOptions(state)[OUTLIER_ANALYSIS_OPTION_NAME] || {
        ...DEFAULT_STATE,
        ...OUTLIER_MAX_RESULTS_DEFAULT_STATE,
    },
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (value) =>
        dispatch(acSetUiOptions({ [OUTLIER_ANALYSIS_OPTION_NAME]: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Outliers)
