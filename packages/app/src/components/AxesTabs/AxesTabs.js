import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { tabSectionTitle } from '../VisualizationOptions/styles/VisualizationOptions.style'
import VerticalTabBar from '../VerticalTabBar/VerticalTabBar'
import VerticalTab from '../VerticalTabBar/VerticalTab'
import styles from './styles/AxesTabs.module.css'

const AxesTabs = ({ items }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    return (
        <div>
            <div className={styles.tabs}>
                <VerticalTabBar>
                    {items.map(({ label }, index) => (
                        <VerticalTab
                            key={index}
                            onClick={() => setSelectedTabIndex(index)}
                            selected={index === selectedTabIndex}
                        >
                            {label}
                        </VerticalTab>
                    ))}
                </VerticalTabBar>
            </div>
            <div className={styles.content}>
                <span className={tabSectionTitle.className}>
                    {items[selectedTabIndex].label}
                </span>
                {items[selectedTabIndex].content}
            </div>
            {tabSectionTitle.styles}
        </div>
    )
}

AxesTabs.propTypes = {
    items: PropTypes.array,
}

export default AxesTabs
