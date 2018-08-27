import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import VisualizationTypeIcon from './VisualizationTypeIcon';

// TODO add i18n
const visualizationTypeMap = {
    column: 'Column',
    stackedColumn: 'Stacked column',
    bar: 'Bar',
    stackedBar: 'Stacked bar',
    line: 'Line',
    area: 'Area',
    pie: 'Pie',
    radar: 'Radar',
    gauge: 'Gauge',
    bubble: 'Bubble',
    yearOnYear: 'Year on year',
};

class VisualizationTypeSelector extends Component {
    state = {
        anchorEl: null,
        visualizationType: this.props.visualizationType || 'column',
    };

    handleButtonClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = type => event => {
        this.setState({ visualizationType: type });
        this.handleClose();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl, visualizationType } = this.state;

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
                    anchorOrigin={{ vertical: 'bottom' }}
                    onClose={this.handleClose}
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
    visualizationType: PropTypes.oneOf([
        'column',
        'stackedColumn',
        'bar',
        'stackedBar',
        'line',
        'area',
        'pie',
        'radar',
        'gauge',
        'bubble',
        'yearOnYear',
    ]),
};

export default VisualizationTypeSelector;
