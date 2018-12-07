import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VisualizationTypeIcon from './VisualizationTypeIcon';
import { chartTypeDisplayNames } from '../../modules/chartTypes';
import { sGetUiType } from '../../reducers/ui';
import { acSetUiType } from '../../actions/ui';
import styles from './styles/VisualizationTypeSelector.style';

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
                    {chartTypeDisplayNames[visualizationType]}
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
                    {Object.keys(chartTypeDisplayNames).map(type => (
                        <MenuItem
                            key={type}
                            selected={type === visualizationType}
                            style={styles.menuItem}
                            onClick={this.handleMenuItemClick(type)}
                            disableRipple
                        >
                            <ListItemIcon style={styles.listItemIcon}>
                                <VisualizationTypeIcon
                                    type={type}
                                    style={styles.listItemSvg}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={chartTypeDisplayNames[type]}
                                disableTypography={true}
                                style={styles.listItemText}
                            />
                        </MenuItem>
                    ))}
                </Menu>
            </Fragment>
        );
    }
}

VisualizationTypeSelector.propTypes = {
    visualizationType: PropTypes.oneOf(Object.keys(chartTypeDisplayNames)),
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
