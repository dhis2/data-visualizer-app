import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import i18n from '@dhis2/d2-i18n';

import { styles } from './styles/DownloadMenu.style';

class DownloadMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            schemeSubmenu: {
                anchorEl: null,
                dataType: null,
            },
            advancedSubmenu: {
                anchorEl: null,
            },
        };
    }

    toggleMenu = target => this.setState({ anchorEl: target || null });

    toggleSubmenu = (id, target, dataType) => {
        const key = `${id}Submenu`;

        const payload = { anchorEl: target || null };

        if (id === 'scheme') {
            payload.dataType = dataType || null;
        }

        this.setState({ [key]: payload });
    };

    downloadImage = type => () => {
        this.props.downloadImage(type);

        this.toggleMenu();
    };

    downloadData = (format, idScheme, path) => () => {
        this.props.downloadData(format, idScheme, path);

        if (idScheme) {
            this.toggleSubmenu('scheme');
        } else {
            this.toggleSubmenu('advanced');
        }

        this.toggleMenu();
    };

    render() {
        return (
            <Fragment>
                <Button
                    onClick={event => this.toggleMenu(event.currentTarget)}
                    disableRipple={true}
                    disableFocusRipple={true}
                >
                    {i18n.t('Download')}
                </Button>
                <Menu
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={styles.menuAnchorOrigin}
                    getContentAnchorEl={null}
                    disableAutoFocusItem={true}
                    onClose={() => this.toggleMenu()}
                >
                    <ListSubheader component="div">
                        {i18n.t('Graphics')}
                    </ListSubheader>
                    <MenuItem onClick={this.downloadImage('png')}>
                        <ListItemIcon>
                            <ImageIcon />
                        </ListItemIcon>
                        <ListItemText>{i18n.t('Image (.png)')}</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={this.downloadImage('pdf')}>
                        <ListItemIcon>
                            <PictureAsPdfIcon />
                        </ListItemIcon>
                        <ListItemText>{i18n.t('PDF (.pdf)')}</ListItemText>
                    </MenuItem>
                    <Divider />
                    <ListSubheader component="div">
                        {i18n.t('Plain data source')}
                    </ListSubheader>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'json'
                            )
                        }
                    >
                        JSON
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'xml'
                            )
                        }
                    >
                        XML
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'xls'
                            )
                        }
                    >
                        Excel
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'csv'
                            )
                        }
                    >
                        CSV
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu('advanced', event.currentTarget)
                        }
                    >
                        {i18n.t('Advanced')}
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                </Menu>
                <Menu
                    open={Boolean(this.state.schemeSubmenu.anchorEl)}
                    anchorEl={this.state.schemeSubmenu.anchorEl}
                    anchorOrigin={styles.submenuAnchorOrigin}
                    disableAutoFocusItem={true}
                    onClose={event => this.toggleSubmenu('scheme')}
                >
                    <ListSubheader component="div">
                        {i18n.t('Meta-data ID scheme')}
                    </ListSubheader>
                    <MenuItem
                        onClick={this.downloadData(
                            this.state.schemeSubmenu.dataType,
                            'UID'
                        )}
                    >
                        ID
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData(
                            this.state.schemeSubmenu.dataType,
                            'CODE'
                        )}
                    >
                        Code
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData(
                            this.state.schemeSubmenu.dataType,
                            'NAME'
                        )}
                    >
                        Name
                    </MenuItem>
                </Menu>
                <Menu
                    open={Boolean(this.state.advancedSubmenu.anchorEl)}
                    anchorEl={this.state.advancedSubmenu.anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    disableAutoFocusItem={true}
                    onClose={event => this.toggleSubmenu('advanced')}
                >
                    <ListSubheader component="div">
                        {i18n.t('Data value set')}
                    </ListSubheader>
                    <MenuItem
                        onClick={this.downloadData(
                            'json',
                            null,
                            'dataValueSet'
                        )}
                    >
                        JSON
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData('xml', null, 'dataValueSet')}
                    >
                        XML
                    </MenuItem>
                    <Divider />
                    <ListSubheader component="div">
                        {i18n.t('Other formats')}
                    </ListSubheader>
                    <MenuItem onClick={this.downloadData('jrxml')}>
                        JRXML
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData('sql', null, 'debug/sql')}
                    >
                        Raw data SQL
                    </MenuItem>
                </Menu>
            </Fragment>
        );
    }
}

DownloadMenu.defaultProps = {
    downloadData: Function.prototype,
    downloadImage: Function.prototype,
};

DownloadMenu.propTypes = {
    downloadData: PropTypes.func,
    downloadImage: PropTypes.func,
};

export default DownloadMenu;
