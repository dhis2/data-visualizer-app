import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '../Chip';
import { sGetUiLayout } from '../../../reducers/ui';
import { decodeDataTransfer } from '../../../dnd';
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../../actions/ui';
import { colors } from '../../../colors';
import * as defaultLayoutStyle from './defaultStyle';
import * as layoutStyle from '../style';
import { AXIS_NAMES } from '../../../layout';

const styles = {
    axisContainer: {
        display: 'flex',
        backgroundColor: layoutStyle.AXIS_BACKGROUND_COLOR,
        borderColor: layoutStyle.AXIS_BORDER_COLOR,
        borderStyle: layoutStyle.AXIS_BORDER_STYLE,
        borderWidth: layoutStyle.AXIS_BORDER_WIDTH,
        padding: layoutStyle.AXIS_PADDING,
    },
    label: {
        minWidth: 55,
        maxWidth: 55,
        padding: '2px 0px 0px 0px',
        fontSize: 11,
        color: colors.greyDark,
        userSelect: 'none',
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        minHeight: defaultLayoutStyle.DIMENSION_AXIS_CONTENT_HEIGHT,
    },
};

const labels = {
    columns: i18n.t('Series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
    moveTo: i18n.t('Move to'),
    labels: i18n.t('Remove'),
};

const onDragOver = e => {
    e.preventDefault();
};

const getDropHandler = ({ axisName, onAddDimension }) => e => {
    const { dimensionId } = decodeDataTransfer(e);

    onAddDimension({
        [dimensionId]: axisName,
    });

    e.dataTransfer.clearData();
};

const getAxisMenuItems = (getClickHandler, axisName, dimensionId) =>
    AXIS_NAMES.filter(key => key !== axisName).map(key => (
        <MenuItem
            key={`${dimensionId}-to-${key}`}
            onClick={getClickHandler({ [dimensionId]: key })}
        >{`${labels.moveTo} ${labels[key]}`}</MenuItem>
    ));

const getRemoveMenuItem = (getClickHandler, dimensionId) => (
    <MenuItem
        key={`remove-${dimensionId}`}
        onClick={getClickHandler(dimensionId)}
    >
        {labels.remove}
    </MenuItem>
);

const getMenuItems = (
    getMoveHandler,
    getRemoveHandler,
    axisName,
    dimensionId
) => [
    ...getAxisMenuItems(getMoveHandler, axisName, dimensionId),
    ...getRemoveMenuItem(getRemoveHandler, dimensionId),
];

const Axis = ({
    axis,
    onAddDimension,
    getOpenHandler,
    getMoveHandler,
    getRemoveHandler,
    axisName,
    style,
}) => {
    return (
        <div
            id={axisName}
            style={{ ...styles.axisContainer, ...style }}
            onDragOver={onDragOver}
            onDrop={getDropHandler({ axisName, onAddDimension })}
        >
            <div style={styles.label}>{labels[axisName]}</div>
            <div style={styles.content}>
                {axis.map(dimensionId => (
                    <Chip
                        key={dimensionId}
                        onClick={getOpenHandler(dimensionId)}
                        axisName={axisName}
                        dimensionId={dimensionId}
                        menuItems={getMenuItems(
                            getMoveHandler,
                            getRemoveHandler,
                            axisName,
                            dimensionId
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    axis: sGetUiLayout(state)[ownProps.axisName],
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    getOpenHandler: dimensionId => () => alert(`Open ${dimensionId} selector`),
    getMoveHandler: object => () => dispatch(acAddUiLayoutDimensions(object)),
    getRemoveHandler: dimensionId => () =>
        dispatch(acRemoveUiLayoutDimensions(dimensionId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Axis);
