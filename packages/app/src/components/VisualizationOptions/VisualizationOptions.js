import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FieldSet, Legend, TabBar, Tab } from '@dhis2/ui'

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

import { sGetUiType, sGetUi } from '../../reducers/ui'
import { getOptionsByType } from '../../modules/options/config'
import { hasCustomAxes } from '@dhis2/analytics'

export class VisualizationOptions extends Component {
    state = { activeTabKey: undefined }

    selectTab = tabKey => {
        this.setState({ activeTabKey: tabKey })
    }

    generateTabContent = sections =>
        sections.map(({ key, getLabel, content, helpText }) => (
            <div key={key} className={tabSection.className}>
                <FieldSet>
                    {getLabel ? (
                        <Legend>
                            <span className={tabSectionTitle.className}>
                                {getLabel()}
                            </span>
                        </Legend>
                    ) : null}
                    {content}
                    {helpText ? (
                        <Legend>
                            <span className={tabSectionOptionText.className}>
                                {helpText}
                            </span>
                        </Legend>
                    ) : null}
                </FieldSet>
            </div>
        ))

    generateTabs = tabs =>
        tabs.map(({ key, getLabel, content }) => ({
            key,
            label: getLabel(),
            content: this.generateTabContent(content),
        }))

    render() {
        const { visualizationType, ui } = this.props

        const seriesDimension = ui.layout.columns[0]
        const layoutItems = ui.itemsByDimension[seriesDimension]
        const series = ui.options.series
        //TODO: can this be simplified? reuse an exisiting fn?
        // use layoutGetAxisIdDimensionIdsObject?
        const filteredSeries = series.filter(seriesItem =>
            layoutItems.some(
                layoutItem => layoutItem === seriesItem.dimensionItem
            )
        )
        const test = hasCustomAxes(filteredSeries)
        console.log('hasCustomAxes: ' + test)

        const optionsConfig = getOptionsByType(visualizationType, test)

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
    ui: PropTypes.object,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    ui: sGetUi(state),
})

export default connect(mapStateToProps)(VisualizationOptions)
