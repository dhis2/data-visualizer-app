import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import i18n from '@dhis2/d2-i18n';

const styles = {
    tabsBar: {
        height: 48,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
    },
    tab: {
        width: 160,
    },
};

const strings = ['Data', 'Axes & legend', 'Style'];

const renderTabs = classes => {
    return strings.map((entry, i) => (
        <Tab className={classes.tab} label={i18n.t(entry)} key={i} value={i} />
    ));
};

export const TabsBar = ({ activeTab, classes, onChange }) => {
    return (
        <AppBar elevation={0} className={classes.tabsBar} position="sticky">
            <Tabs
                indicatorColor="primary"
                onChange={(event, value) => onChange('activeTab', value)}
                textColor="primary"
                value={activeTab}
            >
                {renderTabs(classes)}
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
