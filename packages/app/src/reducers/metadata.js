export const actionTypes = {
    ADD_METADATA: 'ADD_METADATA',
};

export const DEFAULT_METADATA = {
    Uvn6LCg7dVU: {
        name: 'ANC 1 Coverage',
    },
    sB79w2hiLp8: {
        name: 'ANC 3 Coverage',
    },
};

export default (state = DEFAULT_METADATA, action) => {
    switch (action.type) {
        case actionTypes.ADD_METADATA: {
            return {
                ...state,
                ...action.value,
            };
        }
        default:
            return state;
    }
};

// Selectors

export const sGetMetadata = state => state.metadata;
