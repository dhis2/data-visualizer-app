import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/VisualizationOptions.module.css'

// Group-level label for an option (e.g. "Chart title"), visually distinct
// from the labels of the choices inside it (radios, checkboxes)
export const OptionLabel = ({
    children,
    htmlFor,
    disabled,
    className,
    dataTest = 'option-label',
}) => (
    <label
        htmlFor={htmlFor}
        className={cx(styles.optionLabel, className, {
            [styles.optionLabelDisabled]: disabled,
        })}
        data-test={dataTest}
    >
        {children}
    </label>
)

OptionLabel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    htmlFor: PropTypes.string,
}
