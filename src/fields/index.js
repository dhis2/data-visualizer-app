import {
    getAllFieldsByType,
    excludeFields,
    excludedFields,
} from './baseFields';
import { extendFields } from './nestedFields';

export const getFieldsByType = type =>
    getAllFieldsByType(type)
        .filter(excludeFields)
        .map(extendFields)
        .concat(excludedFields.map(field => `!${field}`))
        .join(',');
