import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension';

export const DialogManager = ({ dialogIsOpen, id, toggleDialog }) => {
    const dimensionComponents = {
        dx: <DataDimension toggleDialog={toggleDialog} />,
        pe: <PeriodDimension toggleDialog={toggleDialog} />,
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
