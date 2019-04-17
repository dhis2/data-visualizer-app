import React, { cloneElement, isValidElement } from 'react';
import isFunction from 'lodash-es/isFunction';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon';
import { styles } from './styles/Menu.style';

class ChipMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        event.stopPropagation();
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        event.stopPropagation();
        this.setState({ anchorEl: null });
    };

    getMenuId = () => `menu-for-${this.props.id}`;

    render() {
        return (
            <React.Fragment>
                <IconButton
                    aria-owns={this.state.anchorEl ? this.getMenuId() : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={styles.icon}
                >
                    <MoreHorizontalIcon style={styles.icon} />
                </IconButton>
                <Menu
                    id={this.getMenuId(this.props.id)}
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    {this.props.menuItems.map(menuItem => {
                        const onClick = e => {
                            if (isFunction(menuItem.props.onClick)) {
                                menuItem.props.onClick(e);
                            }
                            this.handleClose(e);
                        };

                        return isValidElement(menuItem)
                            ? cloneElement(menuItem, { onClick })
                            : menuItem;
                    })}
                </Menu>
            </React.Fragment>
        );
    }
}

export default ChipMenu;
