import reducer, { actionTypes, DEFAULT_DIMENSIONS } from '../dimensions';

describe('dimensions reducer', () => {
    const currentState = {
        dimId1: { id: 'dimId1', name: 'dimName1' },
        dimId2: { id: 'dimId2', name: 'dimName2' },
    };

    const dimension = {
        id: 'dimIdX',
        displayName: 'dimNameX',
    };

    const dimensionMap = {
        [dimension.id]: dimension,
    };

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });

        expect(actualState).toEqual(DEFAULT_DIMENSIONS);
    });

    it('should set the list of dimensions by replacing the existing list', () => {
        const actualState = reducer(currentState, {
            type: actionTypes.SET_DIMENSIONS,
            value: dimensionMap,
        });

        expect(actualState).toEqual(dimensionMap);
    });
});
