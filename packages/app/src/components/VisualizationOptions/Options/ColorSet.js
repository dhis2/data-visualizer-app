import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from '@dhis2/d2-i18n'
import { Field, Radio } from '@dhis2/ui'
import {
    colorSets,
    COLOR_SET_DEFAULT,
    COLOR_SET_BRIGHT,
    COLOR_SET_DARK,
    COLOR_SET_GRAY,
    COLOR_SET_COLOR_BLIND,
    COLOR_SET_MONO_PATTERNS,
} from '@dhis2/analytics'

import { sGetUiOptions } from '../../../reducers/ui'
import { acSetUiOptions } from '../../../actions/ui'

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
                ].map(({ id, label }) => (
                    <span key={id}>
                        <Radio
                            label={
                                <>
                                    {label}
                                    <ColorSetPreview
                                        id={id}
                                        disabled={disabled}
                                    />
                                </>
                            }
                            value={id}
                            dense
                            onChange={onChange}
                            checked={value === id}
                            disabled={disabled}
                        />
                    </span>
                )),
                <span key={COLOR_SET_MONO_PATTERNS}>
                    <Radio
                        label={i18n.t('Mono patterns')}
                        value={COLOR_SET_MONO_PATTERNS}
                        dense
                        onChange={onChange}
                        checked={value === COLOR_SET_MONO_PATTERNS}
                        disabled={disabled}
                    />
                </span>,
            ]}
        </Field>
    </div>
)

ColorSet.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const ColorSetPreview = ({ id, disabled }) => (
    <div
        style={{ display: 'flex', marginLeft: 4, opacity: disabled ? 0.3 : 1 }}
    >
        {colorSets[id].colors.map(color => (
            <div
                key={color}
                style={{ backgroundColor: color, width: 14, height: 14 }}
            ></div>
        ))}
    </div>
)

ColorSetPreview.propTypes = {
    id: PropTypes.string.isRequired,
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
