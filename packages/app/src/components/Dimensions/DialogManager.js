import React from 'react';
import i18n from '@dhis2/d2-i18n';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import { DataDimension } from './DataDimension';
import PeriodDimension from './PeriodDimension';
import { OrgUnitDimension } from './OrgUnitDimension';

// Placeholder for the dimension popup dialogs - using the Options dialog until the components are created

export const DialogManager = ({ dialogIsOpen, id, toggleDialog, d2 }) => {
    const dimensionComponents = {
        dx: <DataDimension />,
        pe: (
            <PeriodDimension
                dialogIsOpen={dialogIsOpen}
                toggleDialog={toggleDialog}
                d2={d2}
            />
        ),
        ou: <OrgUnitDimension />,
    };

    return (
        <Dialog open={dialogIsOpen} onClose={() => toggleDialog(null)}>
            <DialogContent>{dimensionComponents[id]}</DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        toggleDialog(null);
                    }}
                >
                    {i18n.t('Hide')}
                </Button>
                <Button onClick={() => toggleDialog(null)}>
                    {i18n.t('Update')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogManager;
