import { actionTypes } from '../reducers';

export const acAddMetadata = metadata => ({
    type: actionTypes.ADD_METADATA,
    value: metadata,
});
