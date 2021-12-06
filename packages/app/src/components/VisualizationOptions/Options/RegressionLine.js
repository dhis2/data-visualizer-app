import i18n from '@dhis2/d2-i18n'
import { Checkbox, Label } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui'
import { sGetUiOption } from '../../../reducers/ui'
import {
    tabSectionOption,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'
import RegressionLineTitle from './RegressionLineTitle'
import RegressionLineValue from './RegressionLineValue'

export const RegressionLine = ({
    checked,
    onToggle,
    disabled,
    label,
    dataTest,
    fontStyleKey,
    valueId,
    titleId,
    axisId,
    isVertical,
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
                        isVertical={isVertical}
                    />
                </div>
            </div>
        ) : null}
    </div>
)

RegressionLine.propTypes = {
    checked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    axisId: PropTypes.string,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyleKey: PropTypes.string,
    isVertical: PropTypes.bool,
    label: PropTypes.string,
    titleId: PropTypes.string,
    valueId: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
    checked:
        sGetUiOption(state, {
            id: ownProps.enabledId,
            axisId: ownProps.axisId,
        }) || false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onToggle: (checked) =>
        dispatch(
            acSetUiOption({
                optionId: ownProps.enabledId,
                axisId: ownProps.axisId,
                value: checked,
            })
        ),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegressionLine)
