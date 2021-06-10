import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles/VerticalTabBar.module.css'

const VerticalTabBar = ({ children }) => (
    <div className={styles.container}>{children}</div>
)

VerticalTabBar.propTypes = {
    children: PropTypes.node,
}

export default VerticalTabBar
