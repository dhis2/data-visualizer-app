import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, Label } from '@dhis2/ui'

import { sGetUiOption } from '../../../reducers/ui'
import { acSetUiOption } from '../../../actions/ui'
import RegressionLineValue from './RegressionLineValue'
import RegressionLineTitle from './RegressionLineTitle'

import {
    tabSectionOption,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

const axisId = 'RANGE_0'

export const RegressionLine = ({
    checked,
    onToggle,
    disabled,
    label,
    dataTest,
    fontStyleKey,
    valueId,
    titleId,
}) => (
    <div className={tabSectionOption.className}>
        <Checkbox
            checked={checked}
            label={label}
            name="regressionLine-toggle"
            onChange={({ checked }) => onToggle(checked)}
            dense
            disabled={disabled}
            dataTest={`${dataTest}-checkbox`}
        />
        {checked && !disabled ? (
            <div
                className={`${tabSectionOptionToggleable.className} ${tabSectionOptionComplexInline.className}`}
            >
                <div>
                    <Label>{i18n.t('Value')}</Label>
                    <RegressionLineValue
                        dataTest={`${dataTest}-value`}
                        axisId={axisId}
                        id={valueId}
                    />
                </div>
                <div>
                    <Label>{i18n.t('Title')}</Label>
                    <RegressionLineTitle
                        dataTest={`${dataTest}-label`}
                        axisId={axisId}
                        fontStyleKey={fontStyleKey}
                        id={titleId}
                    />
                </div>
            </div>
        ) : null}
    </div>
)

RegressionLine.propTypes = {
    checked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyleKey: PropTypes.string,
    label: PropTypes.string,
    titleId: PropTypes.string,
    valueId: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
    checked:
        sGetUiOption(state, { axisId, id: ownProps.titleId }) !== undefined,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onToggle: checked =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.titleId,
                axisId,
                value: checked ? '' : undefined,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegressionLine)
