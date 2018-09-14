import options from '../options';
import { getPropsByKeys } from '../util';
import {
    getDimensionIdsByAxis,
    getItemIdsByDimension,
    getFilteredLayout,
    getAxisNamesByDimensionId,
} from '../layout';
import { COLUMN } from '../components/VisualizationTypeSelector/visualizationTypes';

export const actionTypes = {
    SET_UI: 'SET_UI',
    SET_UI_FROM_VISUALIZATION: 'SET_UI_FROM_VISUALIZATION',
    SET_UI_TYPE: 'SET_UI_TYPE',
    SET_UI_OPTIONS: 'SET_UI_OPTIONS',
    SET_UI_LAYOUT: 'SET_UI_LAYOUT',
    ADD_UI_LAYOUT_DIMENSIONS: 'ADD_UI_LAYOUT_DIMENSIONS',
    SET_UI_ITEMS: 'SET_UI_ITEMS',
};

export const DEFAULT_UI = {
    type: COLUMN,
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
        // Accepts object saying what to add where: { ou: 'rows' }
        // Reducer takes care of swapping if dimension already exists in layout
        case actionTypes.ADD_UI_LAYOUT_DIMENSIONS: {
            const addedFromSwap = {};
            const dimensionIds = Object.keys(action.value);
            const axisNamesByDimensionId = getAxisNamesByDimensionId(
                state.layout
            );
            console.log('action.value', action.value);
            console.log('dimensionIds from action.value', dimensionIds);
            console.log(
                'axisNamesByDimensionId in state',
                axisNamesByDimensionId
            );

            dimensionIds.forEach(id => {
                const existsAt = axisNamesByDimensionId[id];
                const destinationAxis = action.value[id];
                const dimAtDestination = state.layout[destinationAxis][0];
                console.log('existsAt', existsAt);
                console.log('destinationAxis', destinationAxis);
                console.log('dimAtDestination', dimAtDestination);
                if (
                    existsAt &&
                    destinationAxis !== 'filters' &&
                    dimAtDestination
                ) {
                    addedFromSwap[dimAtDestination] = existsAt;
                }
            });
            console.log('addedFromSwap', addedFromSwap);
            const dimensionsToAdd = {
                ...action.value,
                ...addedFromSwap,
            };
            console.log('dimensionsToAdd', dimensionsToAdd);

            // action.value = {
            //     dx: 'columns',
            //     pe: 'rows',
            // };

            const newLayout = getFilteredLayout(
                state.layout,
                Object.keys(dimensionsToAdd)
            );
            console.log('newLayout', newLayout);
            Object.entries(dimensionsToAdd).forEach(
                ([dimensionId, axisName]) => {
                    if (['columns', 'rows'].includes(axisName)) {
                        newLayout[axisName] = [dimensionId];
                    } else {
                        newLayout[axisName].push(dimensionId);
                    }
                }
            );

            return {
                ...state,
                layout: newLayout,
            };
        }
        case actionTypes.REMOVE_UI_LAYOUT_DIMENSION: {
            return {
                ...state,
                layout: getFilteredLayout(state.layout, action.value),
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
export const sGetUiType = state => sGetUi(state).type;

export const sGetDimensionIdsFromLayout = state =>
    Object.values(sGetUiLayout(state)).reduce(
        (ids, axis) => ids.concat(axis),
        []
    );
