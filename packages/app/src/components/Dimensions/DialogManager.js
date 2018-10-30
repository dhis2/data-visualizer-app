import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

export const DialogManager = ({ dialogIsOpen, id, toggleDialog }) => {
    const dimensionComponents = {
        [dxId]: <DataDimension toggleDialog={toggleDialog} />,
        [peId]: <OrgUnitDimension toggleDialog={toggleDialog} />,
        [ouId]: <PeriodDimension toggleDialog={toggleDialog} />,
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
