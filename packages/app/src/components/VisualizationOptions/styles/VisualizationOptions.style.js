import React from 'react' /* eslint-disable-line no-unused-vars */
import css from 'styled-jsx/css'

import { colors, spacers } from '@dhis2/ui-core'

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
`

export const tabSectionContent = css.resolve`
    div {
        overflow-y: auto;
    }
`

export const tabSectionTitle = css.resolve`
    span {
        display: inline-block;
        padding-bottom: ${spacers.dp16};
        font-size: ${spacers.dp16};
        color: ${colors.grey900};
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
