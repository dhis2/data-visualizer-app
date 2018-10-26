import React from 'react';
import { colors } from '../modules/colors';

export const UnselectedIcon = () => (
    <div style={{ minWidth: 20 }}>
        <div
            style={{
                position: 'relative',
                top: '30%',
                left: '38%',
                backgroundColor: colors.grey,
                height: 6,
                width: 6,
            }}
        />
    </div>
);
