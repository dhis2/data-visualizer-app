import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fromActions from '../index';
import * as fromReducers from '../../reducers/index';
import * as api from '../../api/visualization';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('index', () => {
    describe('tDoLoadVisualization', () => {
        it('dispatches the correct actions after successfully fetching visualization', () => {
            const vis = 'hey';
            api.apiFetchVisualization = () =>
                Promise.resolve({
                    toJSON: () => vis,
                });

            const expectedActions = [
                { type: fromReducers.actionTypes.CLEAR_LOAD_ERROR },
                {
                    type: fromReducers.actionTypes.SET_VISUALIZATION,
                    value: vis,
                },
                { type: fromReducers.actionTypes.SET_CURRENT, value: vis },
                {
                    type: fromReducers.actionTypes.SET_UI_FROM_VISUALIZATION,
                    value: vis,
                },
            ];

            const store = mockStore({});

            return store
                .dispatch(fromActions.tDoLoadVisualization())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('dispatches the correct actions when fetch visualization fails', () => {
            const error = { code: '718', message: 'I am not a teapot' };

            api.apiFetchVisualization = () => Promise.reject(error);

            const expectedActions = [
                { type: fromReducers.actionTypes.SET_LOAD_ERROR, value: error },
                { type: fromReducers.actionTypes.CLEAR_VISUALIZATION },
                { type: fromReducers.actionTypes.CLEAR_CURRENT },
                { type: fromReducers.actionTypes.CLEAR_UI },
            ];

            const store = mockStore({});

            return store
                .dispatch(fromActions.tDoLoadVisualization())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('clearVisualization', () => {
        it('dispatches the correct actions when clearing the visualization', () => {
            const expectedActions = [
                { type: fromReducers.actionTypes.CLEAR_LOAD_ERROR },
                { type: fromReducers.actionTypes.CLEAR_VISUALIZATION },
                { type: fromReducers.actionTypes.CLEAR_CURRENT },
                { type: fromReducers.actionTypes.CLEAR_UI },
            ];

            const store = mockStore({});

            fromActions.clearVisualization(store.dispatch);

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
