import {
    getAllFieldObjectsByType,
    extractName,
    markExcluded,
    moveExcludedToEnd,
} from './baseFields.js'
import { extendFields } from './nestedFields.js'

export const getFieldsStringByType = (type) =>
    getAllFieldObjectsByType(type)
        .map(markExcluded)
        .map(extractName)
        .sort()
        .reduce(moveExcludedToEnd, null)
        .map(extendFields)
        .join(',')
