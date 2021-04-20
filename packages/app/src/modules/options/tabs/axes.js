import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import { tabSectionTitle } from '../../../components/VisualizationOptions/styles/VisualizationOptions.style'
import VerticalTabBar from '../../../components/VerticalTabBar/VerticalTabBar'
import VerticalTab from '../../../components/VerticalTabBar/VerticalTab'

export default content => ({
    key: 'axes-tab',
    label: i18n.t('Axes'),
    content: [
        {
            key: 'axis-tabs',
            content: React.Children.toArray([
                <AxisTabs items={content} key="tabs" />,
            ]),
        },
    ],
})

const AxisTabs = ({ items }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '200px' }}>
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
            <div>
                <span className={tabSectionTitle.className}>
                    {items[selectedTabIndex].label}
                </span>
                {items[selectedTabIndex].content}
            </div>
            {tabSectionTitle.styles}
        </div>
    )
}

AxisTabs.propTypes = {
    items: PropTypes.array,
}
