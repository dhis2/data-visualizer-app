import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import AppBar from 'material-ui-next/AppBar';
import i18n from 'd2-i18n';

const styles = {
    tabsBar: {
        height: 48,
        width: 747,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
    },
    tab: {
        width: 160,
    },
};

const TabsBar = ({ activeTab, classes, onChange }) => {
    return (
        <AppBar elevation={0} className={classes.tabsBar} position={'static'}>
            <Tabs
                indicatorColor={'primary'}
                onChange={(event, value) => onChange('activeTab', value)}
                textColor={'primary'}
                value={activeTab}
            >
                <Tab className={classes.tab} label={i18n.t('Data')} value={0} />
                <Tab
                    className={classes.tab}
                    label={i18n.t('Axes & legend')}
                    value={1}
                />
                <Tab
                    className={classes.tab}
                    label={i18n.t('Style')}
                    value={2}
                />
            </Tabs>
        </AppBar>
    );
};

TabsBar.propTypes = {
    activeTab: PropTypes.number.isRequired,
    classes: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TabsBar);
