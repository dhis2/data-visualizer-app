import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { sGetUiType } from '../../reducers/ui';

import styles from './styles/VisualizationOptions.style';

import { getOptionsByType } from '../../modules/options/config';

export class VisualizationOptions extends Component {
    state = { activeTab: 0 }

    selectTab = tabId => {
        this.setState({ activeTab: tabId })
    }

    generateTabContent = sections =>
        sections.map(({ key, label, content }) => (
            <FormGroup key={key} component="fieldset">
                {label ? (
                    <FormLabel component="legend">{label}</FormLabel>
                ) : null}
                {content}
            </FormGroup>
        ));

    generateTabs = tabs =>
        tabs.map(({ key, label, content }) => ({
            key,
            label,
            content: this.generateTabContent(content),
        }));

    render() {
        const { classes, visualizationType } = this.props;
        const { activeTab } = this.state;

        const optionsConfig = getOptionsByType(visualizationType);

        const tabs = this.generateTabs(optionsConfig);

        return (
            <Fragment>
                <AppBar
                    position="sticky"
                    className={classes.tabsBar}
                    elevation={0}
                >
                    <Tabs
                        indicatorColor="primary"
                        onChange={(event, tabId) => this.selectTab(tabId)}
                        textColor="primary"
                        value={activeTab}
                    >
                        {tabs.map(({ key, label }) => (
                            <Tab
                                key={key}
                                className={classes.tab}
                                label={label}
                            />
                        ))}
                    </Tabs>
                </AppBar>
                {tabs[activeTab].content}
            </Fragment>
        )
    }
}

VisualizationOptions.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
});

export default connect(mapStateToProps)(
    withStyles(styles)(VisualizationOptions)
);
