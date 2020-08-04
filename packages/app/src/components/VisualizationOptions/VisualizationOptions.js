import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FieldSet, Legend, TabBar, Tab, Help } from '@dhis2/ui'

import {
    tabSection,
    tabSectionTitle,
    tabSectionOption,
    tabSectionOptionItem,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
    tabSectionOptionText,
    tabBar,
} from './styles/VisualizationOptions.style.js'

import {
    sGetUiType,
    sGetUiOptions,
    sGetDimensionItemsByAxis,
} from '../../reducers/ui'
import { getOptionsByType } from '../../modules/options/config'
import {
    isDualAxisType,
    hasCustomAxes,
    AXIS_ID_COLUMNS,
} from '@dhis2/analytics'

export class VisualizationOptions extends Component {
    state = { activeTabKey: undefined }

    selectTab = tabKey => {
        this.setState({ activeTabKey: tabKey })
    }

    generateTabContent = sections =>
        sections.map(({ key, label, content, helpText }) => (
            <div key={key} className={tabSection.className}>
                <FieldSet>
                    {label ? (
                        <Legend>
                            <span className={tabSectionTitle.className}>
                                {label}
                            </span>
                        </Legend>
                    ) : null}
                    {content}
                    {helpText ? (
                        <Legend>
                            <Help className={tabSectionOptionText.className}>
                                {helpText}
                            </Help>
                        </Legend>
                    ) : null}
                </FieldSet>
            </div>
        ))

    generateTabs = tabs =>
        tabs.map(({ key, label, content }) => ({
            key,
            label,
            content: this.generateTabContent(content),
        }))

    render() {
        const { visualizationType, columnDimensionItems, series } = this.props
        const filteredSeries = series.filter(seriesItem =>
            columnDimensionItems.some(
                layoutItem => layoutItem === seriesItem.dimensionItem
            )
        )
        const optionsConfig = getOptionsByType(
            visualizationType,
            isDualAxisType(visualizationType) && hasCustomAxes(filteredSeries)
        )

        const tabs = this.generateTabs(optionsConfig)

        let activeTabIndex = tabs.findIndex(
            tab => tab.key === this.state.activeTabKey
        )

        if (activeTabIndex < 0) {
            activeTabIndex = 0
        }

        return (
            <Fragment>
                <div className={tabBar.className}>
                    <TabBar>
                        {tabs.map(({ key, label }, index) => (
                            <Tab
                                key={key}
                                onClick={() => this.selectTab(key)}
                                selected={index === activeTabIndex}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabBar>
                    {tabBar.styles}
                </div>
                {tabs[activeTabIndex].content}
                {tabSection.styles}
                {tabSectionTitle.styles}
                {tabSectionOption.styles}
                {tabSectionOptionItem.styles}
                {tabSectionOptionToggleable.styles}
                {tabSectionOptionComplexInline.styles}
                {tabSectionOptionText.styles}
            </Fragment>
        )
    }
}

VisualizationOptions.propTypes = {
    visualizationType: PropTypes.string.isRequired,
    columnDimensionItems: PropTypes.array,
    series: PropTypes.object,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    columnDimensionItems: sGetDimensionItemsByAxis(state, AXIS_ID_COLUMNS),
    series: sGetUiOptions(state).series,
})

export default connect(mapStateToProps)(VisualizationOptions)
