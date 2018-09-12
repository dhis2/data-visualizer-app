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
import { sGetUiType } from '../reducers/ui';
import { acSetUiType } from '../actions/ui';

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
                    style={{
                        padding: '8px',
                        color: 'black',
                        fontFace: 'Roboto-Regular',
                        fontSize: '14px',
                        textTransform: 'none',
                        fontWeight: 'normal',
                        borderRight: '1px lightgrey',
                        width: '250px',
                        height: '40px',
                        justifyContent: 'left',
                    }}
                >
                    <VisualizationTypeIcon type={visualizationType} />
                    {visualizationTypeMap[visualizationType]}
                    <ArrowDropDownIcon style={{ marginLeft: 'auto' }} />
                </Button>
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    style={{ maxWidth: 632 }}
                    MenuListProps={{ style: { overflow: 'auto' } }}
                >
                    {Object.keys(visualizationTypeMap).map(type => (
                        <MenuItem
                            key={type}
                            style={{
                                height: '104px',
                                width: '134px',
                                padding: '8px',
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
                                    fontSize: '14px',
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
