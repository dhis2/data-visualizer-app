import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'

import {
    FieldSet,
    Legend,
    Button,
    SingleSelectField,
    SingleSelectOption,
    InputField,
} from '@dhis2/ui'

import {
    tabSection,
    tabSectionTitle,
    tabSectionOption,
    tabSectionOptionToggleable,
    tabSectionOptionComplexInline,
    tabSectionOptionText,
} from './styles/VisualizationOptions.style.js'
import styles from './styles/OptionsSidebar.module.css'
import { sGetUiType } from '../../reducers/ui'
import { getOptionsByType } from '../../modules/options/config'

const testAxes = ['Axis One', 'Axis Two']
const testTypes = ['Column', 'Line']
const testSeries = ['ANC 1 Coverage', 'ANC 2 Coverage', 'ANC LLITN']

const OptionsButton = ({ label, onClick }) => (
    <div onClick={() => onClick()} className={styles.optionsButton}>
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
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>{i18n.t('Options')}</h3>
                    {!activeTabIndex ? (
                        <>
                            <div className={styles.section}>
                                <h4 className={styles.sectionHeader}>
                                    {i18n.t('Chart options')}
                                </h4>
                                <p className={styles.description}>
                                    {i18n.t(
                                        'These options apply to the entire chart, but can be overriden per-axis or per-series below'
                                    )}
                                </p>
                                {tabs.find(tab => tab.key === 'quick-tab') && (
                                    <div className={styles.section}>
                                        {
                                            tabs.find(
                                                tab => tab.key === 'quick-tab'
                                            ).content
                                        }
                                    </div>
                                )}
                                {tabs
                                    .filter(item => item.key !== 'quick-tab')
                                    .map(({ key, label }) => (
                                        <OptionsButton
                                            key={key}
                                            label={label}
                                            onClick={() => this.selectTab(key)}
                                        />
                                    ))}
                            </div>
                            <div className={styles.section}>
                                <h4 className={styles.sectionHeader}>
                                    {i18n.t('Axis options')}
                                </h4>
                                <p className={styles.description}>
                                    {i18n.t(
                                        'These options apply to each axis and will override chart options set above'
                                    )}
                                </p>
                                {testAxes.map(item => (
                                    <div key={item} className={styles.section}>
                                        <InputField
                                            placeholder={i18n.t('Axis title')}
                                            type="text"
                                        />
                                        <p
                                            className={
                                                styles.advancedOptionsButton
                                            }
                                        >
                                            {i18n.t('Advanced axis options')}
                                        </p>
                                    </div>
                                ))}
                                <Button
                                    onClick={() => console.log('add axis')}
                                    className={styles.addButton}
                                >
                                    {i18n.t('Add axis')}
                                </Button>
                            </div>
                            <div className={styles.section}>
                                <h4 className={styles.sectionHeader}>
                                    {i18n.t('Series options')}
                                </h4>
                                <p className={styles.description}>
                                    {i18n.t(
                                        'These options apply to each series and will override both chart options and axis options set above'
                                    )}
                                </p>
                                {testSeries.map(item => (
                                    <div key={item} className={styles.section}>
                                        <h4 className={styles.sectionHeader}>
                                            {item}
                                        </h4>
                                        <SingleSelectField
                                            label={i18n.t('Chart type')}
                                            selected={testTypes[0]}
                                            onChange={() =>
                                                console.log('changed')
                                            }
                                        >
                                            {testTypes.map(type => (
                                                <SingleSelectOption
                                                    key={type}
                                                    value={type}
                                                    label={type}
                                                />
                                            ))}
                                        </SingleSelectField>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => this.selectTab()}
                                className={styles.backButton}
                            >
                                {i18n.t('Back to all options')}
                            </Button>
                            <div className={styles.section}>
                                <h4 className={styles.sectionHeader}>
                                    {i18n.t('Chart options')} {' > '}
                                    {tabs[activeTabIndex].label}
                                </h4>
                                <p className={styles.description}>
                                    {i18n.t(
                                        'These options apply to the entire chart'
                                    )}
                                </p>
                                {tabs[activeTabIndex].content}
                            </div>
                        </>
                    )}
                    {tabSection.styles}
                    {tabSectionTitle.styles}
                    {tabSectionOption.styles}
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
