import React from 'react';
import { connect } from 'react-redux';

import { setDataTransfer } from '../../dnd';
import { sGetDimensions } from '../../reducers/dimensions';

const styles = {
    chip: {
        height: 28,
        margin: 8,
        padding: 8,
        fontSize: 14,
        backgroundColor: '#bbdefb',
        color: '#000',
        borderRadius: 5,
        cursor: 'pointer',
    },
};

const getDragStartHandler = source => e => setDataTransfer(e, source);

const Chip = ({ axisName, dimensionId, dimensions }) =>
    dimensionId ? (
        <div
            data-dimensionid={dimensionId}
            style={styles.chip}
            draggable="true"
            onDragStart={getDragStartHandler(axisName)}
        >
            {dimensions[dimensionId].displayName}
        </div>
    ) : (
        ''
    );

const mapStateToProps = state => ({
    dimensions: sGetDimensions(state),
});

export default connect(mapStateToProps)(Chip);
