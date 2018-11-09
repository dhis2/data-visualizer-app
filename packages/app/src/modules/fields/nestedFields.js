// constants

const ID = 'id';
const NAME = 'name,displayName,displayShortName';

const DIMENSION_ITEM = `dimensionItem~rename(${ID})`;
const LEGEND_SET = `legendSet[${ID},${NAME}]`;
const USER = `user[${NAME},userCredentials[username]]`;

const ITEMS = `items[${DIMENSION_ITEM},${NAME},dimensionItemType]`;
const COMMENTS = `comments[${ID},${USER},lastUpdated,text`;

const AXIS = `dimension,filter,${LEGEND_SET},${ITEMS}`;

// nested fields map
export const nestedFields = {
    columns: AXIS,
    rows: AXIS,
    filters: AXIS,
    user: USER,
    comments: COMMENTS,
};

export const extendFields = field =>
    `${field}${nestedFields[field] ? `[${nestedFields[field]}]` : ''}`;
