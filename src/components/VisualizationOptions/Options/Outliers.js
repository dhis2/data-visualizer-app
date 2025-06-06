import i18n from '@dhis2/d2-i18n'
import { Checkbox, FieldSet, Help, Legend } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui.js'
import { OPTION_OUTLIER_ANALYSIS } from '../../../modules/options.js'
import { sGetUiOptions } from '../../../reducers/ui.js'
import styles from '../styles/Outliers.module.css'
import optionStyles from '../styles/VisualizationOptions.module.css'
import ExtremeLines from './ExtremeLines.js'
import OutlierDetectionMethod from './OutlierDetectionMethod.js'

const ENABLED_PROP = 'enabled'
const METHOD_PROP = 'outlierMethod'
const THRESHOLD_PROP = 'thresholdFactor'
const EL_ENABLED_PROP = 'enabled'
const EL_VALUE_PROP = 'value'

const METHOD_IQR = 'IQR'
const METHOD_STANDARD_Z_SCORE = 'STANDARD_Z_SCORE'
const METHOD_MODIFIED_Z_SCORE = 'MODIFIED_Z_SCORE'
const methods = [
    {
        id: METHOD_IQR,
        label: i18n.t('Interquartile Range (IQR)'),
        defaultThreshold: 1.5,
    },
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

const DEFAULT_STATE = {
    [ENABLED_PROP]: false,
    [METHOD_PROP]: METHOD_IQR,
    [THRESHOLD_PROP]: 1.5,
    extremeLines: {
        [EL_ENABLED_PROP]: false,
        [EL_VALUE_PROP]: 1,
    },
}

const dataTest = 'option-outliers'

const Outliers = ({ outlierAnalysis, onChange }) => {
    // initialise extremeLines if empty (ie. option saved in Outlier table)
    outlierAnalysis.extremeLines ??= DEFAULT_STATE.extremeLines

    const storeProp = (prop, value) =>
        onChange({ ...outlierAnalysis, [prop]: value })

    const storeExtremeLinesProp = (prop, value) =>
        onChange({
            ...outlierAnalysis,
            extremeLines: {
                ...outlierAnalysis.extremeLines,
                [prop]: value,
            },
        })

    return (
        <div className={optionStyles.tabSectionOption}>
            <div className={optionStyles.tabSectionOption}>
                <Checkbox
                    checked={outlierAnalysis[ENABLED_PROP]}
                    label={i18n.t('Outlier analysis')}
                    onChange={({ checked }) => storeProp(ENABLED_PROP, checked)}
                    dense
                    dataTest={`${dataTest}-enabled-checkbox`}
                />
                <Help>
                    {i18n.t(
                        'Outlier analysis detects and highlights data items that are markedly different from the rest of the data'
                    )}
                </Help>
            </div>
            {outlierAnalysis[ENABLED_PROP] && (
                <>
                    <div
                        className={optionStyles.tabSectionToggleableSubsection}
                    >
                        <div className={optionStyles.tabSectionOption}>
                            <FieldSet>
                                <Legend>
                                    <span
                                        className={optionStyles.tabSectionTitle}
                                    >
                                        {i18n.t('Outlier detection method')}
                                    </span>
                                </Legend>
                                <div className={optionStyles.tabSectionOption}>
                                    <OutlierDetectionMethod
                                        methods={methods}
                                        onMethodChange={(value) =>
                                            onChange({
                                                ...outlierAnalysis,
                                                [METHOD_PROP]: value,
                                                [THRESHOLD_PROP]: methods.find(
                                                    (item) => item.id === value
                                                ).defaultThreshold,
                                            })
                                        }
                                        onThresholdChange={(value) =>
                                            storeProp(THRESHOLD_PROP, value)
                                        }
                                        currentMethodId={
                                            outlierAnalysis[METHOD_PROP]
                                        }
                                        currentThreshold={
                                            outlierAnalysis[THRESHOLD_PROP]
                                        }
                                    />
                                </div>
                            </FieldSet>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div
                        className={optionStyles.tabSectionToggleableSubsection}
                    >
                        <div className={optionStyles.tabSectionOption}>
                            <FieldSet>
                                <Legend>
                                    <span
                                        className={optionStyles.tabSectionTitle}
                                    >
                                        {i18n.t('Extreme lines')}
                                    </span>
                                </Legend>
                                <div className={optionStyles.tabSectionOption}>
                                    <ExtremeLines
                                        isEnabled={
                                            outlierAnalysis.extremeLines[
                                                EL_ENABLED_PROP
                                            ]
                                        }
                                        onEnabledChange={(value) =>
                                            storeExtremeLinesProp(
                                                EL_ENABLED_PROP,
                                                value
                                            )
                                        }
                                        currentValue={
                                            outlierAnalysis.extremeLines[
                                                EL_VALUE_PROP
                                            ]
                                        }
                                        onValueChange={(value) =>
                                            storeExtremeLinesProp(
                                                EL_VALUE_PROP,
                                                value
                                            )
                                        }
                                    />
                                </div>
                            </FieldSet>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

Outliers.propTypes = {
    outlierAnalysis: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    outlierAnalysis:
        sGetUiOptions(state)[OPTION_OUTLIER_ANALYSIS] || DEFAULT_STATE,
})

const mapDispatchToProps = (dispatch) => ({
    onChange: (value) =>
        dispatch(acSetUiOptions({ [OPTION_OUTLIER_ANALYSIS]: value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Outliers)
