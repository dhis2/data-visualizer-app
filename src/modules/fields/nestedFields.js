// constants

import { dimensionMetadataProps } from '../visualization.js'

const ID = 'id'
const NAME = 'name,displayName,displayShortName'

const DIMENSION_ITEM = `dimensionItem~rename(${ID})`
const LEGEND_SET = `${ID},${NAME}`

const ITEMS = `${DIMENSION_ITEM},${NAME},dimensionItemType,expression,access`

const AXIS = `dimension,filter,legendSet[${LEGEND_SET}],items[${ITEMS}]`
const INTERPRETATIONS = 'id,created'
const LEGEND = `showKey,style,strategy,set[${LEGEND_SET}]`

const DIMENSION_PROPS = dimensionMetadataProps
    .map((prop) => `${prop}[${ITEMS}]`)
    .join(',')
const DIMENSION_ITEMS = `dataDimensionItemType,${DIMENSION_PROPS}`

// nested fields map
const nestedFields = {
    columns: AXIS,
    rows: AXIS,
    filters: AXIS,
    interpretations: INTERPRETATIONS,
    legend: LEGEND,
    dataDimensionItems: DIMENSION_ITEMS,
}

export const extendFields = (field) =>
    `${field}${nestedFields[field] ? `[${nestedFields[field]}]` : ''}`
