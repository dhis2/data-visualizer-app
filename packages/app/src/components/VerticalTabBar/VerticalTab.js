import React from 'react'
import PropTypes from 'prop-types'
import { Label } from '@dhis2/ui'
import cx from 'classnames'

import styles from './styles/VerticalTab.module.css'

const VerticalTab = ({ selected, onClick, children }) => (
    <div
        onClick={onClick}
        className={cx(styles.tab, {
            [styles.selected]: selected,
        })}
    >
        <Label>{children}</Label>
    </div>
)

VerticalTab.propTypes = {
    children: PropTypes.node,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
}

export default VerticalTab
