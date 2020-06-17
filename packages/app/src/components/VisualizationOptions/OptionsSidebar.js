import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'

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

import { sGetUiType } from '../../reducers/ui'
import { getOptionsByType } from '../../modules/options/config'

const OptionsButton = ({ label, onClick }) => (
    <div
        onClick={() => onClick()}
        style={{
            cursor: 'pointer',
            padding: '10px',
            border: '1px solid #e0e2e4',
            marginTop: '10px',
        }}
    >
        {label}
    </div>
)

OptionsButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export class OptionsSidebar extends Component {
    state = { activeTabKey: undefined }

    selectTab = tabKey => {
        this.setState({ activeTabKey: tabKey })
    }

    generateTabContent = sections =>
        sections.map(({ key, getLabel, content }) => (
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
        const { visualizationType } = this.props

        const optionsConfig = getOptionsByType(visualizationType)

        const tabs = this.generateTabs(optionsConfig)

        let activeTabIndex = tabs.findIndex(
            tab => tab.key === this.state.activeTabKey
        )

        if (activeTabIndex < 0) {
            activeTabIndex = 0
        }

        return (
            <div
                style={{
                    height: '100%',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        padding: '10px',
                        marginRight: '10px',
                        borderLeft: '1px solid #e0e2e4',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <h3 style={{ margin: '0 0 16px' }}>{i18n.t('Options')}</h3>
                    <div
                        style={{
                            background: '#fff',
                            padding: '10px',
                            border: '1px solid #e0e2e4',
                        }}
                    >
                        <h4 style={{ margin: '0 0 16px' }}>
                            {i18n.t('Chart options')}
                        </h4>
                        <p style={{ color: '#7F8895' }}>
                            {i18n.t(
                                'These options apply to the entire chart, but can be overriden per-axis or per-series below'
                            )}
                        </p>
                        {tabs.find(tab => tab.key === 'quick-tab') && (
                            <div
                                style={{
                                    background: '#fff',
                                    padding: '10px',
                                    border: '1px solid #e0e2e4',
                                }}
                            >
                                {
                                    tabs.find(tab => tab.key === 'quick-tab')
                                        .content
                                }
                            </div>
                        )}
                        {tabs
                            .filter(item => item.key !== 'quick-tab')
                            .map(({ key, label }) => (
                                <OptionsButton
                                    key={key}
                                    label={label}
                                    onClick={() =>
                                        console.log('clicked ' + key)
                                    }
                                />
                            ))}
                    </div>
                    <div
                        style={{
                            background: '#fff',
                            padding: '10px',
                            border: '1px solid #e0e2e4',
                            marginTop: '10px',
                        }}
                    >
                        <h4 style={{ margin: '0 0 16px' }}>
                            {i18n.t('Axis options')}
                        </h4>
                        <p style={{ color: '#7F8895' }}>
                            {i18n.t(
                                'These options apply to each axis and will override chart options set above'
                            )}
                        </p>
                    </div>
                    <div
                        style={{
                            background: '#fff',
                            padding: '10px',
                            border: '1px solid #e0e2e4',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                    >
                        <h4 style={{ margin: '0 0 16px' }}>
                            {i18n.t('Series options')}
                        </h4>
                        <p style={{ color: '#7F8895' }}>
                            {i18n.t(
                                'These options apply to each series and will override both chart options and axis options set above'
                            )}
                        </p>
                    </div>
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
                </div>
            </div>
        )
    }
}

OptionsSidebar.propTypes = {
    visualizationType: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
})

export default connect(mapStateToProps)(OptionsSidebar)
