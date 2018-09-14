import React from 'react';
import { setDataTransfer } from '../../dnd';

const styles = {
    chip: {
        padding: 5,
        backgroundColor: '#bbdefb',
        color: '#000',
        margin: 2,
        cursor: 'pointer',
    },
};

const getDragStartHandler = source => e => setDataTransfer(e, source);

export default ({ axisName, dimensionId, dimensions }) =>
    dimensionId ? (
        <div
            data-dimensionid={dimensionId} // TODO dont use id twice
            style={styles.chip}
            draggable="true"
            onDragStart={getDragStartHandler(axisName)}
        >
            {dimensions[dimensionId].displayName}
        </div>
    ) : (
        ''
    );
