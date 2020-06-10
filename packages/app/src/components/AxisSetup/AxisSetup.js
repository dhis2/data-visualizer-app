import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import isEqual from 'lodash-es/isEqual';

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
import { sGetUiActiveModalDialog, DEFAULT_UI, sGetUi } from '../../reducers/ui';
import { sGetAxisSetupItems } from '../../reducers';
import { acSetAxes, acSetUiActiveModalDialog } from '../../actions/ui';
import { acSetCurrentFromUi } from '../../actions/current';

export const AXIS_SETUP_DIALOG_ID = 'axisSetup';

class AxisSetup extends Component {
    state = {
        items: undefined,
    };

    componentDidMount() {
        this.setItems(this.props.items);
    }

    componentDidUpdate(prevProps) {
        const oldItems = prevProps.items;
        const newItems = this.props.items;

        if (!isEqual(oldItems, newItems)) {
            this.setItems(newItems);
        }
    }

    setItems = items => {
        const itemsMap = items.reduce((itemsMap, item) => {
            itemsMap[item.id] = item;
            return itemsMap;
        }, {});

        this.setState({
            items: itemsMap,
        });
    };

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

    getAxes = () => {
        const axes = Object.keys(this.state.items).reduce((map, id) => {
            const axis = this.state.items[id].axis;

            if (axis > 0) {
                map[id] = axis;
            }

            return map;
        }, {});

        return Object.keys(axes).length > 0 ? axes : DEFAULT_UI.axes;
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
                        <TableCell className={classes.head} />
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
        const { classes, isOpen, dialogMaxWidth, onCancelClick } = this.props;

        return (
            <Dialog
                open={isOpen}
                maxWidth={dialogMaxWidth}
                onClose={onCancelClick}
                disableEnforceFocus
            >
                <DialogTitle>{i18n.t('Manage axes')}</DialogTitle>
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
                        onClick={() =>
                            this.props.onUpdateClick(
                                this.getAxes(),
                                this.props.ui
                            )
                        }
                    >
                        {i18n.t('Update')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AxisSetup.propTypes = {
    classes: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
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
    classes: {},
    isOpen: false,
    items: [],
    onUpdateClick: Function.prototype,
    onCancelClick: Function.prototype,
    dialogMaxWidth: 'md',
};

const mapStateToProps = state => ({
    isOpen: sGetUiActiveModalDialog(state) === AXIS_SETUP_DIALOG_ID,
    items: sGetAxisSetupItems(state),
    ui: sGetUi(state),
});

const mapDispatchToProps = dispatch => ({
    onUpdateClick: (axes, ui) => {
        dispatch(acSetAxes(axes));
        dispatch(
            acSetCurrentFromUi({
                ...ui,
                axes,
            })
        );
        dispatch(acSetUiActiveModalDialog());
    },
    onCancelClick: () => dispatch(acSetUiActiveModalDialog()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AxisSetup));
