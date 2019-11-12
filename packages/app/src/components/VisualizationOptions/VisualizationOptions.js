import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FieldSet, Legend, TabBar, Tab } from '@dhis2/ui-core';

import {
    tabSection,
    tabSectionLegend,
    tabSectionLabel,
} from './styles/VisualizationOptions.style.js';

import { sGetUiType } from '../../reducers/ui';
import { getOptionsByType } from '../../modules/options/config';

export class VisualizationOptions extends Component {
    state = { activeTab: 0 }

    selectTab = tabId => {
        this.setState({ activeTab: tabId })
    }

    generateTabContent = sections =>
        sections.map(({ key, label, content }) => (
            <FieldSet key={key} className={tabSection.className}>
                {label ? (
                    <Legend className={tabSectionLegend.className}>
                        {label}
                    </Legend>
                ) : null}
                {content}
            </FieldSet>
        ));

    generateTabs = tabs =>
        tabs.map(({ key, label, content }) => ({
            key,
            label,
            content: this.generateTabContent(content),
        }));

    render() {
        const { visualizationType } = this.props;
        const { activeTab } = this.state;

        const optionsConfig = getOptionsByType(visualizationType);

        const tabs = this.generateTabs(optionsConfig);

        return (
            <Fragment>
                <TabBar>
                    {tabs.map(({ key, label }, index) => (
                        <Tab
                            key={key}
                            onClick={() => this.selectTab(index)}
                            selected={index === activeTab}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabBar>
                {tabs[activeTab].content}
                {tabSection.styles}
                {tabSectionLegend.styles}
                {tabSectionLabel.styles}
            </Fragment>
        )
    }
}

VisualizationOptions.propTypes = {
    visualizationType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
});

export default connect(mapStateToProps)(VisualizationOptions);
