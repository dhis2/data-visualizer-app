import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import { DataDimensionManager as DataDimension } from './DataDimension/DataDimensionManager';
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
    updateButton: {
        backgroundColor: '#004BA0',
    },
    updateText: {
        fontSize: 13,
        letterSpacing: 0.46,
        color: 'white',
    },
    hideText: {
        fontSize: 13,
        letterSpacing: 0.46,
        color: '#004BA0',
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
                    <span style={style.hideText}>{i18n.t(HIDE)}</span>
                </Button>
                <Button
                    variant={'outlined'}
                    style={style.updateButton}
                    onClick={() => toggleDialog(null)}
                >
                    <span style={style.updateText}>{i18n.t(UPDATE)}</span>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(style)(DialogManager);
