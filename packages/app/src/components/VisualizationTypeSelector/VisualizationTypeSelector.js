import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import {
    chartTypes,
    isOpenAsType,
    OPEN_AS_MAP,
    getChartTypeDisplayName,
} from '../../modules/chartTypes';
import { prepareCurrentAnalyticalObject } from '../../modules/currentAnalyticalObject';
import { sGetUi, sGetUiType } from '../../reducers/ui';
import { sGetCurrent } from '../../reducers/current';
import { sGetMetadata } from '../../reducers/metadata';
import { acSetUiType } from '../../actions/ui';
import {
    apiSaveAOInUserDataStore,
    CURRENT_AO_KEY,
} from '../../api/userDataStore';

import VisualizationTypeMenuItem from './VisualizationTypeMenuItem';
import VisualizationTypeIcon from './VisualizationTypeIcon';
import styles from './styles/VisualizationTypeSelector.style';

export const MAPS_APP_URL = 'dhis-web-maps';

export const defaultState = {
    anchorEl: null,
};

export class VisualizationTypeSelector extends Component {
    constructor(props, context) {
        super(props);

        this.state = defaultState;
        this.baseUrl = context.baseUrl;
        this.chartTypes = this.getChartTypes();
    }

    handleButtonClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = type => () => {
        this.props.onTypeSelect(type);
        this.handleClose();
    };

    handleOpenAsMenuItemClick = type => () => {
        if (type === OPEN_AS_MAP) {
            this.handleOpenChartAsMapClick();
        }
    };

    handleOpenChartAsMapClick = async () => {
        const currentAnalyticalObject = prepareCurrentAnalyticalObject(
            this.props.current,
            this.props.metadata,
            this.props.ui
        );

        await apiSaveAOInUserDataStore(currentAnalyticalObject);

        window.location.href = `${this.baseUrl}/${MAPS_APP_URL}?${CURRENT_AO_KEY}=true`;
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    getChartTypes = () => {
        return chartTypes.reduce(
            (result, type) => {
                const chartType = isOpenAsType(type)
                    ? 'openAsTypes'
                    : 'nativeTypes';

                result[chartType].push(type);

                return result;
            },
            { nativeTypes: [], openAsTypes: [] }
        );
    };

    render() {
        const { anchorEl } = this.state;
        const { visualizationType } = this.props;
        const { nativeTypes, openAsTypes } = this.chartTypes;

        return (
            <Fragment>
                <Button
                    onClick={this.handleButtonClick}
                    disableRipple
                    disableFocusRipple
                    fullWidth={true}
                    size="small"
                    style={styles.button}
                >
                    <VisualizationTypeIcon type={visualizationType} />
                    {getChartTypeDisplayName(visualizationType)}
                    <ArrowDropDownIcon style={styles.dropDownArrow} />
                </Button>
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    MenuListProps={{
                        style: styles.menu,
                    }}
                >
                    {nativeTypes.map(type => (
                        <VisualizationTypeMenuItem
                            key={type}
                            type={type}
                            visualizationType={visualizationType}
                            styles={styles}
                            onClick={this.handleMenuItemClick(type)}
                        />
                    ))}
                    <div style={styles.clearFix} />
                    <hr style={styles.menuDivider} />
                    {openAsTypes.map(type => (
                        <VisualizationTypeMenuItem
                            key={type}
                            type={type}
                            visualizationType={visualizationType}
                            styles={styles}
                            onClick={this.handleOpenAsMenuItemClick(type)}
                            disabled={!this.props.current}
                        />
                    ))}
                </Menu>
            </Fragment>
        );
    }
}

VisualizationTypeSelector.propTypes = {
    visualizationType: PropTypes.oneOf(chartTypes),
    current: PropTypes.object,
    metadata: PropTypes.object,
    ui: PropTypes.object,
};

VisualizationTypeSelector.contextTypes = {
    baseUrl: PropTypes.string,
};

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    current: sGetCurrent(state),
    metadata: sGetMetadata(state),
    ui: sGetUi(state),
});

const mapDispatchToProps = dispatch => ({
    onTypeSelect: type => dispatch(acSetUiType(type)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisualizationTypeSelector);
