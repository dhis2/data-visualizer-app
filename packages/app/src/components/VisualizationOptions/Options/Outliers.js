import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, FieldSet, Help, Legend } from '@dhis2/ui'

import { sGetUiOption } from '../../../reducers/ui'
import { acSetUiOption } from '../../../actions/ui'
import {
    tabSectionOptionToggleable,
    tabSectionOption,
    tabSectionTitle,
} from '../styles/VisualizationOptions.style.js'
import OutlierDetectionMethod from './OutlierDetectionMethod'
import ExtremeLines from './ExtremeLines'
import { OPTION_OUTLIER_ANALYSIS_ENABLED } from '../../../modules/options'
import styles from '../styles/Outliers.module.css'

// const DEFAULT_OUTLIER_ANALYSIS = {
//     enabled: false,
//     method: ODM_IQR,
//     thresholdFactor: 1.5,
//     extremeLines: {
//         enabled: false,
//         value: 1,
//     },
// }

const Outliers = ({ enabled, onChange }) => {
    return (
        <div className={tabSectionOption.className}>
            <div className={tabSectionOption.className}>
                <Checkbox
                    checked={enabled}
                    label={i18n.t('Outlier analysis')}
                    onChange={({ checked }) =>
                        onChange(OPTION_OUTLIER_ANALYSIS_ENABLED, checked)
                    }
                    dense
                />
                <Help>
                    {i18n.t(
                        'Outlier analysis detects and highlights data items that are markedly differnt from the rest of the data'
                    )}
                </Help>
            </div>
            {enabled ? (
                <>
                    <div className={tabSectionOptionToggleable.className}>
                        <div className={tabSectionOption.className}>
                            <FieldSet>
                                <Legend>
                                    <span className={tabSectionTitle.className}>
                                        {i18n.t('Outlier detection method')}
                                    </span>
                                </Legend>
                                <div className={tabSectionOption.className}>
                                    <OutlierDetectionMethod />
                                </div>
                            </FieldSet>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={tabSectionOptionToggleable.className}>
                        <div className={tabSectionOption.className}>
                            <FieldSet>
                                <Legend>
                                    <span className={tabSectionTitle.className}>
                                        {i18n.t('Extreme lines')}
                                    </span>
                                </Legend>
                                <div className={tabSectionOption.className}>
                                    <ExtremeLines />
                                </div>
                            </FieldSet>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

Outliers.propTypes = {
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
}

const mapStateToProps = state => ({
    enabled:
        sGetUiOption(state, { id: OPTION_OUTLIER_ANALYSIS_ENABLED }) || false,
})

const mapDispatchToProps = dispatch => ({
    onChange: (optionId, value) =>
        dispatch(
            acSetUiOption({
                optionId,
                value,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Outliers)
