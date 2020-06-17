import React from 'react' /* eslint-disable-line no-unused-vars */
import css from 'styled-jsx/css'

import { colors, spacers } from '@dhis2/ui'

// TODO: remove exports that aren't used anymore

export const tabBar = css.resolve`
    div {
        position: sticky;
        top: 0;
    }
`

export const tabSection = css.resolve`
    div {
        padding: ${spacers.dp16} 0;
    }
    div:not(:last-child) {
        border-bottom: 1px solid ${colors.grey300};
        margin-bottom: ${spacers.dp8};
    }
`

export const tabSectionContent = css.resolve`
    div {
        overflow-y: auto;
    }
`

export const tabSectionTitle = css.resolve`
    span {
        display: inline-block;
        padding-bottom: ${spacers.dp12};
        font-size: 15px;
        color: ${colors.grey900};
        font-weight: 500;
        letter-spacing: 0.2px;
    }
`

export const tabSectionOption = css.resolve`
    div:not(:last-child):not(.inline) {
        padding-bottom: ${spacers.dp16};
    }
`

export const tabSectionOptionItem = css.resolve`
    div:not(:last-child) {
        padding-bottom: ${spacers.dp8};
    }
`

export const tabSectionOptionText = css.resolve`
    p {
        font-size: ${spacers.dp14};
        padding-bottom: ${spacers.dp16};
    }
`

export const tabSectionOptionToggleable = css.resolve`
    div {
        margin: ${spacers.dp4} 0 0 23px;
    }
`

export const tabSectionOptionComplexInline = css.resolve`
    div {
        display: flex;
        align-items: center;
    }
`
