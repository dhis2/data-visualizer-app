export const SET_RECOMMENDED_IDS = 'SET_RECOMMENDED_IDS';
export const SET_PREVIOUS_REQUESTED_IDS = 'SET_PREVIOUS_REQUESTED_IDS';

const getDimensionIds = array =>
    Array.isArray(array) && array.length ? array.map(obj => obj.id) : [];

export const DEFAULT_RECOMMENDED_IDS = {
    fetchedIds: [],
    previousRequestedIds: {
        dx: [],
        ou: [],
    },
};

export default (state = DEFAULT_RECOMMENDED_IDS, action) => {
    switch (action.type) {
        case SET_RECOMMENDED_IDS: {
            return { ...state, fetchedIds: getDimensionIds(action.value) };
        }
        case SET_PREVIOUS_REQUESTED_IDS: {
            return {
                ...state,
                previousRequestedIds: action.value,
            };
        }
        default:
            return state;
    }
};

// Selectors
export const sGetRecommended = state => state.recommendedIds;

export const sGetFetchedIds = state => sGetRecommended(state).fetchedIds;
export const sGetPreviousRequestedIds = state =>
    sGetRecommended(state).previousRequestedIds;
