import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fromActions from '../index';
import * as fromReducers from '../../reducers/index';
import * as api from '../../api/visualization';
import * as history from '../../history';

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

    describe('tDoSaveVisualization', () => {
        let uid = 1;

        const store = mockStore({
            current: {
                id: uid,
                content: 'hey',
            },
        });

        // history function mocks
        history.default.push = jest.fn();
        history.default.replace = jest.fn();

        api.apiSaveVisualization = (type, vis) => {
            return Promise.resolve({
                status: 'OK',
                response: {
                    uid,
                },
            });
        };

        it('replaces the location in history on successful save', () => {
            return store
                .dispatch(
                    fromActions.tDoSaveVisualization(
                        'chart',
                        { name: 'test', description: 'test' },
                        false
                    )
                )
                .then(() => {
                    expect(history.default.replace).toHaveBeenCalled();
                    expect(history.default.replace).toHaveBeenCalledWith('/1');
                });
        });

        it('pushes a new location in history on successful save as', () => {
            uid = 2;

            return store
                .dispatch(
                    fromActions.tDoSaveVisualization(
                        'chart',
                        { name: 'test', description: 'test' },
                        true
                    )
                )
                .then(() => {
                    expect(history.default.push).toHaveBeenCalled();
                    expect(history.default.push).toHaveBeenCalledWith('/2');
                });
        });
    });
});
