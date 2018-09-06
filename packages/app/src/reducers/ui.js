export const actionTypes = {
    SET_SELECTED: 'SET_SELECTED',
    REMOVE_SELECTED: 'REMOVE_SELECTED',
};

export const DEFAULT_LAYOUT = {
    columns: [],
    rows: [],
    filter: [],
};

const LAYOUT_ID_POS = 0;
const LAYOUT_OBJ_POS = 1;

export default (state = DEFAULT_LAYOUT, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED: {
            const dimLayoutIds = state[action.value.layoutId];

            return {
                ...state,
                [action.value.layoutId]: dimLayoutIds.concat(
                    action.value.dimId
                ),
            };
        }
        case actionTypes.REMOVE_SELECTED: {
            const layoutIndex = Object.entries(state).find(item => {
                return item[LAYOUT_OBJ_POS].includes(action.value);
            })[LAYOUT_ID_POS];

            return {
                ...state,
                [layoutIndex]: state[layoutIndex].filter(
                    id => id !== action.value
                ),
            };
        }
        default:
            return state;
    }
};

export const sGetLayout = state => state.ui;

export const sGetSelected = state => [
    ...sGetLayout(state).columns,
    ...sGetLayout(state).rows,
    ...sGetLayout(state).filter,
];
