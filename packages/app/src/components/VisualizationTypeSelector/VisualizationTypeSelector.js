import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VisualizationTypeIcon from './VisualizationTypeIcon';
import { visualizationTypeMap } from './visualizationTypes';
import { sGetUiType } from '../../reducers/ui';
import { acSetUiType } from '../../actions/ui';
import { colors } from '../../colors';

export class VisualizationTypeSelector extends Component {
    state = {
        anchorEl: null,
    };

    handleButtonClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = type => event => {
        this.props.onTypeSelect(type);
        this.handleClose();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { visualizationType } = this.props;

        return (
            <div className="visualization-type-selector">
                <Button
                    onClick={this.handleButtonClick}
                    disableRipple
                    disableFocusRipple
                    style={{
                        padding: 8,
                        margin: '2px 3px',
                        color: colors.black,
                        fontSize: 14,
                        textTransform: 'none',
                        fontWeight: 'normal',
                        borderRight: '1px lightgrey',
                        width: 244,
                        height: 40,
                        justifyContent: 'left',
                        '&:hover': {
                            backgroundColor: colors.blueGrey,
                            borderRadius: 4,
                        },
                        '&:active': {
                            backgroundColor: colors.accentPrimaryLightest,
                            borderRadius: 4,
                        },
                    }}
                >
                    <VisualizationTypeIcon type={visualizationType} />
                    {visualizationTypeMap[visualizationType]}
                    <ArrowDropDownIcon style={{ marginLeft: 'auto' }} />
                </Button>
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    style={{ maxWidth: 640 }}
                    MenuListProps={{ style: { overflow: 'auto', padding: 0 } }}
                >
                    {Object.keys(visualizationTypeMap).map(type => (
                        <MenuItem
                            key={type}
                            selected={type === visualizationType}
                            style={{
                                height: 104,
                                width: 134,
                                padding: 0,
                                margin: 8,
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                float: 'left',
                            }}
                            onClick={this.handleMenuItemClick(type)}
                        >
                            <ListItemIcon>
                                <VisualizationTypeIcon
                                    type={type}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        paddingTop: 16,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={visualizationTypeMap[type]}
                                disableTypography={true}
                                style={{
                                    fontSize: 14,
                                    padding: '16px 0 8px 0',
                                }}
                            />
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

VisualizationTypeSelector.propTypes = {
    visualizationType: PropTypes.oneOf(Object.keys(visualizationTypeMap)),
};

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
});

const mapDispatchToProps = dispatch => ({
    onTypeSelect: type => dispatch(acSetUiType(type)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisualizationTypeSelector);
