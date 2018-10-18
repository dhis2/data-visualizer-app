import React from 'react';
import { Dialog } from '@material-ui/core';
import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension';

export const DialogManager = ({ d2, dialogIsOpen, id, toggleDialog }) => {
    const dimensionComponents = {
        dx: <DataDimension toggleDialog={toggleDialog} />,
        pe: <PeriodDimension d2={d2} toggleDialog={toggleDialog} />,
        ou: <OrgUnitDimension />,
    };
    return id ? (
        <Dialog
            open={dialogIsOpen}
            onClose={() => toggleDialog(null)}
            maxWidth={false}
            disableEnforceFocus
        >
            {dimensionComponents[id]}
        </Dialog>
    ) : null;
};

export default DialogManager;
