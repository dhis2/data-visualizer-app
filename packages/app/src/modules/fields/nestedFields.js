// constants

const ID = 'id'
const NAME = 'name,displayName,displayShortName'

const DIMENSION_ITEM = `dimensionItem~rename(${ID})`
const LEGEND_SET = `${ID},${NAME}`
const USER = `${NAME},userCredentials[username]`

const ITEMS = `${DIMENSION_ITEM},${NAME},dimensionItemType`

const AXIS = `dimension,filter,legendSet[${LEGEND_SET}],items[${ITEMS}]`
const INTERPRETATIONS = 'id,created'
const LEGEND = `showKey,style,strategy,set[${LEGEND_SET}]`

// nested fields map
export const nestedFields = {
    columns: AXIS,
    rows: AXIS,
    filters: AXIS,
    user: USER,
    interpretations: INTERPRETATIONS,
    legend: LEGEND,
}

export const extendFields = (field) =>
    `${field}${nestedFields[field] ? `[${nestedFields[field]}]` : ''}`
