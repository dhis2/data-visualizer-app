import { colors, spacers } from '@dhis2/ui'
import React from 'react' /* eslint-disable-line no-unused-vars */
import css from 'styled-jsx/css'

export const tabBar = css.resolve`
    div {
        padding-inline-end: ${spacers.dp24};
    }
`

export const tabContent = css.resolve`
    div {
        overflow: auto;
        padding-inline-end: ${spacers.dp24};
    }
`

export const tabSection = css.resolve`
    div {
        padding-block-start: ${spacers.dp16};
        padding-block-end: ${spacers.dp16};
        padding-inline-start: 0;
        padding-inline-end: 0;
    }
    div:not(:last-child) {
        border-block-end: 1px solid ${colors.grey300};
        margin-block-end: ${spacers.dp8};
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
        padding-block-end: ${spacers.dp12};
        font-size: 15px;
        color: ${colors.grey900};
        font-weight: 500;
        letter-spacing: 0.2px;
    }
`

export const tabSectionTitleDisabled = css.resolve`
    span {
        color: ${colors.grey600};
    }
`

export const tabSectionTitleMargin = css.resolve`
    span {
        margin-block-start: ${spacers.dp8};
    }
`

export const tabSectionOption = css.resolve`
    div:not(:last-child):not(.inline) {
        padding-block-end: ${spacers.dp16};
    }
`

export const tabSectionOptionItem = css.resolve`
    div:not(:last-child) {
        padding-block-end: ${spacers.dp8};
    }
`

export const tabSectionOptionText = css.resolve`
    p {
        margin: 0;
        padding-block-end: ${spacers.dp8};
        font-size: 14px;
        line-height: 19px;
        color: ${colors.grey700};
    }
`

export const tabSectionOptionToggleable = css.resolve`
    div {
        margin-block-start: ${spacers.dp4};
        margin-block-end: 0;
        margin-inline-start: 23px;
        margin-inline-end: 0;
    }
`

export const tabSectionToggleableSubsection = css.resolve`
    div {
        margin-inline-start: 23px;
    }
`

export const tabSectionOptionComplexInline = css.resolve`
    div {
        display: flex;
    }
`

export const tabSectionOptionIcon = css.resolve`
    span {
        vertical-align: top;
        margin-inline-end: ${spacers.dp4};
        color: ${colors.grey600};
    }
`
