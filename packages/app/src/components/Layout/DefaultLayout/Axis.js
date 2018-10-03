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

const axisLabels = {
    columns: i18n.t('Series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
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

const getMenuItems = (dimensionId, axisName, layout, onMenuItemClick) => {
    const menuItems = Object.keys(layout)
        .filter(key => key !== axisName)
        .map(key => (
            <MenuItem
                key={`${dimensionId}-to-${key}`}
                onClick={onMenuItemClick(
                    acAddUiLayoutDimensions({ [dimensionId]: key })
                )}
            >{`${i18n.t('Move to')} ${axisLabels[key]}`}</MenuItem>
        ));

    menuItems.push(
        <MenuItem
            key={`remove-${dimensionId}`}
            onClick={onMenuItemClick(acRemoveUiLayoutDimensions(dimensionId))}
        >
            {i18n.t('Remove')}
        </MenuItem>
    );

    return menuItems;
};

const Axis = ({ layout, onAddDimension, onMenuItemClick, axisName, style }) => {
    const axis = layout[axisName];

    return (
        <div
            id={axisName}
            style={{ ...styles.axisContainer, ...style }}
            onDragOver={onDragOver}
            onDrop={getDropHandler({ axisName, onAddDimension })}
        >
            <div style={styles.label}>{axisLabels[axisName]}</div>
            <div style={styles.content}>
                {axis.map(dimensionId => (
                    <Chip
                        key={dimensionId}
                        axisName={axisName}
                        dimensionId={dimensionId}
                        menuItems={getMenuItems(
                            dimensionId,
                            axisName,
                            layout,
                            onMenuItemClick
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    onMenuItemClick: action => () => dispatch(action),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Axis);
