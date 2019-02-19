import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';

const OpenAsMapConfirmationDialog = ({
    open,
    toggleDialog,
    handleOpenChartAsMapClick,
}) => (
    <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Open as: Geo Map</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Only a single data dimension will be sent to maps, data element
                that comes <strong>first</strong> in the chart data. You can
                reorder data elements in the 'Data' modal.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button onClick={handleOpenChartAsMapClick}>Open in maps</Button>
        </DialogActions>
    </Dialog>
);

OpenAsMapConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    handleOpenChartAsMapClick: PropTypes.func.isRequired,
};

export default OpenAsMapConfirmationDialog;
