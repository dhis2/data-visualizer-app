import React from 'react';
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DataDimensionManager as DataDimension } from './DataDimension/DataDimensionManager';
import { PeriodDimension } from './PeriodDimension';
import { OrgUnitDimension } from './OrgUnitDimension';

const style = {
    paper: {
        maxHeight: 677,
        maxWidth: 795,
        margin: 0,
        border: '1px solid #CCCCCC',
        borderRadius: 0,
        boxShadow:
            '0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
    },
};

export const DialogManager = ({ classes, dialogIsOpen, id, toggleDialog }) => {
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
            classes={{ paper: classes.paper }}
        >
            {dimensionComponents[id]}
        </Dialog>
    ) : null;
};

export default withStyles(style)(DialogManager);
