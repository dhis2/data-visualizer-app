import reducer from '../dimensions';
import { FIXED_DIMENSIONS as DEFAULT_DIMENSIONS } from '../../fixedDimensions';

describe('dimensions reducer', () => {
    /*const currentState = {
        dimId1: {
            id: 'dimId1',
            displayName: 'dimName1',
        },
        dimId2: {
            id: 'dimId2',
            displayName: 'dimName2',
        },
    };

    const dimension = {
        id: 'dimId1',
        displayName: 'dimName1',
    };

    const dimensionMap = {
        [dimension.id]: dimension,
    };*/

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });
        expect(actualState).toEqual(DEFAULT_DIMENSIONS);
    });

    /*it('should set the list of dimensions by replacing the existing list', () => {
        const actualState = reducer(currentState, {
            type: actionTypes.RECEIVED_DIMENSION,
            value: {
                id: dimension.id,
            },
        });

        const newState = { ...actualState, ...dimensionMap };

        expect(actualState).toEqual(newState);
    });*/
});
