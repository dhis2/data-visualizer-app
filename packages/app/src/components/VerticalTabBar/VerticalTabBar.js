import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles/VerticalTabBar.module.css'

const VerticalTabBar = ({ children }) => (
    <div className={styles.container}>{children}</div>
)

VerticalTabBar.propTypes = {
    children: PropTypes.node,
}

export default VerticalTabBar
