import {
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Radio, Field } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui.js'
import { OPTION_LEGEND_DISPLAY_STRATEGY } from '../../../modules/options.js'
import { sGetUiOption } from '../../../reducers/ui.js'
import { tabSectionOptionToggleable } from '../styles/VisualizationOptions.style.js'
import LegendSet from './LegendSet.js'

const LegendDisplayStrategy = ({ value, onChange, disabled }) => (
    <Fragment>
        <Field name={OPTION_LEGEND_DISPLAY_STRATEGY} dense>
            <Radio
                key={LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}
                label={i18n.t('Use pre-defined legend by data item')}
                value={LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}
                disabled={disabled}
                checked={value === LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}
                onChange={onChange}
                dense
                dataTest={`legend-display-strategy-${LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}`}
            />
            <Radio
                key={LEGEND_DISPLAY_STRATEGY_FIXED}
                label={i18n.t('Select a legend')}
                value={LEGEND_DISPLAY_STRATEGY_FIXED}
                disabled={disabled}
                checked={value === LEGEND_DISPLAY_STRATEGY_FIXED}
                onChange={onChange}
                dense
                dataTest={`legend-display-strategy-${LEGEND_DISPLAY_STRATEGY_FIXED}`}
            />
        </Field>
        {value === LEGEND_DISPLAY_STRATEGY_FIXED ? (
            <div className={tabSectionOptionToggleable.className}>
                <LegendSet disabled={disabled} dataTest="fixed-legend-set" />
            </div>
        ) : null}
    </Fragment>
)

LegendDisplayStrategy.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    value: sGetUiOption(state, { id: OPTION_LEGEND_DISPLAY_STRATEGY }),
})

const mapDispatchToProps = (dispatch) => ({
    onChange: ({ value }) =>
        dispatch(
            acSetUiOption({ optionId: OPTION_LEGEND_DISPLAY_STRATEGY, value })
        ),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LegendDisplayStrategy)
