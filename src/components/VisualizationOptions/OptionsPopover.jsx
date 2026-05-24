import i18n from '@dhis2/d2-i18n'
import { TabBar, Tab, FieldSet, Legend, Help, Button, ButtonStrip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './OptionsPopover.module.css'

export const OptionsPopover = ({ optionsConfig, onUpdate, onClose }) => {
    const [activeTabKey, setActiveTabKey] = useState(
        optionsConfig[0]?.key ?? null
    )

    let activeTabIndex = optionsConfig.findIndex(
        (tab) => tab.key === activeTabKey
    )
    if (activeTabIndex < 0) {
        activeTabIndex = 0
    }

    const activeTab = optionsConfig[activeTabIndex]

    return (
        <div className={styles.popover} data-test="options-popover">
            <div className={styles.tabBar}>
                <TabBar dataTest="options-popover-tab-bar">
                    {optionsConfig.map(({ key, label }, index) => (
                        <Tab
                            key={key}
                            onClick={() => setActiveTabKey(key)}
                            selected={index === activeTabIndex}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabBar>
            </div>
            <div className={styles.tabContent}>
                {activeTab?.content?.map(
                    ({ key, label, content, helpText }) => (
                        <div key={key} className={styles.section}>
                            <FieldSet>
                                {label && (
                                    <Legend>
                                        <span className={styles.sectionTitle}>
                                            {label}
                                        </span>
                                    </Legend>
                                )}
                                {content}
                                {helpText && (
                                    <Legend>
                                        <Help>{helpText}</Help>
                                    </Legend>
                                )}
                            </FieldSet>
                        </div>
                    )
                )}
            </div>
            <div className={styles.actions}>
                <ButtonStrip>
                    <Button
                        secondary
                        onClick={onClose}
                        dataTest="options-popover-action-cancel"
                    >
                        {i18n.t('Hide')}
                    </Button>
                    <Button
                        primary
                        onClick={onUpdate}
                        dataTest="options-popover-action-confirm"
                    >
                        {i18n.t('Update')}
                    </Button>
                </ButtonStrip>
            </div>
        </div>
    )
}

OptionsPopover.propTypes = {
    optionsConfig: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
}
