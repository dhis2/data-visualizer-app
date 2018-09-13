import options from '../options';
import { getPropsByKeys } from '../util';
import {
    getDimensionIdsByAxis,
    getItemIdsByDimension,
    getAxisKeyById,
} from '../layout';

export const actionTypes = {
    SET_UI: 'SET_UI',
    SET_UI_FROM_VISUALIZATION: 'SET_UI_FROM_VISUALIZATION',
    SET_UI_TYPE: 'SET_UI_TYPE',
    SET_UI_OPTIONS: 'SET_UI_OPTIONS',
    SET_UI_LAYOUT: 'SET_UI_LAYOUT',
    SET_UI_ITEMS: 'SET_UI_ITEMS',
};

export const DEFAULT_UI = {
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

export default (state = DEFAULT_UI, action) => {
    switch (action.type) {
        case actionTypes.SET_UI: {
            return {
                ...action.value,
            };
        }
        case actionTypes.SET_UI_FROM_VISUALIZATION: {
            return {
                type: action.value.type,
                options: getPropsByKeys(action.value, Object.keys(options)),
                layout: getDimensionIdsByAxis(action.value),
                itemsByDimension: getItemIdsByDimension(action.value),
            };
        }
        case actionTypes.SET_UI_TYPE: {
            return {
                ...state,
                type: action.value,
            };
        }
        case actionTypes.SET_UI_OPTIONS: {
            return {
                ...state,
                options: {
                    ...action.value,
                },
            };
        }
        case actionTypes.SET_UI_LAYOUT: {
            return {
                ...state,
                layout: {
                    ...action.value,
                },
            };
        }
        case actionTypes.SET_UI_ITEMS: {
            return {
                ...state,
                itemsByDimension: {
                    ...action.value,
                },
            };
        }
        default:
            return state;
    }
};

// Selectors

export const sGetUi = state => state.ui;

export const sGetUiOptions = state => sGetUi(state).options;
export const sGetUiLayout = state => sGetUi(state).layout;
export const sGetUiItems = state => sGetUi(state).itemsByDimension;

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axis) => ids.concat(axis),
        []
    );

export const sGetLayoutAxisKey = (state, id) =>
    getAxisKeyById(sGetUiLayout(state), id);
