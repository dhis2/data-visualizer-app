import { actionTypes } from '../reducers';
import {
    apiFetchDimensions,
    //apiFetchRecommended,
    //apiSetDimensions,
    //apiRemoveDimensions,
} from '../api/dimensions';
import { arrayToIdMap } from '../util';

export const acGetDimensions = dimensions => ({
    type: actionTypes.GET_DIMENSIONS,
    value: arrayToIdMap(dimensions),
});

export const acSetDimensions = dimension => ({
    type: actionTypes.SET_DIMENSIONS,
    value: dimension,
});

export const acRemoveDimensions = dimension => ({
    type: actionTypes.REMOVE_DIMENSIONS,
    value: dimension,
});

export const tGetDimensions = () => async dispatch => {
    const onSuccess = dimensions => {
        dispatch(acGetDimensions(dimensions));
    };

    const onError = error => {
        console.log('Error setting dimension: ', error);
        return error;
    };

    try {
        const response = await apiFetchDimensions();
        return onSuccess(response.dimensions);
    } catch (err) {
        return onError(err);
    }
};

export const tSetDimensions = dimension => async dispatch => {
    /*const onSuccess = dimension => {
        dispatch(acSetDimensions(dimension));
    };*/

    const onError = error => {
        console.log('Error (apiFetchDimensions): ', error);
        return error;
    };

    try {
        dispatch(acSetDimensions(dimension));
        //const response = await apiSetDimensions(dimension);
        //const response = await apiFetchRecommended(dimensionA.id, dimensionB.id);
        //return onSuccess(response.dimensions);
    } catch (err) {
        return onError(err);
    }
};

export const tRemoveDimensions = dimension => async dispatch => {
    /*const onSuccess = dimension => {
        dispatch(acRemoveDimensions(dimension));
    };*/

    const onError = error => {
        console.log(
            'Error (apiRemoveDimension): API returned incorrect value: ',
            error
        );
        return error;
    };

    try {
        dispatch(acRemoveDimensions(dimension));
        //const response = await apiRemoveDimensions(dimension);
        //return onSuccess(response.dimension);
    } catch (err) {
        return onError(err);
    }
};
