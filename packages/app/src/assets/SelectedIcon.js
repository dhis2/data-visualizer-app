import React from 'react';
import { colors } from '../modules/colors';

export const SelectedIcon = () => (
    <div style={{ minWidth: 20 }}>
        <div
            style={{
                position: 'relative',
                top: '39%',
                left: '40%',
                backgroundColor: colors.accentPrimary,
                height: 6,
                width: 6,
            }}
        />
    </div>
);
