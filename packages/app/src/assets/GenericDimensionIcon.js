import React from 'react';

const styles = {
    icon: {
        paddingRight: '6px',
    },
};

const GenericDimensionIcon = ({ style }) => {
    return (
        <div
            style={{
                ...styles.icon,
                ...style,
            }}
        >
            <div
                style={{
                    height: 4,
                    width: 4,
                    border: '1px solid #494949',
                    borderRadius: 1,
                }}
            />
        </div>
    );
};

export default GenericDimensionIcon;
