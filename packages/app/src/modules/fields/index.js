import {
    getAllFieldObjectsByType,
    extractName,
    markExcluded,
    moveExcludedToEnd,
} from './baseFields.js'
import { extendFields } from './nestedFields.js'

export { getAllFieldObjectsByType }

export const getOptionsByType = type =>
    getAllFieldObjectsByType(type).filter(fieldObj => fieldObj.option === true)

export const getIncludedByType = type =>
    getAllFieldObjectsByType(type).filter(fieldObj => !fieldObj.excluded)

export const getExcludedByType = type =>
    getAllFieldObjectsByType(type).filter(
        fieldObj => fieldObj.excluded === true
    )

export const getFieldsStringByType = type =>
    getAllFieldObjectsByType(type)
        .map(markExcluded)
        .map(extractName)
        .sort()
        .reduce(moveExcludedToEnd, null)
        .map(extendFields)
        .join(',')
