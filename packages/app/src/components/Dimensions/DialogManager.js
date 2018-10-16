import React from 'react';
import { Dialog } from '@material-ui/core';
import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension';

// Placeholder for the dimension popup dialogs - using the Options dialog until the components are created
const dimensionComponents = {
    dx: <DataDimension />,
    pe: <PeriodDimension />,
    ou: <OrgUnitDimension />,
};

export const DialogManager = ({ dialogIsOpen, id, toggleDialog }) => {
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
    ) : null;
};

export default DialogManager;
