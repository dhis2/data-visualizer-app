import React from 'react';
import i18n from '@dhis2/d2-i18n';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import { DataDimension } from './DataDimension';
import { PeriodDimension } from './PeriodDimension';
import { OrgUnitDimension } from './OrgUnitDimension';

// Placeholder for the dimension popup dialogs - using the Options dialog until the components are created
const dimensionComponents = {
    dx: <DataDimension />,
    pe: <PeriodDimension />,
    ou: <OrgUnitDimension />,
};

export const DialogManager = ({
    addDimension,
    dialogIsOpen,
    dimension,
    toggleDialog,
}) => {
    const index = dimension ? dimension.id : 0;
    return (
        <Dialog open={dialogIsOpen} onClose={() => toggleDialog(null)}>
            <DialogContent>{dimensionComponents[index]}</DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        addDimension({
                            id: dimension.id,
                        });
                        toggleDialog();
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

export default DialogManager;
