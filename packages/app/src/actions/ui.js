import { actionTypes } from '../reducers';
import { apiFetchRecommended } from '../api/dimensions';
import { onError } from './index';

export const acSetSelectedDim = selectedDim => ({
    type: actionTypes.SET_SELECTED,
    value: selectedDim,
});

export const acRemoveSelectedDim = id => ({
    type: actionTypes.REMOVE_SELECTED,
    value: id,
});

export const acSetRecommendedDim = recommendedDimIds => ({
    type: actionTypes.SET_RECOMMENDED_DIMENSION_IDS,
    value: recommendedDimIds,
});

export const tSetSelectedDim = (dimId, layoutId) => async (
    dispatch,
    getState
) => {
    const onSuccess = recommendedDimIds => {
        dispatch(acSetRecommendedDim(recommendedDimIds));
    };

    dispatch(acSetSelectedDim({ dimId, layoutId }));

    try {
        const idA = getState().ui.columns;
        const idB = getState().ui.filters;
        const response = await apiFetchRecommended(idA, idB);

        return onSuccess(response);
    } catch (err) {
        return onError(err);
    }
};

export const tRemoveSelectedDim = id => async (dispatch, getState) => {
    const onSuccess = recommendedDimIds => {
        dispatch(acSetRecommendedDim(recommendedDimIds));
    };

    dispatch(acRemoveSelectedDim(id));

    try {
        const idA = getState().ui.columns;
        const idB = getState().ui.filters;
        const response = await apiFetchRecommended(idA, idB);

        return onSuccess(response);
    } catch (err) {
        return onError(err);
    }
};
