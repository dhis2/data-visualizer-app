import {
    getAllFieldsByType,
    extractName,
    markExcluded,
    moveExcludedToEnd,
} from './baseFields';
import { extendFields } from './nestedFields';

export const getFieldsByType = type =>
    getAllFieldsByType(type)
        .map(markExcluded)
        .map(extractName)
        .sort()
        .reduce(moveExcludedToEnd, null)
        .map(extendFields)
        .join(',');
