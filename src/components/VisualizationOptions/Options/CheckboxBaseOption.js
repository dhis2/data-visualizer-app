import { CheckboxField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { tSetUiOptionAndDisabledOptions } from '../../../actions/ui.js'
import { sGetUiOption, sGetUiDisabledOption } from '../../../reducers/ui.js'
import {
    tabSectionOption,
    tabSectionOptionToggleable,
} from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle.js'

export const UnconnectedCheckboxBaseOption = ({
    option,
    helpText,
    label,
    value,
    onChange,
    inverted,
    fontStyleKey,
    dataTest,
    disabled,
}) => (
    <div className={tabSectionOption.className}>
        <CheckboxField
            checked={inverted ? !value : value}
            helpText={helpText}
            label={label}
            name={option.name}
            onChange={({ checked }) => onChange(inverted ? !checked : checked)}
            dense
            dataTest={dataTest}
            disabled={disabled}
        />
        {((!inverted && value) || (inverted && !value)) && fontStyleKey ? (
            <div className={tabSectionOptionToggleable.className}>
                <TextStyle
                    fontStyleKey={fontStyleKey}
                    dataTest={`${dataTest}-text-style`}
                />
            </div>
        ) : null}
    </div>
)

UnconnectedCheckboxBaseOption.propTypes = {
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyleKey: PropTypes.string,
    helpText: PropTypes.string,
    inverted: PropTypes.bool,
    label: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    disabled: Boolean(
        sGetUiDisabledOption(state, ownProps.option) ?? ownProps.disabled
    ),
    helpText:
        sGetUiDisabledOption(state, ownProps.option)?.helpText ||
        ownProps.helpText,
    value: sGetUiOption(state, ownProps.option) || false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (value) => {
        dispatch(
            tSetUiOptionAndDisabledOptions({
                optionId: ownProps.option.id || ownProps.option.name,
                axisId: ownProps.option.axisId,
                value,
            })
        )
    },
})

export const CheckboxBaseOption = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedCheckboxBaseOption)
