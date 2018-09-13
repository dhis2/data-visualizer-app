import { actionTypes } from '../reducers';
import { acSetRecommendedIds } from './recommendedIds';
import { apiFetchRecommendedIds } from '../api/dimensions';

export const acSetUi = value => ({
    type: actionTypes.SET_UI,
    value,
});

export const acSetUiFromVisualization = value => ({
    type: actionTypes.SET_UI_FROM_VISUALIZATION,
    value,
});

export const acSetUiOptions = value => ({
    type: actionTypes.SET_UI_OPTIONS,
    value,
});

export const acSetUiLayout = value => ({
    type: actionTypes.SET_UI_LAYOUT,
    value,
});

export const acSetUiItems = (id, value) => ({
    type: actionTypes.SET_UI_ITEMS,
    id,
    value,
});

export const tSetUiLayout = (axisKey, dimId) => async (dispatch, getState) => {
    const onSuccess = (selectedIds, recommendedIds) => {
        dispatch(acSetUiLayout(selectedIds));
        dispatch(acSetRecommendedIds(recommendedIds));
    };

    const onError = error => {
        console.log('Error (apiFetchRecommendedIds: ', error);
        return error;
    };

    const layoutIds = getState().ui.layout[axisKey];
    const newSelectedIds = layoutIds.includes(dimId)
        ? layoutIds.filter(id => id !== dimId)
        : [...layoutIds, dimId];

    let test;
    if (axisKey === 'columns') {
        test = getState().ui.layout.filters;
    } else if (axisKey === 'filters') {
        test = getState().ui.layout.columns;
    }

    const newLayout = { ...getState().ui.layout, [axisKey]: newSelectedIds };

    if (axisKey !== 'rows') {
        try {
            const response = await apiFetchRecommendedIds(newSelectedIds, test);
            return onSuccess(newLayout, response);
        } catch (err) {
            return onError(err);
        }
    }
    return onSuccess(newLayout, null);
};
