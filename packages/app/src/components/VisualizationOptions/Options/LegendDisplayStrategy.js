import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'

import { Radio, Field } from '@dhis2/ui'

import LegendSet from './LegendSet'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

export const LEGEND_DISPLAY_STRATEGY_OPTION_NAME = 'legendDisplayStrategy'
export const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM'
export const LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED'

import { tabSectionOptionToggleable } from '../styles/VisualizationOptions.style.js'

const LegendDisplayStrategy = ({ value, onChange }) => (
    <Fragment>
        <Field name={LEGEND_DISPLAY_STRATEGY_OPTION_NAME} dense>
            <Radio
                key={LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}
                label={i18n.t('Use pre-defined legend per data item')}
                value={LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}
                checked={value === LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM}
                onChange={onChange}
                dense
            />
            <Radio
                key={LEGEND_DISPLAY_STRATEGY_FIXED}
                label={i18n.t(
                    'Select a single legend for the entire visualization'
                )}
                value={LEGEND_DISPLAY_STRATEGY_FIXED}
                checked={value === LEGEND_DISPLAY_STRATEGY_FIXED}
                onChange={onChange}
                dense
            />
        </Field>
        {value === LEGEND_DISPLAY_STRATEGY_FIXED ? (
            <div className={tabSectionOptionToggleable.className}>
                <LegendSet />
            </div>
        ) : null}
    </Fragment>
)

LegendDisplayStrategy.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    value: sGetUiOptions(state)[LEGEND_DISPLAY_STRATEGY_OPTION_NAME],
})

const mapDispatchToProps = dispatch => ({
    onChange: ({ value }) =>
        dispatch(
            acSetUiOptions({ [LEGEND_DISPLAY_STRATEGY_OPTION_NAME]: value })
        ),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LegendDisplayStrategy)
