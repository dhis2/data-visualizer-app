import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import map from 'lodash-es/map';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import styles from './styles/AxisSetup.style';
import { axis1, axis2 } from './constants';

class AxisSetup extends Component {
    state = {
        items: undefined,
    };

    componentDidMount() {
        const itemsMap = this.props.items.reduce(
            (itemsMap, item) => ({ ...itemsMap, [item.id]: item }),
            {}
        );

        this.setState({
            items: itemsMap,
        });
    }

    onAxisChange = (item, axis) => {
        this.setState({
            items: {
                ...this.state.items,
                [item.id]: {
                    ...item,
                    axis,
                },
            },
        });
    };

    onUpdateClick = () => {
        const itemsArray = map(this.state.items, item => item);

        this.props.onUpdateClick(itemsArray);
    };

    renderTable() {
        const { classes } = this.props;

        return (
            <Table>
                <colgroup>
                    <col className={classes.nameColumn} />
                    <col
                        className={`${classes.axisColumn} ${
                            classes.coloredColumn
                        }`}
                    />
                    <col className={classes.axisColumn} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell
                            className={`${classes.tableCell} ${classes.head}`}
                            align="center"
                        >
                            {i18n.t('Axis 1')}
                        </TableCell>
                        <TableCell
                            className={`${classes.tableCell} ${classes.head}`}
                            align="center"
                        >
                            {i18n.t('Axis 2')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(this.state.items).map(id => {
                        const item = this.state.items[id];

                        return (
                            <TableRow key={`multiaxis-table-row-${id}`}>
                                <TableCell className={classes.tableCell}>
                                    {item.name}
                                </TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    align="center"
                                >
                                    <Radio
                                        onClick={() =>
                                            this.onAxisChange(item, axis1)
                                        }
                                        checked={item.axis === axis1}
                                        className={classes.axisRadio}
                                    />
                                </TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    align="center"
                                >
                                    <Radio
                                        onClick={() =>
                                            this.onAxisChange(item, axis2)
                                        }
                                        checked={item.axis === axis2}
                                        className={classes.axisRadio}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    render() {
        const { classes, isOpened, dialogMaxWidth, onCancelClick } = this.props;

        return (
            <Dialog
                open={isOpened}
                maxWidth={dialogMaxWidth}
                onClose={onCancelClick}
                disableEnforceFocus
            >
                <DialogTitle>{i18n.t('Multi-axes chart')}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <p>
                        {i18n.t(
                            'A chart can have two axes. Each axis will have its own scale. Set the axis for each data selection below.'
                        )}
                    </p>
                    <div className={classes.tableContainer}>
                        {this.state.items && this.renderTable()}
                    </div>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button
                        color="primary"
                        disableRipple
                        disableFocusRipple
                        onClick={onCancelClick}
                    >
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.onUpdateClick}
                    >
                        {i18n.t('Update')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AxisSetup.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            axis: PropTypes.number.isRequired,
        })
    ),
    onUpdateClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func,
    dialogMaxWidth: PropTypes.string,
};

AxisSetup.defaultProps = {
    onCancelClick: () => {},
    dialogMaxWidth: 'lg',
};

export default withStyles(styles)(AxisSetup);
