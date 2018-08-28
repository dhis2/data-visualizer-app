export const actionTypes = {
    SET_CURRENT: 'SET_CURRENT',
};

export const DEFAULT_CURRENT = {};

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT: {
            return action.value;
        }
        default:
            return state;
    }
};

export const sGetFromState = state => state.current;
