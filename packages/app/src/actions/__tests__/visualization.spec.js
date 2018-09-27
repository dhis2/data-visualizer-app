import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fromVisualization from '../visualization';
import * as fromReducers from '../../reducers/index';
import * as api from '../../api/visualization';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('visualization actions', () => {
    it('dispatches the correct actions after loading the visualization', () => {
        const vis = 'hey';
        api.apiFetchVisualization = () =>
            Promise.resolve({
                toJSON: () => vis,
            });

        const expectedActions = [
            { type: fromReducers.actionTypes.SET_VISUALIZATION, value: vis },
        ];

        const store = mockStore({});

        return store
            .dispatch(fromVisualization.tSetVisualization())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
