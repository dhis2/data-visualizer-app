import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import AppBar from 'material-ui-next/AppBar';
import strings from './utils';

const styles = {
    appBar: {
        backgroundColor: '#ffffff',
    },
    divBorder: {
        borderBottom: '1px solid rgb(158, 158, 158)',
        marginLeft: 20,
        marginRight: 40,
    },
};

const TabComponent = props => {
    const { activeTab, classes, onChange } = props;
    return (
        <div className={classes.divBorder}>
            <AppBar position="static" elevation={0} className={classes.appBar}>
                <Tabs
                    value={activeTab}
                    onChange={(event, value) => {
                        onChange('activeTab', value);
                    }}
                    indicatorColor={'primary'}
                    textColor={'primary'}
                >
                    <Tab label={strings.dataTabLabel} value={0} />
                    <Tab label={strings.axesTabLabel} value={1} />
                    <Tab label={strings.styleTabLabel} value={2} />
                </Tabs>
            </AppBar>
        </div>
    );
};

TabComponent.propTypes = {
    activeTab: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TabComponent);
