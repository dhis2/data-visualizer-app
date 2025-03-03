// constants

import { dimensionMetadataProps } from '../visualization.js'

const ID = 'id'
const NAME = 'name,displayName,displayShortName'

const DIMENSION_ITEM = `dimensionItem~rename(${ID})`
const LEGEND_SET = `${ID},${NAME}`
const USER = `${NAME},userCredentials[username]`

const ITEMS = `${DIMENSION_ITEM},${NAME},dimensionItemType,expression,access`

const AXIS = `dimension,filter,legendSet[${LEGEND_SET}],items[${ITEMS}]`
const INTERPRETATIONS = 'id,created'
const LEGEND = `showKey,style,strategy,set[${LEGEND_SET}]`

const OPTION_SET = `optionSet[${ID}]`

const DIMENSION_PROPS = dimensionMetadataProps
    .map((prop) => {
        if (prop === 'programAttribute') {
            return `${prop}[${ITEMS},attribute[${OPTION_SET}]]`
        } else if (prop === 'programDataElement') {
            return `${prop}[${ITEMS},dataElement[${OPTION_SET}]]`
        } else {
            return `${prop}[${ITEMS}]`
        }
    })
    .join(',')

// nested fields map
export const nestedFields = {
    columns: AXIS,
    rows: AXIS,
    filters: AXIS,
    user: USER,
    interpretations: INTERPRETATIONS,
    legend: LEGEND,
    dataDimensionItems: DIMENSION_PROPS,
}

export const extendFields = (field) =>
    `${field}${nestedFields[field] ? `[${nestedFields[field]}]` : ''}`
