import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FieldSet, Legend, TabBar, Tab, Help } from '@dhis2/ui'

import {
    tabSection,
    tabSectionTitle,
    tabSectionTitleMargin,
    tabSectionOption,
    tabSectionOptionItem,
    tabSectionOptionToggleable,
    tabSectionToggleableSubsection,
    tabSectionOptionComplexInline,
    tabSectionOptionText,
    tabBar,
    tabContent,
    tabSectionOptionIcon,
} from './styles/VisualizationOptions.style.js'

import {
    sGetUiType,
    sGetUiOptions,
    sGetDimensionItemsByAxis,
    sGetUiLayout,
} from '../../reducers/ui'
import { getOptionsByType } from '../../modules/options/config'
import {
    isDualAxisType,
    hasCustomAxes,
    hasRelativeItems,
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
                            <Help>{helpText}</Help>
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
        const {
            visualizationType,
            columnDimensionItems,
            series,
            columns,
        } = this.props
        const filteredSeries = series.filter(seriesItem =>
            columnDimensionItems.some(
                layoutItem => layoutItem === seriesItem.dimensionItem
            )
        )
        const optionsConfig = getOptionsByType(
            visualizationType,
            isDualAxisType(visualizationType) &&
                hasCustomAxes(filteredSeries) &&
                !hasRelativeItems(columns[0], columnDimensionItems),
            [
                ...new Set(
                    series.length ? series.map(serie => serie.axis) : [0]
                ),
            ].sort((a, b) => a - b)
        )

        const tabs = this.generateTabs(optionsConfig)

        let activeTabIndex = tabs.findIndex(
            tab => tab.key === this.state.activeTabKey
        )

        if (activeTabIndex < 0) {
            activeTabIndex = 0
        }

        return (
            <>
                <div className={tabBar.className}>
                    <TabBar dataTest={'options-modal-tab-bar'}>
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
                <div className={tabContent.className}>
                    {tabs[activeTabIndex].content}
                    {tabContent.styles}
                    {tabSection.styles}
                    {tabSectionTitle.styles}
                    {tabSectionTitleMargin.styles}
                    {tabSectionOption.styles}
                    {tabSectionOptionItem.styles}
                    {tabSectionOptionToggleable.styles}
                    {tabSectionToggleableSubsection.styles}
                    {tabSectionOptionComplexInline.styles}
                    {tabSectionOptionText.styles}
                    {tabSectionOptionIcon.styles}
                </div>
            </>
        )
    }
}

VisualizationOptions.propTypes = {
    visualizationType: PropTypes.string.isRequired,
    columnDimensionItems: PropTypes.array,
    columns: PropTypes.array,
    series: PropTypes.array,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    columnDimensionItems: sGetDimensionItemsByAxis(state, AXIS_ID_COLUMNS),
    series: sGetUiOptions(state).series,
    columns: sGetUiLayout(state).columns,
})

export default connect(mapStateToProps)(VisualizationOptions)
