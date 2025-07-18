import i18n from '@dhis2/d2-i18n'
import { Checkbox, Label } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOption } from '../../../actions/ui.js'
import { sGetUiOption } from '../../../reducers/ui.js'
import styles from '../styles/VisualizationOptions.module.css'
import RegressionLineTitle from './RegressionLineTitle.jsx'
import RegressionLineValue from './RegressionLineValue.jsx'

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
    <div className={styles.tabSectionOption}>
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
                className={cx(
                    styles.tabSectionOptionToggleable,
                    styles.tabSectionOptionComplexInline
                )}
            >
                <div style={{ marginRight: '8px' }}>
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
