import {
    colorSets,
    COLOR_SET_DEFAULT,
    COLOR_SET_BRIGHT,
    COLOR_SET_DARK,
    COLOR_SET_GRAY,
    COLOR_SET_COLOR_BLIND,
    COLOR_SET_PATTERNS,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Field, Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acSetUiOptions } from '../../../actions/ui'
import { sGetUiOptions } from '../../../reducers/ui'
import { tabSectionOption } from '../styles/VisualizationOptions.style.js'

export const COLOR_SET_OPTION_NAME = 'colorSet'

const ColorSet = ({ value, onChange, disabled }) => (
    <div className={tabSectionOption.className}>
        <Field name="colorSet-selector" dense>
            {[
                [
                    {
                        id: COLOR_SET_DEFAULT,
                        label: i18n.t('Default'),
                    },
                    {
                        id: COLOR_SET_BRIGHT,
                        label: i18n.t('Bright'),
                    },
                    {
                        id: COLOR_SET_DARK,
                        label: i18n.t('Dark'),
                    },
                    {
                        id: COLOR_SET_GRAY,
                        label: i18n.t('Gray'),
                    },
                    {
                        id: COLOR_SET_COLOR_BLIND,
                        label: i18n.t('Color blind'),
                    },
                    {
                        id: COLOR_SET_PATTERNS,
                        label: i18n.t('Patterns'),
                    },
                ].map(({ id, label }) => (
                    <span key={id}>
                        <Radio
                            label={
                                <>
                                    {label}
                                    <ColorSetPreview
                                        colorSet={colorSets[id]}
                                        disabled={disabled}
                                    />
                                </>
                            }
                            value={id}
                            dense
                            onChange={({ value }) => onChange(value)}
                            checked={value === id}
                            disabled={disabled}
                        />
                    </span>
                )),
            ]}
        </Field>
    </div>
)

ColorSet.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const ColorSetPreview = ({ colorSet, disabled }) => (
    <div
        style={{ display: 'flex', marginLeft: 4, opacity: disabled ? 0.3 : 1 }}
    >
        {colorSet?.patterns &&
            colorSet.patterns.map((pattern, index) => (
                <div key={`pattern-${index}`}>
                    <svg
                        width={14}
                        height={14}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d={pattern.path}
                            stroke={pattern.color}
                            strokeWidth={2}
                            fill="none"
                        />
                    </svg>
                </div>
            ))}
        {colorSet?.colors &&
            colorSet.colors.map(color => (
                <div
                    key={color}
                    style={{ backgroundColor: color, width: 14, height: 14 }}
                />
            ))}
    </div>
)

ColorSetPreview.propTypes = {
    colorSet: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = state => ({
    value: sGetUiOptions(state)[COLOR_SET_OPTION_NAME],
})

const mapDispatchToProps = dispatch => ({
    onChange: colorSet =>
        dispatch(acSetUiOptions({ [COLOR_SET_OPTION_NAME]: colorSet })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorSet)
