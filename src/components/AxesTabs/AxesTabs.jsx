import PropTypes from 'prop-types'
import React, { useState } from 'react'
import VerticalTab from '../VerticalTabBar/VerticalTab.jsx'
import VerticalTabBar from '../VerticalTabBar/VerticalTabBar.jsx'
import tabStyles from '../VisualizationOptions/styles/VisualizationOptions.module.css'
import styles from './styles/AxesTabs.module.css'

const AxesTabs = ({ items, dataTest }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    return (
        <>
            <div className={styles.tabs} data-test={dataTest}>
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
                <span className={tabStyles.tabSectionTitle}>
                    {items[selectedTabIndex].label}
                </span>
                {items[selectedTabIndex].content}
            </div>
        </>
    )
}

AxesTabs.propTypes = {
    dataTest: PropTypes.string,
    items: PropTypes.array,
}

export default AxesTabs
