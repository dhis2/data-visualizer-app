import { actionTypes } from '../reducers';

export const acAddMetadata = value => ({
    type: actionTypes.ADD_METADATA,
    value,
});
