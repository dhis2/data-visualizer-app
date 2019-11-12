import React from 'react';
import css from 'styled-jsx/css';

import { colors } from '@dhis2/ui-core';

export const tabSection = css.resolve`
    fieldset {
        padding: 16px 0;
    }
`;

export const tabSectionLegend = css.resolve`
    legend {
        font-size: 16px;
        padding-top: 16px;
        color: ${colors.grey900};
    }
`;

export const tabSectionLabel = css.resolve`
    label.dense {
        padding-bottom: 16px;
    }

    label.grouped.dense {
        padding-bottom: 8px;
    }
`;
