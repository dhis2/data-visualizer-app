import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sGetCurrent } from '../../reducers/current';
import { apiSaveAOInUserDataStore } from '../../api/analytics';

export const MAPS_APP_URL = 'dhis-web-maps';

export const defaultState = {
    anchorEl: null,
};

export class MapMenu extends Component {
    constructor(props, context) {
        super(props);

        this.state = defaultState;
        this.d2 = context.d2;
        this.baseUrl = context.baseUrl;
    }

    toggleMenu = target => this.setState({ anchorEl: target || null });

    onOpenChartAsMapClick = async () => {
        await apiSaveAOInUserDataStore(this.props.current);

        window.location.href = `${
            this.baseUrl
        }/${MAPS_APP_URL}?currentAnalyticalObject=true`;
    };

    render() {
        return (
            <Fragment>
                <Button
                    className={this.props.className}
                    onClick={event => this.toggleMenu(event.currentTarget)}
                    disableFocusRipple
                    disableRipple
                >
                    {i18n.t('Map')}
                </Button>
                <Menu
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={() => this.toggleMenu()}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                    disableAutoFocusItem
                >
                    <Button
                        disabled={!this.props.current}
                        onClick={this.onOpenChartAsMapClick}
                        className={this.props.className}
                    >
                        {i18n.t('Open chart as map')}
                    </Button>
                </Menu>
            </Fragment>
        );
    }
}

MapMenu.propTypes = {
    className: PropTypes.string,
};

MapMenu.contextTypes = {
    d2: PropTypes.object,
    baseUrl: PropTypes.string,
};

const mapStateToProps = state => ({
    current: sGetCurrent(state),
});

export default connect(
    mapStateToProps,
    {}
)(MapMenu);
