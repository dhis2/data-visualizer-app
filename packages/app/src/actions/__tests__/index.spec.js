import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fromActions from '../index';
import * as api from '../../api/visualization';
import * as history from '../../utils/history';

import {
    SET_VISUALIZATION,
    CLEAR_VISUALIZATION,
} from '../../reducers/visualization';
import { SET_CURRENT, CLEAR_CURRENT } from '../../reducers/current';
import { SET_UI_FROM_VISUALIZATION, CLEAR_UI } from '../../reducers/ui';
import { SET_LOAD_ERROR, CLEAR_LOAD_ERROR } from '../../reducers/loadError';
import { RECEIVED_SNACKBAR_MESSAGE } from '../../reducers/snackbar';

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
                { type: CLEAR_LOAD_ERROR },
                {
                    type: SET_VISUALIZATION,
                    value: vis,
                },
                { type: SET_CURRENT, value: vis },
                {
                    type: SET_UI_FROM_VISUALIZATION,
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
                { type: SET_LOAD_ERROR, value: error },
                { type: CLEAR_VISUALIZATION },
                { type: CLEAR_CURRENT },
                { type: CLEAR_UI },
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
                { type: CLEAR_LOAD_ERROR },
                { type: CLEAR_VISUALIZATION },
                { type: CLEAR_CURRENT },
                { type: CLEAR_UI },
            ];

            const store = mockStore({});

            fromActions.clearVisualization(store.dispatch);

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('tDoDeleteVisualization', () => {
        it('dispatches the correct actions when deleting the visualization', () => {
            // history function mocks
            history.default.push = jest.fn();

            const store = mockStore({
                current: {
                    id: 'd1',
                    name: 'delete test',
                },
            });

            const expectedActions = [
                {
                    type: RECEIVED_SNACKBAR_MESSAGE,
                    value: {
                        message: '"delete test" successfully deleted.',
                        open: true,
                        duration: 2000,
                    },
                },
            ];

            store.dispatch(fromActions.tDoDeleteVisualization());

            expect(store.getActions()).toEqual(expectedActions);
            expect(history.default.push).toHaveBeenCalled();
            expect(history.default.push).toHaveBeenCalledWith('/');
        });
    });

    describe('tDoRenameVisualization', () => {
        const visualization = {
            id: 'r1',
            content: 'burp!',
        };

        const current = {
            ...visualization,
            modified: true,
        };

        const extraParams = {
            name: 'rename-test',
            description: 'Rename test',
        };

        it('dispatches the correct actions after successfully renaming the original visualization', () => {
            const store = mockStore({
                visualization,
                current: visualization,
            });

            const expectedActions = [
                {
                    type: SET_VISUALIZATION,
                    value: { ...visualization, ...extraParams },
                },
                {
                    type: SET_CURRENT,
                    value: { ...visualization, ...extraParams },
                },
                {
                    type: RECEIVED_SNACKBAR_MESSAGE,
                    value: {
                        message: 'Rename successful',
                        open: true,
                        duration: 2000,
                    },
                },
            ];

            store.dispatch(
                fromActions.tDoRenameVisualization('chart', extraParams)
            );

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('dispatched the correct actions after successfully renaming the modified visualization', () => {
            const store = mockStore({
                visualization,
                current,
            });

            const expectedActions = [
                {
                    type: SET_VISUALIZATION,
                    value: { ...visualization, ...extraParams },
                },
                {
                    type: SET_CURRENT,
                    value: { ...current, ...extraParams },
                },
                {
                    type: RECEIVED_SNACKBAR_MESSAGE,
                    value: {
                        message: 'Rename successful',
                        open: true,
                        duration: 2000,
                    },
                },
            ];

            store.dispatch(
                fromActions.tDoRenameVisualization('chart', extraParams)
            );

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('tDoSaveVisualization', () => {
        let uid = 1;

        const vis = {
            id: uid,
            content: 'hey',
        };

        const extraParams = { name: 'test', description: 'test' };

        const store = mockStore({
            current: vis,
        });

        // history function mocks
        history.default.push = jest.fn();
        history.default.replace = jest.fn();

        api.apiSaveVisualization = jest.fn((type, vis) => {
            return Promise.resolve({
                status: 'OK',
                response: {
                    uid,
                },
            });
        });

        it('replaces the location in history on successful save', () => {
            const expectedVis = {
                ...vis,
                ...extraParams,
            };

            return store
                .dispatch(
                    fromActions.tDoSaveVisualization(
                        'chart',
                        extraParams,
                        false
                    )
                )
                .then(() => {
                    expect(api.apiSaveVisualization).toHaveBeenCalled();
                    expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                        'chart',
                        expectedVis
                    );
                    expect(history.default.replace).toHaveBeenCalled();
                    expect(history.default.replace).toHaveBeenCalledWith(
                        `/${uid}`
                    );
                });
        });

        it('pushes a new location in history on successful save as', () => {
            uid = 2;

            const expectedVis = {
                ...vis,
                id: undefined,
                ...extraParams,
            };

            return store
                .dispatch(
                    fromActions.tDoSaveVisualization('chart', extraParams, true)
                )
                .then(() => {
                    expect(api.apiSaveVisualization).toHaveBeenCalled();
                    expect(api.apiSaveVisualization).toHaveBeenCalledWith(
                        'chart',
                        expectedVis
                    );
                    expect(history.default.push).toHaveBeenCalled();
                    expect(history.default.push).toHaveBeenCalledWith(
                        `/${uid}`
                    );
                });
        });
    });
});
