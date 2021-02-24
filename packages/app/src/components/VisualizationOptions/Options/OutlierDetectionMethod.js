import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import { Field, Radio, InputField, Help } from '@dhis2/ui'

import { sGetUiOption } from '../../../reducers/ui'
import { acSetUiOption } from '../../../actions/ui'
import {
    OPTION_OUTLIER_ANALYSIS_METHOD,
    OPTION_OUTLIER_ANALYSIS_THRESHOLD,
} from '../../../modules/options'
import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

export const ODM_IQR = 'IQR'
export const ODM_STANDARD_Z_SCORE = 'STANDARD_Z_SCORE'
export const ODM_MODIFIED_Z_SCORE = 'MODIFIED_Z_SCORE'
const items = [
    {
        id: ODM_IQR,
        label: i18n.t('Interquartile Range (IQR)'),
        defaultThreshold: 1.5,
    },
    {
        id: ODM_STANDARD_Z_SCORE,
        label: i18n.t('Z-score / Standard score'),
        defaultThreshold: 3,
    },
    {
        id: ODM_MODIFIED_Z_SCORE,
        label: i18n.t('Modified Z-score'),
        defaultThreshold: 3,
    },
]

const OutlierDetectionMethod = ({ method, threshold, onChange }) => (
    <>
        <div className={tabSectionOption.className}>
            <Field dense>
                {items.map(({ id, label }) => (
                    <Radio
                        key={id}
                        label={label}
                        value={id}
                        checked={method === id}
                        onChange={({ value }) => {
                            onChange(OPTION_OUTLIER_ANALYSIS_METHOD, value)
                            onChange(
                                OPTION_OUTLIER_ANALYSIS_THRESHOLD,
                                items.find(item => item.id === value)
                                    .defaultThreshold
                            )
                        }}
                        dense
                    />
                ))}
            </Field>
            <Help>{i18n.t('TODO: Help text goes here')}</Help>
        </div>
        <InputField
            type="number"
            label={i18n.t('Threshold factor')}
            onChange={({ value }) =>
                // FIXME: Replace with steps and min once ui supports it
                onChange(
                    OPTION_OUTLIER_ANALYSIS_THRESHOLD,
                    Number(value) >= 0.5 ? Number(value) : null
                )
            }
            value={threshold?.toString() || ''}
            helpText={i18n.t(
                'A high value is more sensitive so fewer data items will be identified as outliers'
            )}
            placeholder={i18n.t('Value')}
            inputWidth="96px"
            dense
        />
    </>
)

OutlierDetectionMethod.propTypes = {
    method: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    threshold: PropTypes.number,
}

const mapStateToProps = state => ({
    method: sGetUiOption(state, { id: OPTION_OUTLIER_ANALYSIS_METHOD }),
    threshold: sGetUiOption(state, { id: OPTION_OUTLIER_ANALYSIS_THRESHOLD }),
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutlierDetectionMethod)
