import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from '@material-ui/icons/Edit';

import i18n from '@dhis2/d2-i18n';
import WriteInterpretationDialog from './WriteInterpretationDialog';

import { supportedFileTypes } from './util';

class WriteInterpretationMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = () => {
        this.toggleWriteInterpretationDialog();

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    onDialogReturn = success => () => {
        const {
            onWriteInterpretation,
            onWriteInterpretationError,
        } = this.props;

        this.toggleWriteInterpretationDialog();

        if (success && onWriteInterpretation) {
            onWriteInterpretation();
        } else if (onWriteInterpretationError) {
            onWriteInterpretationError();
        }
    };

    toggleWriteInterpretationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem
                    disabled={!enabled}
                    onClick={this.toggleWriteInterpretationDialog}
                >
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Write interpretation')} />
                </MenuItem>
                {fileModel ? (
                    <WriteInterpretationDialog
                        open={this.state.dialogIsOpen}
                        fileType={fileType}
                        fileModel={fileModel}
                        onRequestClose={this.onClose}
                        onRequestWriteInterpretation={this.onDialogReturn(true)}
                        onRequestWriteInterpretationError={this.onDialogReturn(
                            false
                        )}
                    />
                ) : null}
            </Fragment>
        );
    }
}

WriteInterpretationMenuItem.contextTypes = {
    d2: PropTypes.object,
};

WriteInterpretationMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onWriteInterpretation: null,
    onWriteInterpretationError: null,
    onClose: null,
};

WriteInterpretationMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onWriteInterpretation: PropTypes.func,
    onWriteInterpretationError: PropTypes.func,
    onClose: PropTypes.func,
};

export default WriteInterpretationMenuItem;
