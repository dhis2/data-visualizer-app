import { getAxesFromUi, getOptionsFromUi } from '../current';

export const SET_CURRENT = 'SET_CURRENT';
export const SET_CURRENT_FROM_UI = 'SET_CURRENT_FROM_UI';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

export const DEFAULT_CURRENT = {};

const getYearOnYearCurrent = (state, action) => ({
    ...state,
    yearlySeries: action.value.yearOnYearSeries,
    columns: [
        {
            dimension: 'pe',
            items: [{ id: action.value.yearOnYearCategory }],
        },
    ],
    rows: [
        {
            dimension: 'dx',
            items: [{ id: action.value.itemsByDimension.dx[0] }],
        },
    ],
    filters: getAxesFromUi(action.value).filters,
    ...getOptionsFromUi(action.value),
    type: action.value.type,
});

export default (state = DEFAULT_CURRENT, action) => {
    switch (action.type) {
        case SET_CURRENT: {
            return action.value;
        }
        case SET_CURRENT_FROM_UI: {
            switch (action.value.type) {
                case 'YEAR_ON_YEAR':
                    return getYearOnYearCurrent(state, action);
                default: {
                    const axesFromUi = getAxesFromUi(action.value);
                    const optionsFromUi = getOptionsFromUi(action.value);

                    return {
                        ...state,
                        ...axesFromUi,
                        ...optionsFromUi,
                        type: action.value.type,
                    };
                }
            }
        }
        case CLEAR_CURRENT:
            return DEFAULT_CURRENT;
        default:
            return state;
    }
};

// Selectors

export const sGetCurrent = state => state.current;
