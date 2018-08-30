import reducer, { actionTypes, DEFAULT_DIMENSIONS } from '../dimensions';

describe('dimensions reducer', () => {
    const currentState = {
        dimId1: {
            id: 'dimId1',
            displayName: 'dimName1',
            selected: false,
            isRecommended: false,
        },
        dimId2: {
            id: 'dimId2',
            displayName: 'dimName2',
            selected: false,
            isRecommended: false,
        },
    };

    const dimension = {
        id: 'dimId1',
        displayName: 'dimName1',
        selected: true,
        isRecommended: false,
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
            type: actionTypes.RECEIVED_DIMENSION,
            value: {
                id: dimension.id,
                selected: dimension.selected,
            },
        });

        const newState = { ...actualState, ...dimensionMap };

        expect(actualState).toEqual(newState);
    });
});
