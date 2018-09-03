import reducer, {
    actionTypes,
    DEFAULT_DIMENSIONS,
    DEFAULT_RECOMMENDED_DIMENSIONS,
} from '../dimensions';

describe('dimensions reducer', () => {
    const currentState = {
        dimId1: {
            id: 'dimId1',
            displayName: 'dimName1',
<<<<<<< HEAD
            selected: false,
=======
>>>>>>> a3b035fdcddd18970f189423de490d4eac4a4d69
        },
        dimId2: {
            id: 'dimId2',
            displayName: 'dimName2',
<<<<<<< HEAD
            selected: false,
=======
>>>>>>> a3b035fdcddd18970f189423de490d4eac4a4d69
        },
    };

    const dimension = {
        id: 'dimId1',
        displayName: 'dimName1',
<<<<<<< HEAD
        selected: true,
=======
>>>>>>> a3b035fdcddd18970f189423de490d4eac4a4d69
    };

    const dimensionMap = {
        [dimension.id]: dimension,
    };

    it('should return the default state', () => {
        const actualState = reducer(undefined, { type: 'NO_MATCH' });
        console.log(actualState);
        //expect(actualState).toEqual(DEFAULT_DIMENSIONS);
    });

    /*it.only('should set the list of dimensions by replacing the existing list', () => {
        const actualState = reducer(currentState, {
            type: actionTypes.RECEIVED_DIMENSION,
            value: {
                id: dimension.id,
                selected: dimension.selected,
            },
        });

        const newState = { ...actualState, ...dimensionMap };

        expect(actualState).toEqual(newState);
    });*/
});
