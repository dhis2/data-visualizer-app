import React, { useState } from 'react'
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
import { sGetAxisSetupItems } from '../../reducers'

// FIXME: Dummy data
const testAxes = ['Axis One', 'Axis Two']
const testTypes = ['Column', 'Line']

const OptionsButton = ({ label, onClick }) => (
    <div onClick={() => onClick()} className={styles.optionsButton}>
        {label}
    </div>
)

OptionsButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

const OptionsSidebar = ({ seriesItems, visualizationType }) => {
    const [activeSection, setActiveSection] = useState()

    const generateSectionContent = sections =>
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

    const sections = getOptionsByType(visualizationType).map(
        ({ key, getLabel, content }) => ({
            key,
            label: getLabel(),
            content: generateSectionContent(content),
        })
    )

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>{i18n.t('Options')}</h3>
                {!activeSection ? (
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
                            {sections.find(tab => tab.key === 'quick-tab') && (
                                <div className={styles.section}>
                                    {
                                        sections.find(
                                            tab => tab.key === 'quick-tab'
                                        ).content
                                    }
                                </div>
                            )}
                            {sections
                                .filter(item => item.key !== 'quick-tab')
                                .map(section => (
                                    <OptionsButton
                                        key={section.key}
                                        label={section.label}
                                        onClick={() =>
                                            setActiveSection(section)
                                        }
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
                                    <p className={styles.advancedOptionsButton}>
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
                            {seriesItems && seriesItems.length ? (
                                seriesItems.map(item => (
                                    <div
                                        key={item.id}
                                        className={styles.section}
                                    >
                                        <h4 className={styles.sectionHeader}>
                                            {item.name}
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
                                        {/* TODO: Add an axis selector here, which lists the available axes and lets the user choose (just like the Manage axes modal) */}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.description}>
                                    {/* //TODO: Get a better help message from @joecooper */}
                                    {i18n.t(
                                        'Please select items for the series dimension first'
                                    )}
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => setActiveSection()}
                            className={styles.backButton}
                        >
                            {i18n.t('Back to all options')}
                        </Button>
                        <div className={styles.section}>
                            <h4 className={styles.sectionHeader}>
                                {i18n.t('Chart options')} {' > '}
                                {activeSection.label}
                            </h4>
                            <p className={styles.description}>
                                {i18n.t(
                                    'These options apply to the entire chart'
                                )}
                            </p>
                            {activeSection.content}
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

OptionsSidebar.propTypes = {
    seriesItems: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.number.isRequired,
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    visualizationType: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    seriesItems: sGetAxisSetupItems(state),
})

export default connect(mapStateToProps)(OptionsSidebar)
