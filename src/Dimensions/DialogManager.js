import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';
import { tSetDimensions } from '../actions/dimensions';
import VisualizationOptions from '../VisualizationOptions/VisualizationOptions';

// Placeholder for the dimension popup dialogs - using the Options dialog until the components are created
let dimensionsArr = [<VisualizationOptions />, 'test'];

export const DialogManager = ({
    open,
    dimensionId,
    setDimension,
    toggleDialog,
}) => {
    return (
        <Dialog open={open} onClose={() => toggleDialog(null)}>
            <DialogTitle>{i18n.t('Chart options')}</DialogTitle>
            <DialogContent>{dimensionsArr[dimensionId]}</DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setDimension(dimensionId);
                        toggleDialog(null);
                    }}
                >
                    {i18n.t('Submit')}
                </Button>
                <Button onClick={() => toggleDialog(null)}>
                    {i18n.t('Cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapDispatchToProps = dispatch => ({
    setDimension: id => dispatch(tSetDimensions(id)),
});

export default connect(
    null,
    mapDispatchToProps
)(DialogManager);
