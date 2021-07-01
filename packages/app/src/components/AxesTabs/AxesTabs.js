import PropTypes from 'prop-types'
import React, { useState } from 'react'
import VerticalTab from '../VerticalTabBar/VerticalTab'
import VerticalTabBar from '../VerticalTabBar/VerticalTabBar'
import { tabSectionTitle } from '../VisualizationOptions/styles/VisualizationOptions.style'
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
                <span className={tabSectionTitle.className}>
                    {items[selectedTabIndex].label}
                </span>
                {items[selectedTabIndex].content}
            </div>
            {tabSectionTitle.styles}
        </>
    )
}

AxesTabs.propTypes = {
    dataTest: PropTypes.string,
    items: PropTypes.array,
}

export default AxesTabs
