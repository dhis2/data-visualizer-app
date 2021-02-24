import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, Help, InputField } from '@dhis2/ui'

import { sGetUiOption } from '../../../reducers/ui'
import { acSetUiOption } from '../../../actions/ui'
import {
    OPTION_OUTLIER_ANALYSIS_EXTREME_LINES_ENABLED,
    OPTION_OUTLIER_ANALYSIS_EXTREME_LINES_VALUE,
} from '../../../modules/options'
import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

const ExtremeLines = ({ enabled, value, onChange }) => (
    <>
        <div className={tabSectionOption.className}>
            <div className={tabSectionOption.className}>
                <Checkbox
                    checked={enabled}
                    label={i18n.t('Extreme lines')}
                    onChange={({ checked }) =>
                        onChange(
                            OPTION_OUTLIER_ANALYSIS_EXTREME_LINES_ENABLED,
                            checked
                        )
                    }
                    dense
                />
                <Help>
                    {i18n.t(
                        'Calculated as a percent, usually 1%, of the total values along an axis'
                    )}
                </Help>
            </div>
            <div className={tabSectionOption.className}>
                <InputField
                    type="number"
                    label={i18n.t('Extreme line % detection')}
                    onChange={input =>
                        onChange(
                            OPTION_OUTLIER_ANALYSIS_EXTREME_LINES_VALUE,
                            input.value
                        )
                    }
                    value={value}
                    placeholder={i18n.t('Value')}
                    inputWidth="96px"
                    dense
                />
            </div>
        </div>
    </>
)

ExtremeLines.propTypes = {
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    enabled: sGetUiOption(state, {
        id: OPTION_OUTLIER_ANALYSIS_EXTREME_LINES_ENABLED,
    }),
    value: sGetUiOption(state, {
        id: OPTION_OUTLIER_ANALYSIS_EXTREME_LINES_VALUE,
    }),
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtremeLines)
