import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from '@material-ui/icons/Edit';

import i18n from '@dhis2/d2-i18n';
import RenameDialog from './RenameDialog';

import { supportedFileTypes } from './util';

class RenameMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = () => {
        this.toggleRenameDialog();

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    onDialogReturn = success => (...args) => {
        const { onRename, onRenameError } = this.props;

        this.toggleRenameDialog();

        if (success) {
            onRename(...args);
        } else {
            onRenameError(...args);
        }
    };

    toggleRenameDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleRenameDialog}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Rename')} />
                </MenuItem>
                {fileModel ? (
                    <RenameDialog
                        open={this.state.dialogIsOpen}
                        fileType={fileType}
                        fileModel={fileModel}
                        onRequestClose={this.onClose}
                        onRequestRename={this.onDialogReturn(true)}
                        onRequestRenameError={this.onDialogReturn(false)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

RenameMenuItem.contextTypes = {
    d2: PropTypes.object,
};

RenameMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onRename: Function.prototype,
    onRenameError: Function.prototype,
    onClose: Function.prototype,
};

RenameMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onRename: PropTypes.func,
    onRenameError: PropTypes.func,
    onClose: PropTypes.func,
};

export default RenameMenuItem;
