import React from 'react';

const styles = {
    chip: {
        padding: 5,
        backgroundColor: '#bbdefb',
        color: '#000',
        margin: 2,
    },
};

export default ({ dimensionId, dimensions }) => {
    console.log(
        'Chip dimensionId:',
        dimensionId,
        'of dimensions:',
        dimensions[dimensionId]
    );
    return dimensionId ? (
        <div style={styles.chip} draggable="true">
            {dimensions[dimensionId].displayName}
        </div>
    ) : (
        ''
    );
};
