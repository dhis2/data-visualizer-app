import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';
import { supportedFileTypes, getFileTypeLabel } from './util';

const DeleteDialog = props => {
    const {
        open,
        fileType,
        fileModel,
        onRequestClose,
        onRequestDelete,
        onRequestDeleteError,
    } = props;

    const deleteFavorite = () => {
        if (fileModel) {
            fileModel
                .delete()
                .then(() => onRequestDelete(fileModel.id))
                .catch(onRequestDeleteError);
        }
    };

    return (
        <Dialog open={open} onClose={onRequestClose} maxWidth="sm">
            <DialogTitle>
                {i18n.t('Delete {{what}}', {
                    what: getFileTypeLabel(fileType),
                })}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {i18n.t('This {{what}} will be deleted. Continue?', {
                        what: getFileTypeLabel(fileType),
                    })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onRequestClose} color="primary">
                    {i18n.t('Cancel')}
                </Button>
                <Button onClick={deleteFavorite} color="primary">
                    {i18n.t('Delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestDelete: null,
    onRequestDeleteError: null,
};

DeleteDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestDelete: PropTypes.func,
    onRequestDeleteError: PropTypes.func,
};

export default DeleteDialog;
