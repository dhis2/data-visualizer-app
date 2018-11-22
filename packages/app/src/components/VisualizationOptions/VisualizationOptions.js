import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import i18n from '@dhis2/d2-i18n';
import DataTab from './DataTab';
import StyleTab from './StyleTab';
import AxesAndLegendsTab from './AxesAndLegendsTab';
import styles from './styles/VisualizationOptions.style';

export class VisualizationOptions extends Component {
    state = {
        activeTab: 0,
    };

    selectTab = tabId => {
        this.setState({ activeTab: tabId });
    };

    render = () => {
        const { classes } = this.props;
        const { activeTab } = this.state;

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
                        <Tab className={classes.tab} label={i18n.t('Data')} />
                        <Tab
                            className={classes.tab}
                            label={i18n.t('Axes & legend')}
                        />
                        <Tab className={classes.tab} label={i18n.t('Style')} />
                    </Tabs>
                </AppBar>
                {activeTab === 0 && <DataTab />}
                {activeTab === 1 && <AxesAndLegendsTab />}
                {activeTab === 2 && <StyleTab />}
            </Fragment>
        );
    };
}

export default withStyles(styles)(VisualizationOptions);
