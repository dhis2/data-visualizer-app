export const actionTypes = {
    SET_IU_OPTIONS: 'SET_IU_OPTIONS',
    SET_UI_LAYOUT: 'SET_UI_LAYOUT',
    SET_UI_ITEMS: 'SET_UI_ITEMS',
};

const DEFAULT_STATE = {
    options: {
        baseLineLabel: null,
        baseLineValue: null,
        // colorSet:
        cumulativeValues: false,
        domainAxisLabel: null,
        hideEmptyRowItems: null,
        hideLegend: false,
        noSpaceBetweenColumns: false,
        percentStackedValues: false,
        rangeAxisDecimals: null,
        rangeAxisLabel: null,
        rangeAxisMaxValue: null,
        rangeAxisMinValue: null,
        rangeAxisSteps: null,
        regressionType: null,
        showData: true,
        targetLineLabel: null,
        targetLineValue: null,
        type: 'column',
        // legendDisplayStrategy
        // legendSet
        aggregationType: null,
        completedOnly: false,
        hideSubtitle: false,
        hideTitle: false,
        sortOrder: null,
        subtitle: null,
        title: null,
        // topLimit
    },
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
