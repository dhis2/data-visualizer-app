import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Radio,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui'

import styles from './styles/AxisSetup.module.css'
import { axis1, axis2 } from './constants'
import { sGetUiActiveModalDialog, DEFAULT_UI, sGetUi } from '../../reducers/ui'
import { sGetAxisSetupItems } from '../../reducers'
import { acSetAxes, acSetUiActiveModalDialog } from '../../actions/ui'
import { acSetCurrentFromUi } from '../../actions/current'

export const AXIS_SETUP_DIALOG_ID = 'axisSetup'

const AxisSetup = ({ isOpen, onUpdateClick, initItems, onCancelClick }) => {
    const [items, setItems] = useState()

    useEffect(() => {
        setItems(
            initItems.reduce((itemsMap, item) => {
                itemsMap[item.id] = item
                return itemsMap
            }, {})
        )
    }, [initItems])

    const onAxisChange = (item, axis) => {
        setItems({
            ...items,
            [item.id]: {
                ...item,
                axis,
            },
        })
    }

    const getAxes = () => {
        const axes = Object.keys(items).reduce((map, id) => {
            const axis = items[id].axis

            if (axis > 0) {
                map[id] = axis
            }

            return map
        }, {})

        return Object.keys(axes).length > 0 ? axes : DEFAULT_UI.axes
    }

    const renderTable = () => {
        return (
            <Table className={styles.table}>
                <colgroup>
                    <col className={styles.nameColumn} />
                    <col className={styles.coloredColumn} />
                    <col className={styles.axisColumn} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell className={styles.centered}>
                            {i18n.t('Axis 1')}
                        </TableCell>
                        <TableCell className={styles.centered}>
                            {i18n.t('Axis 2')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(items).map(id => {
                        const item = items[id]

                        return (
                            <TableRow key={`multiaxis-table-row-${id}`}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Radio
                                        onChange={() =>
                                            onAxisChange(item, axis1)
                                        }
                                        checked={item.axis === axis1}
                                    />
                                </TableCell>
                                <TableCell className={styles.centered}>
                                    <Radio
                                        onChange={() =>
                                            onAxisChange(item, axis2)
                                        }
                                        checked={item.axis === axis2}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }

    return (
        isOpen && (
            <Modal onClose={onCancelClick}>
                <ModalTitle>{i18n.t('Manage axes')}</ModalTitle>
                <ModalContent>
                    <p>
                        {i18n.t(
                            'A chart can have two axes. Each axis will have its own scale. Set the axis for each data selection below.'
                        )}
                    </p>
                    {items && renderTable()}
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button onClick={onCancelClick}>
                            {i18n.t('Cancel')}
                        </Button>
                        <Button
                            primary
                            onClick={() => onUpdateClick(getAxes())}
                        >
                            {i18n.t('Update')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )
    )
}

AxisSetup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onUpdateClick: PropTypes.func.isRequired,
    initItems: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.number.isRequired,
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    onCancelClick: PropTypes.func,
}

AxisSetup.defaultProps = {
    isOpen: false,
    initItems: [],
    onUpdateClick: Function.prototype,
    onCancelClick: Function.prototype,
}

const mapStateToProps = state => ({
    isOpen: sGetUiActiveModalDialog(state) === AXIS_SETUP_DIALOG_ID,
    initItems: sGetAxisSetupItems(state),
})

const mapDispatchToProps = {
    onUpdateClick: axes => (dispatch, getState) => {
        dispatch(acSetAxes(axes))
        dispatch(
            acSetCurrentFromUi({
                ...sGetUi(getState()),
                axes,
            })
        )
        dispatch(acSetUiActiveModalDialog())
    },
    onCancelClick: () => dispatch => dispatch(acSetUiActiveModalDialog()),
}

export default connect(mapStateToProps, mapDispatchToProps)(AxisSetup)
