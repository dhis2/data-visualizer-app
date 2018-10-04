import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import Menu from './Menu';
import { setDataTransfer } from '../../dnd';
import { sGetDimensions } from '../../reducers/dimensions';
import * as layoutStyle from './style';
import { sGetUiItems } from '../../reducers/ui';

const styles = {
    chip: {
        maxHeight: layoutStyle.CHIP_HEIGHT,
        margin: layoutStyle.CHIP_MARGIN,
        padding: layoutStyle.CHIP_PADDING,
        fontSize: layoutStyle.CHIP_FONT_SIZE,
        fontWeight: layoutStyle.CHIP_FONT_WEIGHT,
        backgroundColor: layoutStyle.CHIP_BACKGROUND_COLOR,
        color: layoutStyle.CHIP_COLOR,
        borderRadius: layoutStyle.CHIP_BORDER_RADIUS,
        display: 'flex',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    menuWrapper: {
        marginLeft: 2,
    },
};

const getDragStartHandler = source => e => setDataTransfer(e, source);

const renderChip = (dimensionName, items, axisName, dimensionId, menuItems) => {
    const itemsLabel = `: ${items.length} ${i18n.t('selected')}`;
    const chipLabel = `${dimensionName}${items.length > 0 ? itemsLabel : ''}`;

    return (
        <div
            data-dimensionid={dimensionId}
            style={styles.chip}
            draggable="true"
            onDragStart={getDragStartHandler(axisName)}
        >
            {chipLabel}
            <div style={styles.menuWrapper}>
                <Menu id={dimensionId} menuItems={menuItems} />
            </div>
        </div>
    );
};

const Chip = ({ dimensionName, items, axisName, dimensionId, menuItems }) =>
    dimensionId
        ? renderChip(dimensionName, items, axisName, dimensionId, menuItems)
        : '';

const mapStateToProps = state => ({
    dimensions: sGetDimensions(state),
    itemsByDimension: sGetUiItems(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    dimensionName: stateProps.dimensions[ownProps.dimensionId].displayName,
    items: stateProps.itemsByDimension[ownProps.dimensionId] || [],
    ...ownProps,
});

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(Chip);
