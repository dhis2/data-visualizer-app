export const SET_RECOMMENDED_IDS = 'SET_RECOMMENDED_IDS';
export const SET_PREVIOUS_REQUESTED_IDS = 'SET_PREVIOUS_REQUESTED_IDS';
export const CLEAR_RECOMMENDED_IDS = 'CLEAR_RECOMMENDED_IDS';

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
            return {
                ...state,
                fetchedIds: action.value,
            };
        }
        case SET_PREVIOUS_REQUESTED_IDS: {
            return {
                ...state,
                previousRequestedIds: action.value,
            };
        }
        case CLEAR_RECOMMENDED_IDS: {
            return DEFAULT_RECOMMENDED_IDS;
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
