import options from '../options';
import { getPropsByKeys } from '../util';
import { layoutKeys, getItemsByDimensionFromVisualization } from '../layout';

export const actionTypes = {
    SET_UI: 'SET_UI',
    SET_UI_FROM_VISUALIZATION: 'SET_UI_FROM_VISUALIZATION',
    SET_UI_TYPE: 'SET_UI_TYPE',
    SET_IU_OPTIONS: 'SET_IU_OPTIONS',
    SET_UI_LAYOUT: 'SET_UI_LAYOUT',
    SET_UI_ITEMS: 'SET_UI_ITEMS',
};

const DEFAULT_STATE = {
    options,
    layout: {
        columns: ['dx'],
        rows: ['pe'],
        filters: ['ou'],
    },
    itemsByDimension: {
        dx: [],
        pe: ['LAST_12_MONTHS'],
        ou: ['USER_ORGUNIT'],
    },
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_UI: {
            return {
                ...action.value,
            };
        }
        case actionTypes.SET_IU_FROM_VISUALIZATION: {
            return {
                type: action.value.type,
                options: getPropsByKeys(action.value, Object.keys(options)),
                layout: getPropsByKeys(action.value, layoutKeys),
                itemsByDimension: getItemsByDimensionFromVisualization(
                    action.value
                ),
            };
        }
        case actionTypes.SET_UI_TYPE: {
            return {
                ...state,
                type: action.value,
            };
        }
        case actionTypes.SET_IU_OPTIONS: {
            return {
                ...state,
                options: action.value,
            };
        }
        case actionTypes.SET_UI_LAYOUT: {
            return {
                ...state,
                layout: action.value,
            };
        }
        case actionTypes.SET_UI_ITEMS: {
            return {
                ...state,
                itemsByDimension: {
                    ...state.itemsByDimension,
                    [action.id]: action.value,
                },
            };
        }
        default:
            return state;
    }
};

// selectors

export const sGetFromState = state => state.ui;

export const sGetUiOptions = state => sGetFromState(state).options;
export const sGetUiLayout = state => sGetFromState(state).layout;
export const sGetUiItems = state => sGetFromState(state).itemsByDimension;
