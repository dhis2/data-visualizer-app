import React from 'react';
import css from 'styled-jsx/css';

import { colors } from '@dhis2/ui-core';

export const tabBar = css.resolve`
    div {
        position: sticky;
        top: 0;
    }
`;

export const tabSection = css.resolve`
    div {
        padding: 16px 0;
    }
`;

export const tabSectionContent = css.resolve`
    div {
        overflow-y: auto;
    }
`;

export const tabSectionTitle = css.resolve`
    span {
        display: inline-block;
        padding-bottom: 16px;
        font-size: 16px;
        color: ${colors.grey900};
    }
`;

export const tabSectionOption = css.resolve`
    div:not(:last-child):not(.inline) {
        padding-bottom: 16px;
    }
`;

export const tabSectionOptionItem = css.resolve`
    div:not(:last-child) {
        padding-bottom: 8px;
    }
`;

export const tabSectionOptionText = css.resolve`
    p {
        font-size: 14px;
    }
`;

export const tabSectionOptionToggleable = css.resolve`
    div {
        margin: 4px 0 0 23px;
    }
`;

export const tabSectionOptionComplexInline = css.resolve`
    div {
        display: flex;
        align-items: center;
    }
`;
