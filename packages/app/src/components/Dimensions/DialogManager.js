import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import { DataDimensionContent as DataDimension } from './DataDimension/DialogContent';
import { PeriodDimension } from './PeriodDimension';
import { OrgUnitDimension } from './OrgUnitDimension';

const style = {
    paper: {
        maxHeight: 677,
        maxWidth: 820,
        width: 820,
        margin: 0,
        border: '1px solid #CCCCCC',
        borderRadius: 0,
        boxShadow:
            '0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
    },
    dialogContent: {
        width: 759,
        padding: 0,
        paddingLeft: 24,
        paddingRight: 24,
    },
    dialogActions: {
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 24,
        height: 84,
        borderTop: '1px solid #ECEFF1',
    },
};

const dimensionComponents = {
    dx: <DataDimension />,
    pe: <PeriodDimension />,
    ou: <OrgUnitDimension />,
};

const HIDE = 'HIDE';
const UPDATE = 'UPDATE';

export const DialogManager = ({ classes, dialogIsOpen, id, toggleDialog }) => {
    return (
        <Dialog
            open={dialogIsOpen}
            onClose={() => toggleDialog(null)}
            maxWidth={false}
            classes={{ paper: classes.paper }}
        >
            <DialogContent style={style.dialogContent}>
                {dimensionComponents[id]}
            </DialogContent>
            <DialogActions style={style.dialogActions}>
                <Button onClick={() => toggleDialog(null)}>
                    {i18n.t(HIDE)}
                </Button>
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    onClick={() => toggleDialog(null)}
                >
                    {i18n.t(UPDATE)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(style)(DialogManager);
