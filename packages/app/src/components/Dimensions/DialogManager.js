import React from 'react';
import { Dialog } from '@material-ui/core';
import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension';

export const DialogManager = ({ dialogIsOpen, id, toggleDialog }) => {
    const dimensionComponents = {
        dx: <DataDimension toggleDialog={toggleDialog} />,
        pe: <PeriodDimension />,
        ou: <OrgUnitDimension />,
    };
    return id ? (
        <Dialog
            open={dialogIsOpen}
            onClose={() => toggleDialog(null)}
            maxWidth={false}
        >
            {dimensionComponents[id]}
        </Dialog>
    ) : null;
};

export default DialogManager;
