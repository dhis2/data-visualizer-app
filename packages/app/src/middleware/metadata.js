import { acAddMetadata } from '../actions/metadata';

export default ({ dispatch }) => next => action => {
    typeof action.metadata === 'object' &&
        !Array.isArray(action.metadata) &&
        dispatch(acAddMetadata(action.metadata));

    next(action);
};
