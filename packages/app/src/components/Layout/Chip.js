import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

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
        borderRadius: 5,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

const getDragStartHandler = source => e => setDataTransfer(e, source);

const renderChip = (dimensions, itemsByDimension, axisName, dimensionId) => {
    const dimensionLabel = dimensions[dimensionId].displayName;

    const items = itemsByDimension[dimensionId] || [];
    const itemsLabel = `: ${items.length} ${
        items.length > 1 ? i18n.t('items') : i18n.t('item')
    }`;

    const chipLabel = `${dimensionLabel}${items.length > 0 ? itemsLabel : ''}`;

    return (
        <div
            data-dimensionid={dimensionId}
            style={styles.chip}
            draggable="true"
            onDragStart={getDragStartHandler(axisName)}
        >
            {chipLabel}
        </div>
    );
};

const Chip = ({ dimensions, itemsByDimension, axisName, dimensionId }) =>
    dimensionId
        ? renderChip(dimensions, itemsByDimension, axisName, dimensionId)
        : '';

const mapStateToProps = state => ({
    dimensions: sGetDimensions(state),
    itemsByDimension: sGetUiItems(state),
});

export default connect(mapStateToProps)(Chip);
